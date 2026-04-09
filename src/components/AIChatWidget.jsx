import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FaRobot, FaPaperPlane, FaTimes, FaCircle, FaGraduationCap, FaBriefcase, FaIdCard } from "react-icons/fa";
import "../style/AIChat.css";

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize role-based welcome message
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const name = userInfo.name || "there";
    
    let welcomeText = `Hello **${name}**! I'm your **TAP Assistant**. How can I help you navigate the portal today?`;
    if (userRole === "admin") welcomeText = `Welcome back, **Admin**. I'm ready to help you with reports, drive cycles, or data management. What's on the agenda?`;
    if (userRole === "company") welcomeText = `Greetings! I'm here to assist your recruitment process. Need help viewing applications or posting a new job?`;

    setChatHistory([{ role: "ai", text: welcomeText }]);
  }, []);

  const quickSuggestions = [
    { label: "Available Courses", icon: <FaGraduationCap />, text: "Tell me about available courses" },
    { label: "Top Hiring Companies", icon: <FaBriefcase />, text: "Who are the top hiring companies?" },
    { label: "Mock Interviews", icon: <FaRobot />, text: "How do I take a mock interview?" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const handleSendMessage = async (e, customMessage = null) => {
    if (e) e.preventDefault();
    const textToSend = customMessage || message;
    if (!textToSend.trim()) return;

    const userMsg = { role: "user", text: textToSend };
    setChatHistory((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    try {
      const userRole = localStorage.getItem("userRole");
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

      const response = await axios.post("/api/ai/chat", {
        message: userMsg.text,
        history: chatHistory,
        userRole,
        userInfo
      });

      setChatHistory((prev) => [...prev, { role: "ai", text: response.data.text }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMessage = error.response?.data?.error || "I'm having trouble connecting to the brain right now. Please ensure your `GEMINI_API_KEY` is valid and the server is running.";
      setChatHistory((prev) => [...prev, { role: "ai", text: errorMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickSuggestion = (text) => {
    handleSendMessage(null, text);
  };

  return (
    <div className="ai-chat-container">
      {/* Toggle Button */}
      <button 
        className={`ai-chat-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="AI Assistant"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="header-main">
              <h3><FaRobot /> TAP Assistant</h3>
              <div className="status-badge"><FaCircle className="dot" /> Online</div>
            </div>
            <p>Your premium guide to the T&P Portal</p>
          </div>

          <div className="ai-chat-messages">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {isTyping && (
              <div className="message ai typing">
                <span>Assistant is thinking</span>
                <div className="dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-suggestions">
            {quickSuggestions.map((item, idx) => (
              <button key={idx} className="suggestion-chip" onClick={() => handleQuickSuggestion(item.text)}>
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          <form className="ai-chat-input-area" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" className="ai-chat-send" disabled={isTyping || !message.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatWidget;
