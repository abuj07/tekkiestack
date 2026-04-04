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
        "https://api-inference.huggingface.co/models/google/flan-t5-large",
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

      // 🔍 Handle ALL response formats
      let text = null;

      if (Array.isArray(hfData)) {
        text = hfData?.[0]?.generated_text;
      } else if (hfData?.generated_text) {
        text = hfData.generated_text;
      } else if (hfData?.error) {
        text = "HF Error: " + hfData.error;
      } else {
        text = JSON.stringify(hfData);
      }

      return res.status(200).json({
        text: text || "No usable response",
        source: "huggingface"
      });

    } catch (err) {
      console.error("HF ERROR:", err);
    }

    // -----------------------------
    // ❌ TOTAL FAILURE
    // -----------------------------
    return res.status(500).json({
      error: "All AI providers failed"
    });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}