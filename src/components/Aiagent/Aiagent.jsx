import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import styles from "./Aiagent.module.css";
import AnalyzeSkills from "../../assets/AnalyzeSkills.png";
import CareerAdvice from "../../assets/CareerAdvice.png";
import GenerateRoadmap from "../../assets/GenerateRoadmap.png";
import ReviewCV from "../../assets/ReviewCV.png";
import SendBtn from "../../assets/send.png";
import LampLight from "../../assets/Lamp_light2.png";
import Like from "../../assets/thumb_up.png";
import Dislike from "../../assets/thumb_down.png";

const drawerWidth = 262;

const quickActions = [
  { img: AnalyzeSkills, text: "Analyze Skills", icon: "📊", color: "#0A5ADB" },
  { img: CareerAdvice, text: "Career Advice", icon: "💼", color: "#58A7B5" },
  { img: GenerateRoadmap, text: "Generate Roadmap", icon: "🗺️", color: "#667eea" },
  { img: ReviewCV, text: "Review CV", icon: "📄", color: "#f59e0b" },
];

const Aiagent = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleQuickAction = (actionText) => {
    setMessage(actionText);
    setSelectedAction(actionText);
    setTimeout(() => {
      sendMessage(actionText);
    }, 100);
  };

  const sendMessage = async (customMessage = null) => {
    const msgToSend = customMessage || message;
    if (!msgToSend.trim()) return;

    const userMsg = { sender: "user", text: msgToSend, timestamp: new Date() };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    try {
      const res = await axios.post(
        "https://wish-abacus-barterer.ngrok-free.dev/chat",
        { message: msgToSend }
      );

      const data = res.data;

      let botText = "No courses found";

      if (data.courses && data.courses.length > 0) {
        botText = data.courses
          .map(
            (c) => `🎓 **${c.course_title}**\n📚 Level: ${c.level}\n🔗 ${c.url}`
          )
          .join("\n\n");
      }

      const botMsg = { sender: "bot", text: botText, timestamp: new Date() };
      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error connecting to server. Please try again.", timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
      setSelectedAction(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box component="main" className={styles.aiagent_container}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.aiagent_content}>
        {/* Quick Actions Section */}
        <div className={styles.quick_actions_section}>
          <div className={styles.section_header}>
            <div className={styles.header_icon_wrapper}>
              <span className={styles.header_icon}>⚡</span>
            </div>
            <h2 className={styles.section_title}>Quick Actions</h2>
            <p className={styles.section_subtitle}>Start with one click</p>
          </div>

          <div className={styles.actions_grid}>
            {quickActions.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.action_card} ${selectedAction === item.text ? styles.action_card_selected : ""}`}
                onClick={() => handleQuickAction(item.text)}
                style={{ borderBottomColor: item.color }}
              >
                <div className={styles.action_icon_wrapper} style={{ background: `${item.color}15` }}>
                  <span className={styles.action_emoji}>{item.icon}</span>
                  <img src={item.img} alt={item.text} className={styles.action_img} />
                </div>
                <div className={styles.action_content}>
                  <h3 className={styles.action_title}>{item.text}</h3>
                  <p className={styles.action_description}>
                    {item.text === "Analyze Skills" && "Evaluate your current skill set"}
                    {item.text === "Career Advice" && "Get personalized career guidance"}
                    {item.text === "Generate Roadmap" && "Create your learning path"}
                    {item.text === "Review CV" && "Improve your resume with AI"}
                  </p>
                </div>
                <div className={styles.action_arrow}>→</div>
              </div>
            ))}
          </div>

          <div className={styles.stats_badge}>
            <div className={styles.stats_item}>
              <span className={styles.stats_number}>1,234+</span>
              <span className={styles.stats_label}>Conversations</span>
            </div>
            <div className={styles.stats_divider}></div>
            <div className={styles.stats_item}>
              <span className={styles.stats_number}>98%</span>
              <span className={styles.stats_label}>Satisfaction</span>
            </div>
          </div>
        </div>

        {/* AI Mentor Chat Section */}
        <div className={styles.chat_section}>
          <div className={styles.chat_header}>
            <div className={styles.chat_header_left}>
              <div className={styles.chat_icon_wrapper}>
                <img src={LampLight} alt="AI Mentor" className={styles.chat_icon} />
                <div className={styles.chat_icon_pulse}></div>
              </div>
              <div>
                <h2 className={styles.chat_title}>AI Mentor Chat</h2>
                <p className={styles.chat_subtitle}>Your personal career assistant</p>
              </div>
            </div>
            <div className={styles.chat_status}>
              <span className={styles.status_dot}></span>
              <span className={styles.status_text}>Online</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className={styles.chat_messages}>
            {chat.length === 0 ? (
              <div className={styles.welcome_message}>
                <div className={styles.welcome_icon}>🤖</div>
                <h3 className={styles.welcome_title}>Hello! I'm your AI Career Mentor</h3>
                <p className={styles.welcome_text}>
                  Ask me about courses like "python backend" or "frontend react".<br />
                  I can help you with career advice, skill analysis, and learning paths.
                </p>
                <div className={styles.example_questions}>
                  <span className={styles.example_badge}>What courses for React?</span>
                  <span className={styles.example_badge}>Best Python resources</span>
                  <span className={styles.example_badge}>Career path for AI</span>
                </div>
              </div>
            ) : (
              <>
                {chat.map((msg, i) => (
                  <div
                    key={i}
                    className={`${styles.message} ${msg.sender === "user" ? styles.user_message : styles.bot_message}`}
                  >
                    <div className={styles.message_avatar}>
                      {msg.sender === "user" ? "👤" : "🤖"}
                    </div>
                    <div className={styles.message_content}>
                      <div className={styles.message_text}>
                        {msg.text.split('\n').map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < msg.text.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className={styles.message_time}>
                        {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className={`${styles.message} ${styles.bot_message}`}>
                    <div className={styles.message_avatar}>🤖</div>
                    <div className={styles.message_content}>
                      <div className={styles.typing_indicator}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Like / Dislike Buttons */}
          <div className={styles.feedback_buttons}>
            <button className={styles.feedback_btn}>
              <img src={Like} alt="Like" />
              <span>Helpful</span>
            </button>
            <button className={styles.feedback_btn}>
              <img src={Dislike} alt="Dislike" />
              <span>Not Helpful</span>
            </button>
          </div>

          {/* Input Area */}
          <div className={styles.input_area}>
            <div className={styles.input_wrapper}>
              <textarea
                className={styles.chat_input}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about courses, career advice, or skill development..."
                rows={1}
              />
              <button 
                className={styles.send_button}
                onClick={() => sendMessage()}
                disabled={!message.trim()}
              >
                <img src={SendBtn} alt="Send" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Aiagent;