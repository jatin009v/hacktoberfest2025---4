import { useState } from "react";

export default function useChatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am Hubi! How can I help you?" }
  ]);
  const [loading, setLoading] = useState(false);

  const push = (m) => setMessages((prev) => [...prev, m]);

  // Use localhost in dev, relative in production
  const API_URL = import.meta.env.DEV ? "http://localhost:5000/api/chat" : "/api/chat";

  async function sendMessage(prompt) {
    if (!prompt || !prompt.trim()) return;
    const trimmed = prompt.trim();
    push({ sender: "user", text: trimmed });
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const data = await res.json();

      // Gemini response format
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from server.";

      push({ sender: "bot", text: reply });
    } catch (err) {
      console.error("Chat error:", err);
      push({ sender: "bot", text: "⚠️ Failed to connect to server." });
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([
      { sender: "bot", text: "Hello! I am Hubi! How can I help you?" }
    ]);
  }

  return { messages, sendMessage, loading, clearChat };
}
