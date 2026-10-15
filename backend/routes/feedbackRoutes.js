
const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST: Save feedback
router.post("/", async (req, res) => {
  try {
    const { name, rating, comments } = req.body;

    if (!name?.trim() || !comments?.trim() || !rating) {
      return res.status(400).json({
        message: "Please fill in all feedback fields."
      });
    }

    const feedback = await Feedback.create({
      name: name.trim(),
      rating: Number(rating),
      comments: comments.trim()
    });

    res.status(201).json({
      message: "Feedback saved successfully",
      feedback
    });
  } catch (error) {
    console.error("Feedback save error:", error.message);
    res.status(500).json({
      message: "Failed to save feedback"
    });
  }
});

// GET: Retrieve feedback
router.get("/", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error("Feedback fetch error:", error.message);
    res.status(500).json({
      message: "Failed to fetch feedback"
    });
  }
});

module.exports = router;
