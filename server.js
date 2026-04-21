import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { history, message } = req.body;

    // формируем сообщения для AI
    const messages = [
      {
        role: "system",
        content: "Ты AI Neuraxis. Ты умный помощник, отвечаешь логично и учитываешь весь диалог."
      },
      ...history,
      { role: "user", content: message }
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: messages
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка сервера");
  }
});

app.listen(3000, () => console.log("Server started"));
