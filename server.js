import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// важно
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).send("Ошибка сервера");
  }
});

// ВАЖНО для Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started"));
