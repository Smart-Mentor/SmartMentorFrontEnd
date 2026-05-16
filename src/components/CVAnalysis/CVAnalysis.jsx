import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CVAnalysis.module.css";
import SendBtn from "../../assets/send.png";

export default function CVAnalysis() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (!sessionId) {
      setSessionId("cvanalysis_" + Date.now());
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
        model_type: "cv_analysis"
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      sendMessage(`I've uploaded my CV: ${file.name}. Please analyze it and recommend suitable jobs.`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.bg_gradient}></div>
      <div className={styles.bg_circle_1}></div>
      <div className={styles.bg_circle_2}></div>
      <div className={styles.floating_docs}>
        <span>📄</span>
        <span>📑</span>
        <span>📋</span>
        <span>✨</span>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <button className={styles.back_btn} onClick={() => navigate('/aimentor')}>
            ← Back to Models
          </button>
          <div className={styles.header_info}>
            <div className={styles.header_icon}>
              <span>⚡</span>
            </div>
            <div>
              <h1>Profile Optimizer</h1>
              <p>AI-powered CV analysis and personalized job recommendations</p>
            </div>
          </div>
        </div>

        <div className={styles.chat_container}>
          <div className={styles.chat_messages}>
            {chat.length === 0 ? (
              <div className={styles.welcome_section}>
                <div className={styles.welcome_card}>
                  <div className={styles.welcome_icon}>📄⚡</div>
                  <h2>Optimize Your Profile</h2>
                  <p>Upload your CV or describe your skills for AI-powered analysis and job matching!</p>
                  
                  <div className={styles.upload_area} onClick={() => fileInputRef.current?.click()}>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.doc,.docx" hidden />
                    <div className={styles.upload_icon}>📁</div>
                    <p>Click to upload your CV</p>
                    <span>PDF, DOC, DOCX (max 5MB)</span>
                  </div>
                </div>
              </div>
            ) : (
              chat.map((msg, i) => (
                <div key={i} className={`${styles.message} ${msg.sender === "user" ? styles.user_msg : styles.bot_msg}`}>
                  <div className={styles.message_avatar}>
                    {msg.sender === "user" ? "👤" : "⚡"}
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
                <div className={styles.message_avatar}>⚡</div>
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
                placeholder="Ask about your CV, skills, or job recommendations..."
                rows={1}
              />
              <button className={styles.upload_btn} onClick={() => fileInputRef.current?.click()} title="Upload CV">
                <i className="fas fa-upload"></i>
              </button>
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