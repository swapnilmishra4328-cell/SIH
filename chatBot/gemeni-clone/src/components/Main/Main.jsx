import React, { useState } from "react";
import "./Main.css";
import ReactMarkdown from "react-markdown"; // for better layout
import { assets } from "../../assets/assets";

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    const userPrompt = input;
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt }),
      });
      const data = await response.json();

      // Add bot response
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.text || "No response" },
      ]);
    } catch (err) {
      console.error("❌ Gemini Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Failed to get response" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="chat-header">
        <p>Thinkfit AI</p>
        <img src={assets.student_icon} alt="user" />
      </header>

      {/* Messages */}
      <main className="chat-body">
        {/* Opening line */}
        <div className="chat-message bot opening-line">
          Hi, I’m <span><i>Thinkfit AI</i></span> — here to{" "}
          <span><i>listen</i></span>, <span><i>support</i></span>, and{" "}
          <span><i>guide</i></span> you whenever you need.
        </div>

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            {msg.role === "bot" ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="chat-message bot typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </main>

      {/* Input */}
      <footer className="chat-footer">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <div className="icons">
          <img src={assets.gallery_icon} alt="gallery" />
          <img src={assets.mic_icon} alt="mic" />
          <img
            src={assets.send_icon}
            alt="send"
            onClick={sendMessage}
            style={{ cursor: "pointer" }}
          />
        </div>
      </footer>
    </div>
  );
};

export default Main;
