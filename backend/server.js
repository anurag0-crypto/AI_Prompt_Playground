import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Prompt styles
const prompts = {
  eli5: "Explain this like I am 5 years old:",
  professional: "Rewrite professionally:",
  teacher: "Act as a teacher and explain step by step:",
  mentor: "Act as a mentor and guide the user:",
  quiz: "Generate 5 quiz questions from:",
};

// API ROUTE
app.post("/generate", async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        error: "Input cannot be empty",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: `${prompts[mode] || prompts.eli5}\n\n${text}`,
        },
      ],
    });

    res.json({
      response: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});