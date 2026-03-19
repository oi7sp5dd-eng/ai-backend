import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: req.body.message }
        ]
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).send("Ошибка сервера");
  }
});

app.listen(3000, () => console.log("Server started"));
