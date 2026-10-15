const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

router.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "Please enter a question."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Answer briefly in 2-3 sentences: ${question}`
    });

    res.json({ answer: response.text });

 } catch (error) {
  console.error("Gemini error:", error);
  res.status(500).json({
    error: error.message || "Unable to generate an answer."
  });
}
});

module.exports = router;