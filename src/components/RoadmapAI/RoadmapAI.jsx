import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RoadmapAI.module.css";
import SendBtn from "../../assets/send.png";

const MessageWithLinks = ({ text }) => {
  if (!text || typeof text !== 'string') {
    return <>{text || ''}</>;
  }

  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textPart = text.substring(lastIndex, match.index);
      parts.push({ type: 'text', content: textPart });
    }
    parts.push({ type: 'link', content: match[0], url: match[0] });
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }
  
  if (parts.length === 0) {
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  }
  
  return (
    <div>
      {parts.map((part, idx) => {
        if (part.type === 'link') {
          return (
            <a key={idx} href={part.url} target="_blank" rel="noopener noreferrer" className={styles.message_link}>
              {part.content}
            </a>
          );
        }
        return <span key={idx} dangerouslySetInnerHTML={{ __html: part.content.replace(/\n/g, '<br/>') }} />;
      })}
    </div>
  );
};

// Component to display roadmap from API response
const RoadmapDisplay = ({ roadmap, career, knownSkills, marketInfo }) => {
  console.log("RoadmapDisplay received:", { roadmap, career, knownSkills, marketInfo });
  
  // Handle the roadmap array - it could be at different levels
  let roadmapSkills = [];
  
  if (Array.isArray(roadmap)) {
    roadmapSkills = roadmap;
  } else if (roadmap && Array.isArray(roadmap.roadmap)) {
    roadmapSkills = roadmap.roadmap;
  } else if (roadmap && roadmap.skills && Array.isArray(roadmap.skills)) {
    roadmapSkills = roadmap.skills;
  }
  
  console.log("Extracted roadmap skills:", roadmapSkills);
  
  if (!roadmapSkills || roadmapSkills.length === 0) {
    return null;
  }
  
  return (
    <div className={styles.roadmap_container}>
      <div className={styles.roadmap_header}>
        <h3 className={styles.roadmap_title}>
          🗺️ Your Personalized Learning Roadmap
          {career && <span className={styles.career_badge}>{career}</span>}
        </h3>
        
        {/* Career Description */}
        {marketInfo && (
          <div className={styles.market_info}>
            {marketInfo.demand && (
              <div className={styles.market_info_item}>
                <span className={styles.market_label}>📈 Demand:</span>
                <span className={styles.market_value}>{marketInfo.demand}</span>
              </div>
            )}
            {marketInfo.salary && (
              <div className={styles.market_info_item}>
                <span className={styles.market_label}>💰 Salary Range:</span>
                <span className={styles.market_value}>{marketInfo.salary}</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Known Skills Section */}
      {knownSkills && knownSkills.length > 0 && (
        <div className={styles.known_skills_section}>
          <h4>🎯 Your Skills</h4>
          <div className={styles.skills_tags}>
            {knownSkills.map((skill, index) => (
              <span key={index} className={styles.skill_tag_known}>
                {typeof skill === 'object' ? skill.name : skill}
              </span>
            ))}
          </div>
          <p className={styles.skill_note}>✨ Building upon your existing knowledge...</p>
        </div>
      )}
      
      {/* Learning Roadmap Timeline */}
      <div className={styles.timeline}>
        {roadmapSkills.map((skill, index) => (
          <div key={index} className={styles.timeline_item}>
            <div className={styles.timeline_marker}>
              <span className={styles.step_number}>{skill.order || index + 1}</span>
              <div className={styles.timeline_line}></div>
            </div>
            <div className={styles.timeline_content}>
              <div className={styles.step_header}>
                <h4 className={styles.step_title}>
                  {skill.skill || "Learning Module"}
                  {skill.level && (
                    <span className={`${styles.level_badge} ${styles[skill.level]}`}>
                      {skill.level}
                    </span>
                  )}
                  {skill.importance === 1 && (
                    <span className={styles.importance_badge}>⭐ Critical</span>
                  )}
                </h4>
                {skill.duration_weeks && (
                  <div className={styles.duration_badge}>
                    ⏱️ {skill.duration_weeks} week{skill.duration_weeks !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
              
              <p className={styles.step_description}>
                {skill.ai_explanation || `Learn ${skill.skill} to build expertise as a ${career || 'developer'}`}
              </p>
              
              {skill.learning_strategy && (
                <div className={styles.learning_strategy}>
                  <span className={styles.strategy_label}>📖 Learning Strategy:</span>
                  <p>{skill.learning_strategy}</p>
                </div>
              )}
              
              {skill.real_world_use && skill.real_world_use.length > 0 && (
                <div className={styles.real_world_use}>
                  <span className={styles.use_label}>💡 Real-world applications:</span>
                  <div className={styles.use_tags}>
                    {skill.real_world_use.map((use, i) => (
                      <span key={i} className={styles.use_tag}>{use}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {skill.project_ideas && skill.project_ideas.length > 0 && (
                <div className={styles.project_ideas}>
                  <span className={styles.project_label}>🚀 Project ideas:</span>
                  <ul className={styles.project_list}>
                    {skill.project_ideas.map((idea, i) => (
                      <li key={i}>{idea}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Next Steps */}
      <div className={styles.next_steps}>
        <h4>🎯 Ready to Start Learning?</h4>
        <div className={styles.resource_links}>
          <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer" className={styles.resource_link}>
            📚 Coursera
          </a>
          <a href="https://www.udemy.com" target="_blank" rel="noopener noreferrer" className={styles.resource_link}>
            🎓 Udemy
          </a>
          <a href="https://www.freecodecamp.org" target="_blank" rel="noopener noreferrer" className={styles.resource_link}>
            💻 freeCodeCamp
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.resource_link}>
            🔗 GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default function RoadmapAI() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [waitingForSkills, setWaitingForSkills] = useState(false);
  const chatEndRef = useRef(null);

  const API_BASE_URL = "https://fathymohamed-roadmapai.hf.space";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (!sessionId) {
      setSessionId("roadmap_" + Date.now());
    }
  }, [sessionId]);

  const sendMessage = async (customMessage = null) => {
    const msgToSend = customMessage || message;
    if (!msgToSend.trim() || !sessionId || isLoading) return;

    const userMsg = { sender: "user", text: msgToSend, timestamp: new Date() };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);
    setIsLoading(true);

    try {
      const requestPayload = {
        message: msgToSend,
        session_id: sessionId,
        model_type: "roadmap"
      };
      
      console.log("📤 Sending roadmap request:", requestPayload);

      const res = await axios.post(`${API_BASE_URL}/chat`, requestPayload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 60000
      });
      
      const data = res.data;
      console.log("📥 Full response received:", JSON.stringify(data, null, 2));
      
      // Extract the bot message text
      let botMessageText = data.reply || "Here's your personalized learning roadmap!";
      
      // Extract career name
      let careerName = data.career || "";
      
      // Extract known skills (top level)
      let knownSkillsArray = data.known_skills || [];
      
      // Extract market info from nested roadmap object
      let marketInfoObj = null;
      if (data.roadmap && data.roadmap.market_info) {
        marketInfoObj = data.roadmap.market_info;
      }
      
      // Extract roadmap array - it's nested inside data.roadmap.roadmap
      let roadmapArray = null;
      if (data.roadmap && data.roadmap.roadmap && Array.isArray(data.roadmap.roadmap)) {
        roadmapArray = data.roadmap.roadmap;
        console.log("Found roadmap array with", roadmapArray.length, "items");
      } else if (data.roadmap && Array.isArray(data.roadmap)) {
        roadmapArray = data.roadmap;
      } else if (Array.isArray(data.roadmap)) {
        roadmapArray = data.roadmap;
      }
      
      // Check if the response is asking for skills (contains a question about skills)
      const isAskingForSkills = botMessageText.toLowerCase().includes("what skills") || 
                                botMessageText.toLowerCase().includes("do you already have") ||
                                botMessageText.toLowerCase().includes("tell me about your") ||
                                botMessageText.toLowerCase().includes("current skills");
      
      // Create bot message with all the extracted data
      let botMsg = { 
        sender: "bot", 
        text: botMessageText,
        timestamp: new Date(),
        careerName: careerName,
        knownSkills: knownSkillsArray,
        marketInfo: marketInfoObj,
        roadmapData: roadmapArray,
        isAskingForSkills: isAskingForSkills
      };
      
      console.log("Bot message created:", { 
        careerName, 
        knownSkills: knownSkillsArray, 
        roadmapLength: roadmapArray?.length,
        marketInfo: marketInfoObj,
        isAskingForSkills
      });
      
      setChat((prev) => [...prev, botMsg]);
      
      // If the bot is asking for skills, set waiting flag
      if (isAskingForSkills && (!roadmapArray || roadmapArray.length === 0)) {
        setWaitingForSkills(true);
      } else {
        setWaitingForSkills(false);
      }

      if (data.session_id && data.session_id !== sessionId) {
        console.log("🔄 Updating session ID:", data.session_id);
        setSessionId(data.session_id);
      }
      
    } catch (err) {
      console.error("❌ API Error:", err);
      
      let errorMessage = "❌ Error connecting to the server.";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = "❌ Request timeout. Please try again.";
      } else if (err.response) {
        console.error("Response data:", err.response.data);
        errorMessage = `❌ Server error: ${err.response.status}. Please try again later.`;
        
        if (err.response.status === 422) {
          errorMessage = "❌ Invalid request format. Please try rephrasing your career goal.\n\nExample: 'I want to become a Data Scientist'";
        }
      } else if (err.request) {
        errorMessage = "❌ Cannot connect to the server. Please check your connection.";
      } else {
        errorMessage = `❌ Error: ${err.message}`;
      }
      
      setChat((prev) => [...prev, { 
        sender: "bot", 
        text: errorMessage, 
        timestamp: new Date() 
      }]);
      setWaitingForSkills(false);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${API_BASE_URL}/reset`, {
        session_id: sessionId
      });
      setChat([]);
      setSessionId("roadmap_" + Date.now());
      setWaitingForSkills(false);
      console.log("🔄 Chat reset successfully");
    } catch (err) {
      console.error("Failed to reset chat:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCareerSelect = (careerText) => {
    // Directly send the message without any popup
    sendMessage(careerText);
  };

  const careerPaths = [
    { text: "Frontend Developer", icon: "🎨", description: "Bring designs to life and create smooth, interactive user experiences" },
    { text: "Backend Developer", icon: "⚙️", description: "Handle behind-the-scenes logic, data processing, and server operations" },
    { text: "Full Stack Developer", icon: "🌐", description: "Work across both client-side and server-side development" },
    { text: "Data Scientist", icon: "📊", description: "Turn raw data into meaningful insights to guide decisions" },
    { text: "DevOps Engineer", icon: "🔧", description: "Streamline development workflows and infrastructure management" },
    { text: "AI/ML Engineer", icon: "🤖", description: "Create systems that learn and adapt from experience" },
    { text: "Cloud Architect", icon: "☁️", description: "Plan and manage flexible, resilient cloud environments" },
    { text: "Security Specialist", icon: "🔒", description: "Identify vulnerabilities and defend against digital threats" },
];

  // Update placeholder based on waiting state
  const inputPlaceholder = waitingForSkills 
    ? "Enter your current skills (e.g., HTML, CSS, JavaScript)..." 
    : "Enter your career goal (e.g., I want to become a Data Scientist)...";

  return (
    <div className={styles.container}>
      <div className={styles.bg_gradient}></div>
      <div className={styles.bg_circle_1}></div>
      <div className={styles.bg_circle_2}></div>
      <div className={styles.bg_circle_3}></div>
      <div className={styles.floating_paths}>
        <span>🗺️</span>
        <span>📍</span>
        <span>🧭</span>
        <span>✨</span>
        <span>🎯</span>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <button className={styles.back_btn} onClick={() => navigate('/aimentor')}>
            ← Back to Models
          </button>
          <div className={styles.header_info}>
            <div className={styles.header_icon}>
              <span>🗺️</span>
              <div className={styles.icon_ring}></div>
            </div>
            <div>
              <h1>Path Weaver</h1>
              <p>Create your personalized learning roadmap to career success</p>
            </div>
          </div>
          <button className={styles.reset_btn} onClick={handleReset} disabled={isLoading}>
            🔄 New Chat
          </button>
        </div>

        <div className={styles.chat_container}>
          <div className={styles.chat_messages}>
            {chat.length === 0 ? (
              <div className={styles.welcome_section}>
                <div className={styles.welcome_card}>
                  <div className={styles.welcome_icon}>🧭</div>
                  <h2>Your Learning Journey Starts Here</h2>
                  <p>Tell me your career goal, and I'll create a step-by-step roadmap for you!</p>
                  
                  <div className={styles.topic_grid}>
                    {careerPaths.slice(0, 4).map((path, idx) => (
                      <button 
                        key={idx} 
                        className={styles.topic_card}
                        onClick={() => handleCareerSelect(`I want to become a ${path.text}. ${path.description}`)}
                        disabled={isLoading}
                      >
                        <span className={styles.topic_icon}>{path.icon}</span>
                        <span>{path.text}</span>
                      </button>
                    ))}
                  </div>

                  <div className={styles.topic_grid_secondary}>
                    {careerPaths.slice(4, 8).map((path, idx) => (
                      <button 
                        key={idx} 
                        className={styles.topic_card_secondary}
                        onClick={() => handleCareerSelect(`I want to become a ${path.text}. ${path.description}`)}
                        disabled={isLoading}
                      >
                        <span className={styles.topic_icon}>{path.icon}</span>
                        <span>{path.text}</span>
                      </button>
                    ))}
                  </div>

                  <div className={styles.featured_topics}>
                    <div className={styles.topic_tags}>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {chat.map((msg, i) => (
                  <div key={i} className={`${styles.message} ${msg.sender === "user" ? styles.user_msg : styles.bot_msg}`}>
                    <div className={styles.message_bubble}>
                      <div className={styles.message_text}>
                        {msg.sender === "user" ? (
                          msg.text
                        ) : (
                          <>
                            <MessageWithLinks text={msg.text} />
                            {msg.roadmapData && msg.roadmapData.length > 0 && (
                              <RoadmapDisplay 
                                roadmap={msg.roadmapData}
                                career={msg.careerName}
                                knownSkills={msg.knownSkills}
                                marketInfo={msg.marketInfo}
                              />
                            )}
                          </>
                        )}
                      </div>
                      <div className={styles.message_time}>
                        {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className={`${styles.message} ${styles.bot_msg}`}>
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

          <div className={styles.input_container}>
            <div className={styles.input_wrapper}>
              <textarea
                className={styles.input_field}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={inputPlaceholder}
                rows={1}
                disabled={isLoading}
              />
              <button 
                className={styles.send_btn} 
                onClick={() => sendMessage()} 
                disabled={!message.trim() || isLoading}
              >
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