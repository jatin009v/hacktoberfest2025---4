// server.js — local development server to expose /api/chat
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatHandler from "./api/chat.js"; // import the handler

dotenv.config();

const app = express();

// CORS: allow localhost only during development, allow all in production
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "*",
  })
);

app.use(express.json());

// Attach the handler for POST /api/chat
app.post("/api/chat", chatHandler);

// Root route to confirm server is running
app.get("/", (req, res) =>
  res.send("Server is running. Use POST /api/chat for API requests.")
);

// Start server (only used during local development)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
