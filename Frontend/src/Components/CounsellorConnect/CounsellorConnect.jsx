import React, { useState } from "react";
import "./CounsellorConnect.css";

const CounsellorConnect = () => {
  const [messages, setMessages] = useState([
    { from: "counsellor", text: "Hello, how can I help you today?" },
    { from: "user", text: "Hi, I’m feeling a bit stressed lately." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { from: "user", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="counsellor-connect-container">
      {/* Counsellor Details */}
      <div className="counsellor-profile">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Counsellor"
          className="counsellor-photo"
        />
        <h2>Dr. Arjun Mehta</h2>
        <p className="specialization">Clinical Psychologist</p>
        <p><strong>Experience:</strong> 7 years</p>
        <p><strong>Available:</strong> Mon–Fri, 10AM–5PM</p>
        <p>
          <strong>About:</strong> Helping students deal with stress, anxiety,
          and career challenges.
        </p>
        <button className="book-btn">📅 Book Appointment</button>
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <div className="chat-header">
          <h3>Chat with Dr. Arjun Mehta</h3>
        </div>
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${
                msg.from === "user" ? "user-bubble" : "counsellor-bubble"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default CounsellorConnect;
