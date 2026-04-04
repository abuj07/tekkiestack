export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    // =============================
    // 1️⃣ GEMINI (PRIMARY)
    // =============================
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a coding tutor for kids. Give helpful hints, not full answers.\n\n${prompt}`
                  }
                ]
              }
            ]
          })
        }
      );

      const geminiText = await geminiRes.text();

      let geminiData;
      try {
        geminiData = JSON.parse(geminiText);
      } catch {
        console.log("Gemini non-JSON:", geminiText);
      }

      const text =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        return res.status(200).json({
          text,
          source: "gemini"
        });
      }

    } catch (err) {
      console.log("Gemini failed:", err);
    }

    // =============================
    // 2️⃣ OPENROUTER
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
                  "You are a coding tutor for children. Give helpful hints, not full answers."
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

      let orData;
      try {
        orData = JSON.parse(orText);
      } catch {
        console.log("OpenRouter non-JSON:", orText);
      }

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
    // 3️⃣ HUGGING FACE
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

      let hfData;
      try {
        hfData = JSON.parse(hfText);
      } catch {
        console.log("HF non-JSON:", hfText);
      }

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
    // 4️⃣ LOCAL FALLBACK
    // =============================
    const lowerPrompt = prompt.toLowerCase();

    let fallbackText =
      "I'm here to help! Try asking about coding or your project 😊";

    if (lowerPrompt.includes("html")) {
      fallbackText =
        "HTML is the structure of a webpage. Think of it like the skeleton that holds everything together.";
    } else if (lowerPrompt.includes("css")) {
      fallbackText =
        "CSS controls how a webpage looks — colors, layouts, and styles.";
    } else if (lowerPrompt.includes("javascript")) {
      fallbackText =
        "JavaScript makes websites interactive — like buttons, animations, and logic.";
    } else if (
      lowerPrompt.includes("bug") ||
      lowerPrompt.includes("error")
    ) {
      fallbackText =
        "Try checking your code step by step. What line is causing the issue?";
    }

    return res.status(200).json({
      text: fallbackText,
      source: "local"
    });

  } catch (err) {
    console.error("FATAL ERROR:", err);
    return res.status(500).json({
      error: "Server crashed"
    });
  }
}