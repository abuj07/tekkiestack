export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Invalid prompt" });
    }

    // 🔁 List of fallback models (free tier, may rotate availability)
    const models = [
      "meta-llama/llama-3-8b-instruct",
      "mistralai/mistral-7b-instruct",
      "openchat/openchat-7b"
    ];

    let lastError = null;

    for (const model of models) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
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

        // ❌ If model failed, try next
        if (data.error) {
          lastError = data.error.message;
          continue;
        }

        // ✅ Extract response
        const text =
          data?.choices?.[0]?.message?.content ||
          data?.choices?.[0]?.text;

        if (text) {
          return res.status(200).json({ text, model });
        }

      } catch (err) {
        lastError = err.message;
      }
    }

    // ❌ All models failed
    return res.status(500).json({
      error: "All AI models failed",
      details: lastError
    });

  } catch (err) {
    console.error("AI ERROR:", err);
    return res.status(500).json({ error: "AI request failed" });
  }
}