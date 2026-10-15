const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Create Express app FIRST
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Register routes AFTER creating app
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/", aiRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("LearnSphere AI backend is running!");
});

// Start server after connecting to MongoDB
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
