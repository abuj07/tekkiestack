export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, system } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    // =============================
    // 1️⃣ GEMINI 2.5 PRO (PRIMARY)
    // =============================
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-03-25:generateContent?key=${process.env.GEMINI_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: system || "You are a friendly coding tutor for school students. Give helpful hints — never write the full solution. Focus only on HTML, CSS, and JavaScript. Keep responses concise." }]
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
      console.log("GEMINI RAW:", geminiText);

      let geminiData;
      try {
        geminiData = JSON.parse(geminiText);
      } catch {}

      const text =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        return res.status(200).json({ text, source: "gemini" });
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
            system: system || "You are a friendly coding tutor for school students. Give helpful hints — never write the full solution. Focus only on HTML, CSS, and JavaScript. Keep responses concise.",
            messages: [{ role: "user", content: prompt }]
          })
        }
      );

      const anthropicText = await anthropicRes.text();
      console.log("ANTHROPIC RAW:", anthropicText);

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
        return res.status(200).json({ text, source: "anthropic" });
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
                content:
                  "You are a coding tutor for kids. Give helpful hints, not full answers."
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
          text,
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
          text,
          source: "huggingface"
        });
      }

    } catch (err) {
      console.log("Hugging Face failed:", err);
    }

    // =============================
    // 5️⃣ LOCAL FALLBACK
    // =============================
    const lower = prompt.toLowerCase();

    let fallback =
      "I'm here to help! Try asking about coding or your project 😊";

    if (lower.includes("html")) {
      fallback =
        "HTML is the structure of a webpage. Think of it like the skeleton that holds everything together.";
    } else if (lower.includes("css")) {
      fallback =
        "CSS controls how a webpage looks — colors, layouts, and styles.";
    } else if (lower.includes("javascript")) {
      fallback =
        "JavaScript makes websites interactive — like buttons, animations, and logic.";
    } else if (lower.includes("bug") || lower.includes("error")) {
      fallback =
        "Try checking your code step by step. What line is causing the issue?";
    }

    return res.status(200).json({
      text: fallback,
      source: "local"
    });

  } catch (err) {
    console.error("FATAL ERROR:", err);
    return res.status(500).json({
      error: "Server crashed"
    });
  }
}