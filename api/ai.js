// Shared default system prompt used when the client doesn't supply one.
// Includes the em-dash style rule that all AI Lab responses must follow.
const DEFAULT_SYSTEM = `You are a friendly coding tutor for school students. Give helpful hints, never write the full solution. Focus only on HTML, CSS, and JavaScript. Keep responses concise.

STYLE RULES (mandatory):
- Never use em-dashes (—) in your response. Use commas, full stops, colons, parentheses, or split into separate sentences instead.
- Use proper British English punctuation. Plain hyphens are fine for compound words.
- Do not write in an "AI-shorthand" style.`;

// Strip em-dashes from any model output before returning it to the client.
// Defence-in-depth: the prompt asks the model not to use them; this guarantees
// none reach the user even if a model ignores the instruction.
function scrubStyle(text) {
  if (!text || typeof text !== "string") return text;
  return text
    .replace(/ — /g, ", ")
    .replace(/\s—(?=\S)/g, ", ")
    .replace(/(?<=\w)—(?=\w)/g, "-")
    .replace(/—\s*/g, ", ");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, system } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    // Log which keys are present (not their values)
    console.log("ENV CHECK — GEMINI_KEY present:", !!process.env.GEMINI_KEY);
    console.log("ENV CHECK — ANTHROPIC_API_KEY present:", !!process.env.ANTHROPIC_API_KEY);
    console.log("ENV CHECK — OPENROUTER_KEY present:", !!process.env.OPENROUTER_KEY);

    // =============================
    // 1️⃣ GEMINI 2.5 PRO (PRIMARY)
    // =============================
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: system || DEFAULT_SYSTEM }]
            },
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      );

      const geminiText = await geminiRes.text();
      console.log("GEMINI STATUS:", geminiRes.status);
      console.log("GEMINI RAW:", geminiText.substring(0, 500));

      let geminiData;
      try {
        geminiData = JSON.parse(geminiText);
      } catch {}

      const text =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        return res.status(200).json({ text: scrubStyle(text), source: "gemini" });
      }

    } catch (err) {
      console.log("Gemini failed:", err);
    }

    // =============================
    // 2️⃣ CLAUDE HAIKU 4.5 (SECONDARY)
    // =============================
    try {
      const anthropicRes = await fetch(
        "https://api.anthropic.com/v1/messages",
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 300,
            system: system || DEFAULT_SYSTEM,
            messages: [{ role: "user", content: prompt }]
          })
        }
      );

      const anthropicText = await anthropicRes.text();
      console.log("ANTHROPIC STATUS:", anthropicRes.status);
      console.log("ANTHROPIC RAW:", anthropicText.substring(0, 500));

      let anthropicData;
      try {
        anthropicData = JSON.parse(anthropicText);
      } catch {}

      const text =
        (anthropicData?.content || [])
          .filter(b => b.type === "text")
          .map(b => b.text)
          .join("") || null;

      if (text) {
        return res.status(200).json({ text: scrubStyle(text), source: "anthropic" });
      }

    } catch (err) {
      console.log("Anthropic failed:", err);
    }

    // =============================
    // 3️⃣ OPENROUTER
    // =============================
    try {
      const orRes = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://tekkiestack.com",
            "X-Title": "TekkieStack AI Lab"
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3-8b-instruct",
            messages: [
              {
                role: "system",
                content: system || DEFAULT_SYSTEM
              },
              {
                role: "user",
                content: prompt
              }
            ]
          })
        }
      );

      const orText = await orRes.text();
      console.log("OPENROUTER RAW:", orText);

      let orData;
      try {
        orData = JSON.parse(orText);
      } catch {}

      const text =
        orData?.choices?.[0]?.message?.content ||
        orData?.choices?.[0]?.text;

      if (text) {
        return res.status(200).json({
          text: scrubStyle(text),
          source: "openrouter"
        });
      }

    } catch (err) {
      console.log("OpenRouter failed:", err);
    }

    // =============================
    // 4️⃣ HUGGING FACE
    // =============================
    try {
      const hfRes = await fetch(
        "https://router.huggingface.co/hf-inference/models/HuggingFaceH4/zephyr-7b-beta",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.HUGGINGFACE_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: prompt
          })
        }
      );

      const hfText = await hfRes.text();
      console.log("HF RAW:", hfText);

      let hfData;
      try {
        hfData = JSON.parse(hfText);
      } catch {}

      let text = null;

      if (Array.isArray(hfData)) {
        text = hfData?.[0]?.generated_text;
      } else if (hfData?.generated_text) {
        text = hfData.generated_text;
      }

      if (text) {
        return res.status(200).json({
          text: scrubStyle(text),
          source: "huggingface"
        });
      }

    } catch (err) {
      console.log("Hugging Face failed:", err);
    }

    // =============================
    // 5️⃣ ALL PROVIDERS FAILED
    // =============================
    // Return 502 so the client falls back to its tool-aware offlineResponse
    // (in modules/ai-lab.js). That fallback knows whether the user is in
    // codeHelper, codeDetective, or promptTrainer mode, and picks an
    // appropriate hint from OFFLINE_HINTS — far better than keyword-matching
    // on the prompt body, which mis-fires when the editor's starter code
    // contains words like "html".
    return res.status(502).json({
      error: "All AI providers unavailable",
      retryable: true
    });

  } catch (err) {
    console.error("FATAL ERROR:", err);
    return res.status(500).json({
      error: "Server crashed"
    });
  }
}