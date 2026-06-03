import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RecommendationCourses.module.css";
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

// Component for Framework/Language Selection
const FrameworkLanguageSelection = ({ frameworks, languages, subject, onSelect }) => {
  return (
    <div className={styles.interactive_container}>
      <div className={styles.subject_header}>
        <div className={styles.subject_icon_wrapper}>
          <span className={styles.subject_icon}>📚</span>
        </div>
        <div className={styles.subject_info}>
          <span className={styles.subject_label}>Selected Subject</span>
          <h3 className={styles.subject_title}>{subject || "Technology"}</h3>
        </div>
      </div>

      {frameworks && frameworks.length > 0 && (
        <div className={styles.category_section}>
          <div className={styles.category_header}>
            <span className={styles.category_icon}>🔧</span>
            <span className={styles.category_title}>Frameworks</span>
            <span className={styles.category_count}>{frameworks.length}</span>
          </div>
          <div className={styles.options_grid}>
            {frameworks.map((option, idx) => (
              <button
                key={idx}
                className={`${styles.option_button} ${styles.framework_button}`}
                onClick={() => onSelect(option, 'framework')}
              >
                <span className={styles.option_icon}>⚡</span>
                <span className={styles.option_text}>{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {languages && languages.length > 0 && (
        <div className={styles.category_section}>
          <div className={styles.category_header}>
            <span className={styles.category_icon}>💻</span>
            <span className={styles.category_title}>Languages</span>
            <span className={styles.category_count}>{languages.length}</span>
          </div>
          <div className={styles.options_grid}>
            {languages.map((option, idx) => (
              <button
                key={idx}
                className={`${styles.option_button} ${styles.language_button}`}
                onClick={() => onSelect(option, 'language')}
              >
                <span className={styles.option_icon}>📝</span>
                <span className={styles.option_text}>{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Component for Level Selection
const LevelSelection = ({ language, levels, onSelect }) => {
  return (
    <div className={styles.interactive_container}>
      <div className={styles.subject_header}>
        <div className={styles.subject_icon_wrapper}>
          <span className={styles.subject_icon}>🎯</span>
        </div>
        <div className={styles.subject_info}>
          <span className={styles.subject_label}>Selected Technology</span>
          <h3 className={styles.subject_title}>{language}</h3>
        </div>
      </div>
      <div className={styles.category_section}>
        <div className={styles.category_header}>
          <span className={styles.category_icon}>📊</span>
          <span className={styles.category_title}>Choose Your Level</span>
          <span className={styles.category_count}>{levels.length}</span>
        </div>
        <div className={styles.options_grid}>
          {levels.map((level, idx) => (
            <button
              key={idx}
              className={`${styles.option_button} ${styles.level_button}`}
              onClick={() => onSelect(level, 'level')}
            >
              <span className={styles.option_icon}>
                {level.toLowerCase().includes('beginner') ? '🌱' :
                  level.toLowerCase().includes('expert') ? '🚀' : '📈'}
              </span>
              <span className={styles.option_text}>{level}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Component to display course recommendations
const CourseRecommendations = ({ courses, projects, faces }) => {
  return (
    <div className={styles.recommendations_container}>
      {courses && courses.length > 0 && (
        <div className={styles.section}>
          <h3>📚 Courses</h3>
          {courses.map((course, index) => (
            <div key={index} className={styles.recommendation_card}>
              <div className={styles.recommendation_title}>
                {course.title || 'Course'}
              </div>
              {course.level && (
                <div className={styles.recommendation_level}>
                  📊 {course.level}
                </div>
              )}
              {course.framework && (
                <div className={styles.recommendation_framework}>
                  🔧 Framework: {course.framework}
                </div>
              )}
              {course.url && (
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.recommendation_link}
                >
                  🔗 View Course →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className={styles.section}>
          <h3>💼 Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className={styles.recommendation_card}>
              <div className={styles.recommendation_title}>
                {project.title || 'Project'}
              </div>
              {project.level && (
                <div className={styles.recommendation_level}>
                  📊 {project.level}
                </div>
              )}
              {project.framework && (
                <div className={styles.recommendation_framework}>
                  🔧 Framework: {project.framework}
                </div>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.recommendation_link}
                >
                  🔗 View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {faces && faces.length > 0 && (
        <div className={styles.section}>
          <h3>👥 Face to Face Courses</h3>
          {faces.map((face, index) => (
            <div key={index} className={styles.recommendation_card}>
              <div className={styles.recommendation_title}>
                {face.title || 'Face to Face Course'}
              </div>
              {face.level && (
                <div className={styles.recommendation_level}>
                  📊 {face.level}
                </div>
              )}
              {face.framework && (
                <div className={styles.recommendation_framework}>
                  🔧 Framework: {face.framework}
                </div>
              )}
              {face.url && (
                <a
                  href={face.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.recommendation_link}
                >
                  🔗 View Course →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function RecommendationCourses() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState({});
  const chatEndRef = useRef(null);
  const API_BASE_URL = "https://fathymohamed-smartmentor.hf.space";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (!sessionId) {
      setSessionId("recommendation_" + Date.now());
    }
  }, [sessionId]);

  const parseResponse = (text) => {
    if (!text || typeof text !== 'string') return null;
    let subject = null;
    let frameworks = [];
    let languages = [];
    let levels = [];
    let selectedLanguage = null;

    const cleanText = text.replace(/\*\*/g, '').trim();

    const subjectPatterns = [
      /Subject:\s*(.+?)(?:\n|$)/i,
      /selected subject[:\s]+(.+?)(?:\n|$)/i,
      /^Technology$/i
    ];

    for (const pattern of subjectPatterns) {
      const match = cleanText.match(pattern);
      if (match) {
        subject = match[1].trim() || 'Technology';
        break;
      }
    }

    if (!subject) subject = 'Technology';

    const frameworkSection = cleanText.match(/Frameworks?:\s*(.+?)(?:\n|Languages?:|$)/is);
    if (frameworkSection) {
      const frameworkText = frameworkSection[1].trim();
      frameworks = frameworkText
        .split(/[,،,;]|\bor\b/)
        .map(f => f.trim())
        .filter(f => {
          const noise = ['or language', 'please select', 'choose', 'select', 'technology', ')', '(', '.', ''];
          return f.length > 2 && !noise.includes(f.toLowerCase()) && !f.includes(')');
        });
    }

    const languageSection = cleanText.match(/Languages?:\s*(.+?)(?:\n|Levels?:|$)/is);
    if (languageSection) {
      const languageText = languageSection[1].trim();
      languages = languageText
        .split(/[,،,;]|\band\b/)
        .map(l => l.trim())
        .filter(l => {
          const noise = ['please', 'choose', 'select', 'or', ')', '(', '.', ''];
          return l.length > 2 && !noise.includes(l.toLowerCase()) && !l.includes(')');
        });
    }

    const levelSection = cleanText.match(/Levels?:\s*(.+?)(?:\n|$)/is);
    if (levelSection) {
      const levelText = levelSection[1].trim();
      levels = levelText
        .split(/[,،,;]/)
        .map(l => l.trim())
        .filter(l => {
          const noise = ['please', 'choose', 'select', 'your', 'level', ')', '(', '.', ''];
          return l.length > 2 && !noise.includes(l.toLowerCase());
        });
    }

    if (levels.length > 0 && (selectedLanguage || frameworks[0] || languages[0])) {
      const tech = selectedLanguage || frameworks[0] || languages[0];
      return {
        type: 'level_selection',
        levels: levels,
        language: tech,
        cleanText: `Please choose your proficiency level for ${tech}:`
      };
    }

    if (frameworks.length > 0 || languages.length > 0) {
      return {
        type: 'framework_language_selection',
        frameworks: frameworks,
        languages: languages,
        subject: subject,
        cleanText: `I see you're interested in ${subject}. Please select a framework or language:`
      };
    }

    return null;
  };

  // Helper function to extract courses from response
  const extractCourses = (data) => {
    console.log("=== API Response Data ===", data);
    
    let courses = [];
    let projects = [];
    let faces = [];

    // Try multiple possible structures
    if (data.courses) {
      courses = Array.isArray(data.courses) ? data.courses : [];
    } else if (data.recommendations?.courses) {
      courses = Array.isArray(data.recommendations.courses) ? data.recommendations.courses : [];
    } else if (data.data?.courses) {
      courses = Array.isArray(data.data.courses) ? data.data.courses : [];
    }

    if (data.projects) {
      projects = Array.isArray(data.projects) ? data.projects : [];
    } else if (data.recommendations?.projects) {
      projects = Array.isArray(data.recommendations.projects) ? data.recommendations.projects : [];
    } else if (data.data?.projects) {
      projects = Array.isArray(data.data.projects) ? data.data.projects : [];
    }

    if (data.faces) {
      faces = Array.isArray(data.faces) ? data.faces : [];
    } else if (data.recommendations?.faces) {
      faces = Array.isArray(data.recommendations.faces) ? data.recommendations.faces : [];
    } else if (data.data?.faces) {
      faces = Array.isArray(data.data.faces) ? data.data.faces : [];
    }

    // Check if the entire response IS an array of courses
    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];
      if (firstItem.title || firstItem.url) {
        courses = data;
      }
    }

    console.log("Extracted - Courses:", courses, "Projects:", projects, "Faces:", faces);
    
    return { courses, projects, faces };
  };

  // Handle framework/language selection
  const handleFrameworkLanguageSelect = async (option, type) => {
    const userMsg = {
      sender: "user",
      text: option,
      timestamp: new Date(),
      isOptionSelection: true
    };
    setChat((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setIsLoading(true);

    try {
      const requestPayload = {
        message: `I want to learn ${option}`,
        session_id: sessionId,
        model_type: "recommendation"
      };

      const res = await axios.post(`${API_BASE_URL}/chat`, requestPayload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000
      });

      const data = res.data;
      console.log("=== Framework Selection Response ===", data);
      
      let botMessageText = data.reply || "Here are your recommendations: ";

      // Extract courses from response
      const { courses, projects, faces } = extractCourses(data);
      
      // Also parse for level selection
      const levelData = parseResponse(botMessageText);

      let botMsg;

      // If we have courses, show them
      if (courses.length > 0 || projects.length > 0 || faces.length > 0) {
        botMsg = {
          sender: "bot",
          text: botMessageText,
          recommendations: { courses, projects, faces },
          timestamp: new Date(),
          id: Date.now()
        };
      } else if (levelData && levelData.type === 'level_selection') {
        botMsg = {
          sender: "bot",
          text: levelData.cleanText,
          levelSelection: {
            levels: levelData.levels,
            language: levelData.language
          },
          timestamp: new Date(),
          id: Date.now()
        };
      } else {
        botMsg = {
          sender: "bot",
          text: botMessageText,
          timestamp: new Date(),
          id: Date.now()
        };
      }

      setChat((prev) => [...prev, botMsg]);

    } catch (err) {
      console.error("Error: ", err);
      setChat((prev) => [...prev, {
        sender: "bot",
        text: "❌ Error getting level options. Please try again.",
        timestamp: new Date(),
        id: Date.now()
      }]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  // Handle level selection
  const handleLevelSelect = async (level, type) => {
    const userMsg = {
      sender: "user",
      text: level,
      timestamp: new Date(),
      isOptionSelection: true
    };
    setChat((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setIsLoading(true);

    try {
      const requestPayload = {
        message: `${level} level`,
        session_id: sessionId,
        model_type: "recommendation"
      };

      const res = await axios.post(`${API_BASE_URL}/chat`, requestPayload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000
      });

      const data = res.data;
      console.log("=== Level Selection Response ===", data);
      
      let botMessageText = data.reply || "Here are your recommendations: ";

      const { courses, projects, faces } = extractCourses(data);

      const botMsg = {
        sender: "bot",
        text: botMessageText,
        recommendations: { courses, projects, faces },
        timestamp: new Date(),
        id: Date.now()
      };

      setChat((prev) => [...prev, botMsg]);

    } catch (err) {
      console.error("Error: ", err);
      setChat((prev) => [...prev, {
        sender: "bot",
        text: "❌ Error getting recommendations. Please try again.",
        timestamp: new Date(),
        id: Date.now()
      }]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const sendMessage = async (customMessage = null) => {
    const msgToSend = customMessage || message;
    if (!msgToSend.trim() || !sessionId || isLoading) return;

    const userMsg = { sender: "user", text: msgToSend, timestamp: new Date() };
    setChat((prev) => [...prev, userMsg]);
    if (!customMessage) setMessage("");
    setIsTyping(true);
    setIsLoading(true);

    try {
      const requestPayload = {
        message: msgToSend,
        session_id: sessionId,
        model_type: "recommendation"
      };

      const res = await axios.post(`${API_BASE_URL}/chat`, requestPayload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 60000
      });

      const data = res.data;
      console.log("=== Initial Message Response ===", data);
      
      let botMessageText = data.reply || "Here are your recommendations: ";

      const interactiveData = parseResponse(botMessageText);
      const { courses, projects, faces } = extractCourses(data);

      const hasRecommendations = courses.length > 0 || projects.length > 0 || faces.length > 0;

      let botMsg;

      if (hasRecommendations) {
        botMsg = {
          sender: "bot",
          text: botMessageText,
          recommendations: { courses, projects, faces },
          timestamp: new Date(),
          id: Date.now()
        };
      } else if (interactiveData && interactiveData.type === 'framework_language_selection') {
        botMsg = {
          sender: "bot",
          text: interactiveData.cleanText,
          frameworkLanguageSelection: {
            frameworks: interactiveData.frameworks,
            languages: interactiveData.languages,
            subject: interactiveData.subject
          },
          timestamp: new Date(),
          id: Date.now()
        };
      } else if (interactiveData && interactiveData.type === 'level_selection') {
        botMsg = {
          sender: "bot",
          text: interactiveData.cleanText,
          levelSelection: {
            levels: interactiveData.levels,
            language: interactiveData.language
          },
          timestamp: new Date(),
          id: Date.now()
        };
      } else {
        botMsg = {
          sender: "bot",
          text: botMessageText,
          timestamp: new Date(),
          id: Date.now()
        };
      }

      setChat((prev) => [...prev, botMsg]);

      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
      }

    } catch (err) {
      console.error("Error: ", err);
      setChat((prev) => [...prev, {
        sender: "bot",
        text: "❌ Error connecting to the server. Please try again.",
        timestamp: new Date(),
        id: Date.now()
      }]);
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
      await axios.post(`${API_BASE_URL}/reset`, { session_id: sessionId });
      setChat([]);
      setConversationContext({});
      setSessionId("recommendation_" + Date.now());
    } catch (err) {
      console.error("Failed to reset chat:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const examples = [
    { text: "React courses for beginners", icon: "⚛️" },
    { text: "Python backend development", icon: "" },
    { text: "Data Science with Python", icon: "📊" },
    { text: "Machine Learning basics", icon: "🤖" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.bg_gradient}></div>
      <div className={styles.bg_circle_1}></div>
      <div className={styles.bg_circle_2}></div>
      <div className={styles.bg_circle_3}></div>
      <div className={styles.floating_books}>
        <span>📚</span>  <span>🎓</span>  <span>📖</span>  <span>✨</span>
      </div>
      <div className={styles.content}>
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
          <button className={styles.reset_btn} onClick={handleReset} disabled={isLoading}>
            🔄 New Chat
          </button>
        </div>

        <div className={styles.chat_container}>
          <div className={styles.chat_messages}>
            {chat.length === 0 ? (
              <div className={styles.welcome_section}>
                <div className={styles.welcome_card}>
                  <div className={styles.welcome_icon}></div>
                  <h2>Find Your Perfect Course</h2>
                  <p>Tell me what you want to learn, and I'll recommend the best courses for you!</p>

                  <div className={styles.topic_grid}>
                    {examples.map((example, idx) => (
                      <button key={idx} className={styles.topic_card} onClick={() => sendMessage(example.text)} disabled={isLoading}>
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
                      <span>Mobile Development</span>
                      <span>Cloud Computing</span>
                      <span>DevOps</span>
                      <span>Cybersecurity</span>
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
                            {msg.recommendations && (
                              <CourseRecommendations
                                courses={msg.recommendations.courses}
                                projects={msg.recommendations.projects}
                                faces={msg.recommendations.faces}
                              />
                            )}
                            {msg.frameworkLanguageSelection && (
                              <FrameworkLanguageSelection
                                frameworks={msg.frameworkLanguageSelection.frameworks}
                                languages={msg.frameworkLanguageSelection.languages}
                                subject={msg.frameworkLanguageSelection.subject}
                                onSelect={handleFrameworkLanguageSelect}
                              />
                            )}
                            {msg.levelSelection && (
                              <LevelSelection
                                language={msg.levelSelection.language}
                                levels={msg.levelSelection.levels}
                                onSelect={handleLevelSelect}
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
                        <span></span>  <span></span>  <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </>
            )}
          </div>

          <div className={styles.input_container}>
            <div className={styles.input_wrapper}>
              <textarea
                className={styles.input_field}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for course recommendations... (e.g., 'React courses for beginners')"
                rows={1}
                disabled={isLoading}
              />
              <button className={styles.send_btn} onClick={() => sendMessage()} disabled={!message.trim() || isLoading}>
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