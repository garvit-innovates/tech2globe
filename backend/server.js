require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Resume Analyzer API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode >= 500 ? "Something went wrong on the server." : err.message;

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    message,
    details: err.details || null,
  });
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}.`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
