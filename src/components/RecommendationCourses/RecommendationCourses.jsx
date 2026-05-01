import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RecommendationCourses.module.css";
import SendBtn from "../../assets/send.png";

const MessageWithLinks = ({ text }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }
    parts.push({ type: 'link', content: match[0], url: match[0] });
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }
  
  if (parts.length === 0) return text;
  
  return (
    <>
      {parts.map((part, idx) => {
        if (part.type === 'link') {
          return (
            <a key={idx} href={part.url} target="_blank" rel="noopener noreferrer" className={styles.message_link}>
              {part.content}
            </a>
          );
        }
        return part.content;
      })}
    </>
  );
};

export default function RecommendationCourses() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (!sessionId) {
      setSessionId("recommendation_" + Date.now());
    }
  }, []);

  const sendMessage = async (customMessage = null) => {
    const msgToSend = customMessage || message;
    if (!msgToSend.trim() || !sessionId) return;

    const userMsg = { sender: "user", text: msgToSend, timestamp: new Date() };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    try {
      const res = await axios.post("https://wish-abacus-barterer.ngrok-free.dev/chat", {
        message: msgToSend,
        session_id: sessionId,
        model_type: "recommendation"
      });

      const data = res.data;
      const botMsg = { sender: "bot", text: data.message, timestamp: new Date() };
      setChat((prev) => [...prev, botMsg]);

      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
      }
    } catch (err) {
      console.error(err);
      setChat((prev) => [...prev, { sender: "bot", text: "❌ Error connecting to server.", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const examples = [
    { text: "React courses for beginners", icon: "⚛️" },
    { text: "Python backend development", icon: "🐍" },
    { text: "Data Science with Python", icon: "📊" },
    { text: "Machine Learning basics", icon: "🤖" },
  ];

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.bg_gradient}></div>
      <div className={styles.bg_circle_1}></div>
      <div className={styles.bg_circle_2}></div>
      <div className={styles.bg_circle_3}></div>
      <div className={styles.floating_books}>
        <span>📚</span>
        <span>🎓</span>
        <span>📖</span>
        <span>✨</span>
      </div>

      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.back_btn} onClick={() => navigate('/aimentor')}>
            ← Back to Models
          </button>
          <div className={styles.header_info}>
            <div className={styles.header_icon}>
              <span>📚</span>
              <div className={styles.icon_ring}></div>
            </div>
            <div>
              <h1>Course Navigator</h1>
              <p>Discover personalized courses tailored to your career goals</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className={styles.chat_container}>
          <div className={styles.chat_messages}>
            {chat.length === 0 ? (
              <div className={styles.welcome_section}>
                <div className={styles.welcome_card}>
                  <div className={styles.welcome_icon}>🎯</div>
                  <h2>Find Your Perfect Course</h2>
                  <p>Tell me what you want to learn, and I'll recommend the best courses for you!</p>
                  
                  <div className={styles.topic_grid}>
                    {examples.map((example, idx) => (
                      <button 
                        key={idx} 
                        className={styles.topic_card}
                        onClick={() => sendMessage(example.text)}
                      >
                        <span className={styles.topic_icon}>{example.icon}</span>
                        <span>{example.text}</span>
                      </button>
                    ))}
                  </div>

                  <div className={styles.featured_topics}>
                    <h4>Popular Topics</h4>
                    <div className={styles.topic_tags}>
                      <span>Web Development</span>
                      <span>Artificial Intelligence</span>
                      <span>Cloud Computing</span>
                      <span>Cybersecurity</span>
                      <span>Mobile Development</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {chat.map((msg, i) => (
                  <div key={i} className={`${styles.message} ${msg.sender === "user" ? styles.user_msg : styles.bot_msg}`}>
                    <div className={styles.message_avatar}>
                      {msg.sender === "user" ? "👤" : "🎓"}
                    </div>
                    <div className={styles.message_bubble}>
                      <div className={styles.message_text}>
                        {msg.sender === "bot" ? <MessageWithLinks text={msg.text} /> : msg.text}
                      </div>
                      <div className={styles.message_time}>
                        {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className={`${styles.message} ${styles.bot_msg}`}>
                    <div className={styles.message_avatar}>🎓</div>
                    <div className={styles.message_bubble}>
                      <div className={styles.typing_indicator}>
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className={styles.input_container}>
            <div className={styles.input_wrapper}>
              <textarea
                className={styles.input_field}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for course recommendations..."
                rows={1}
              />
              <button className={styles.send_btn} onClick={() => sendMessage()} disabled={!message.trim()}>
                <img src={SendBtn} alt="Send" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}