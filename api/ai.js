export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    // -----------------------------
    // 1️⃣ TRY OPENROUTER
    // -----------------------------
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [
            {
              role: "system",
              content: "You are a coding tutor for children. Give helpful hints, not full answers."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      const data = await response.json();

      if (!data.error) {
        const text =
          data?.choices?.[0]?.message?.content ||
          data?.choices?.[0]?.text;

        if (text) {
          return res.status(200).json({
            text,
            source: "openrouter"
          });
        }
      }

    } catch (err) {
      console.log("OpenRouter failed");
    }

    // -----------------------------
    // 2️⃣ FALLBACK: HUGGING FACE
    // -----------------------------
    try {
      const hfResponse = await fetch(
        "https://router.huggingface.co/hf-inference/models/microsoft/DialoGPT-medium",
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

      const hfData = await hfResponse.json();

      let text = null;

      if (Array.isArray(hfData)) {
        text = hfData?.[0]?.generated_text;
      } else if (hfData?.generated_text) {
        text = hfData.generated_text;
      } else if (hfData?.error) {
        console.log("HF error:", hfData.error);
      }

      if (text) {
        return res.status(200).json({
          text,
          source: "huggingface"
        });
      }

    } catch (err) {
      console.log("Hugging Face failed");
    }

    // -----------------------------
    // 3️⃣ FINAL FALLBACK (LOCAL AI)
    // -----------------------------

    const lowerPrompt = prompt.toLowerCase();

    let fallbackText = "I'm here to help! Try asking about coding or your project 😊";

    if (lowerPrompt.includes("html")) {
      fallbackText = "HTML is the structure of a webpage. Think of it like the skeleton that holds everything together.";
    } else if (lowerPrompt.includes("css")) {
      fallbackText = "CSS controls how a webpage looks — colors, layouts, and styles.";
    } else if (lowerPrompt.includes("javascript")) {
      fallbackText = "JavaScript makes websites interactive — like buttons, animations, and logic.";
    } else if (lowerPrompt.includes("bug") || lowerPrompt.includes("error")) {
      fallbackText = "Try checking your code step by step. What line is causing the issue?";
    } else if (lowerPrompt.includes("help")) {
      fallbackText = "I'm here to help! What are you trying to build?";
    }

    return res.status(200).json({
      text: fallbackText,
      source: "local"
    });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}