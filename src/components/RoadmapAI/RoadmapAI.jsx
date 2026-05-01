import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RoadmapAI.module.css";
import SendBtn from "../../assets/send.png";

export default function RoadmapAI() {
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
      setSessionId("roadmap_" + Date.now());
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
        model_type: "roadmap"
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

  const careerPaths = [
    { title: "Frontend Developer", icon: "🎨", level: "Beginner to Advanced", description: "Build beautiful user interfaces" },
    { title: "Backend Developer", icon: "⚙️", level: "Intermediate", description: "Create powerful server-side applications" },
    { title: "Full Stack Developer", icon: "🌐", level: "Advanced", description: "Master both frontend and backend" },
    { title: "DevOps Engineer", icon: "🚀", level: "Intermediate", description: "Automate and optimize infrastructure" },
    { title: "Data Scientist", icon: "📊", level: "Beginner to Advanced", description: "Extract insights from data" },
    { title: "AI/ML Engineer", icon: "🤖", level: "Advanced", description: "Build intelligent systems" },
  ];

  const popularPaths = [
    "Software Engineer", "Cloud Architect", "Security Specialist", 
    "Game Developer", "Mobile Developer"
  ];

  return (
    <div className={styles.container}>
      <div className={styles.bg_gradient}></div>
      <div className={styles.bg_circle_1}></div>
      <div className={styles.bg_circle_2}></div>
      <div className={styles.floating_paths}>
        <span>🗺️</span>
        <span>📍</span>
        <span>🧭</span>
        <span>✨</span>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <button className={styles.back_btn} onClick={() => navigate('/aimentor')}>
            ← Back to Models
          </button>
          <div className={styles.header_info}>
            <div className={styles.header_icon}>
              <span className={styles.header_icon_emoji}>🗺️</span>
              <div className={styles.icon_ring}></div>
            </div>
            <div>
              <h1>Path Weaver</h1>
              <p>Create your personalized learning roadmap to career success</p>
            </div>
          </div>
        </div>

        <div className={styles.chat_container}>
          <div className={styles.chat_messages}>
            {chat.length === 0 ? (
              <div className={styles.welcome_section}>
                <div className={styles.welcome_card}>
                  <div className={styles.welcome_icon}>🧭</div>
                  <h2>Your Learning Journey Starts Here</h2>
                  <p>Tell me your career goal, and I'll create a step-by-step roadmap for you!</p>
                  
                  <div className={styles.path_grid}>
                    {careerPaths.map((path, idx) => (
                      <button 
                        key={idx} 
                        className={styles.path_card}
                        onClick={() => sendMessage(`I want to become a ${path.title}`)}
                      >
                        <span className={styles.path_icon}>{path.icon}</span>
                        <div className={styles.path_info}>
                          <span className={styles.path_title}>{path.title}</span>
                          <span className={styles.path_level}>{path.level}</span>
                          <span className={styles.path_description}>{path.description}</span>
                        </div>
                        <span className={styles.path_arrow}>→</span>
                      </button>
                    ))}
                  </div>

                  <div className={styles.popular_topics}>
                    <h4>🎯 Popular Career Paths</h4>
                    <div className={styles.topic_tags}>
                      {popularPaths.map((path, idx) => (
                        <span 
                          key={idx} 
                          onClick={() => sendMessage(`I want to become a ${path}`)}
                        >
                          {path}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              chat.map((msg, i) => (
                <div key={i} className={`${styles.message} ${msg.sender === "user" ? styles.user_msg : styles.bot_msg}`}>
                  <div className={styles.message_avatar}>
                    <span>{msg.sender === "user" ? "👤" : "🗺️"}</span>
                  </div>
                  <div className={styles.message_bubble}>
                    <div className={styles.message_text}>{msg.text}</div>
                    <div className={styles.message_time}>
                      {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isTyping && (
              <div className={`${styles.message} ${styles.bot_msg}`}>
                <div className={styles.message_avatar}>
                  <span>🗺️</span>
                </div>
                <div className={styles.message_bubble}>
                  <div className={styles.typing_indicator}>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className={styles.input_container}>
            <div className={styles.input_wrapper}>
              <textarea
                className={styles.input_field}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your career goal..."
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