/// server.js — serve API + Vite frontend
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import chatHandler from "./api/chat.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "*",
  })
);
app.use(express.json());

// API route
app.post("/api/chat", chatHandler);

// Serve Vite build (dist folder)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// Serve index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

// Start server (used for local development)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
