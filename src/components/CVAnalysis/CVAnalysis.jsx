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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [analysisMode, setAnalysisMode] = useState(null); // 'file' or 'text'
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);

  const API_BASE_URL = "https://fathymohamed-cv-analysis.hf.space";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (!sessionId) {
      setSessionId("cvanalysis_" + Date.now());
    }
  }, []);

  const analyzeCVWithFile = async (file, top_n = 5) => {
    setIsAnalyzing(true);
    setIsTyping(true);
    
    const formData = new FormData();
    formData.append("cv", file);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/recommend?top_n=${top_n}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 60000,
        }
      );
      return response.data;
    } catch (error) {
      console.error("CV Analysis Error:", error);
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        throw new Error("No response from server. Please check if the API is running.");
      } else {
        throw new Error(`Request failed: ${error.message}`);
      }
    } finally {
      setIsAnalyzing(false);
      setIsTyping(false);
    }
  };

  const analyzeCVWithText = async (textMessage, top_n = 5) => {
    setIsAnalyzing(true);
    setIsTyping(true);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/recommend/text`,
        null,
        {
          params: {
            message: textMessage,
            top_n: top_n
          },
          timeout: 60000,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Text Analysis Error:", error);
      if (error.response) {
        throw new Error(`Server error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        throw new Error("No response from server. Please check if the API is running.");
      } else {
        throw new Error(`Request failed: ${error.message}`);
      }
    } finally {
      setIsAnalyzing(false);
      setIsTyping(false);
    }
  };

  const parseJobRecommendations = (data) => {
    if (!data || !data.jobs) return null;

    const parsedData = {
      detectedSkills: data.cv_skills || data.detected_skills || data.skills || [],
      totalSkills: data.total_cv_skills || (data.cv_skills?.length || 0),
      jobs: [],
      summary: data.summary || null
    };

    data.jobs.forEach((job, index) => {
      let matchedSkillsList = [];
      let missingSkillsList = [];
      
      if (job.matched_skills && job.matched_skills.length > 0) {
        job.matched_skills.forEach(match => {
          if (match.matched_skills) {
            matchedSkillsList.push(...match.matched_skills);
          }
          if (match.missing_skills) {
            missingSkillsList.push(...match.missing_skills);
          }
        });
      }
      
      if (job.missingskill && job.missingskill.length > 0) {
        missingSkillsList.push(...job.missingskill);
      }

      parsedData.jobs.push({
        id: index,
        title: job.title || "Position",
        company: job.company || "Company",
        speciality: job.speciality || null,
        location: job.location || "Not specified",
        workType: job.job_location_type || "Not specified",
        jobType: job.job_type || "Not specified",
        similarity: job.similarity || 0,
        skillMatchRate: job.skill_match_rate || 0,
        url: job.url || null,
        matchedSkills: [...new Set(matchedSkillsList)],
        missingSkills: [...new Set(missingSkillsList)],
        description: job.description || null
      });
    });

    return parsedData;
  };

  const renderSkillsSection = (skills, totalCount) => {
    if (!skills || skills.length === 0) {
      return (
        <div className={styles.skills_section}>
          <div className={styles.section_header}>
            <span className={styles.section_icon}>🔍</span>
            <h4>Skills Detected</h4>
            <span className={styles.skill_count}>0 skills</span>
          </div>
          <div className={styles.no_skills_message}>
            <p>No skills were detected from your input. Please provide more details about your skills and experience.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className={styles.skills_section}>
        <div className={styles.section_header}>
          <div className={styles.section_title}>
            <span className={styles.section_icon}>🔍</span>
            <h4>Skills Detected</h4>
          </div>
          <div className={styles.skill_stats}>
            <span className={styles.skill_count_badge}>
              📊 {totalCount} Skills Identified
            </span>
          </div>
        </div>
        
        <div className={styles.skills_summary}>
          <div className={styles.summary_stat}>
            <span className={styles.stat_number}>{totalCount}</span>
            <span className={styles.stat_label}>Total Skills</span>
          </div>
        </div>
        
        <div className={styles.skills_tags_container}>
          {skills.filter(s => s && s.trim()).map((skill, idx) => (
            <span key={idx} className={styles.skill_tag}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderJobCard = (job) => {
    const getScoreClass = (score) => {
      if (score >= 70) return styles.high_score;
      if (score >= 50) return styles.medium_score;
      return styles.low_score;
    };

    return (
      <div key={job.id} className={styles.job_card}>
        <div className={styles.job_header}>
          <div className={styles.job_title_wrapper}>
            <span className={styles.job_number}>{job.id + 1}</span>
            <h3 className={styles.job_title}>{job.title}</h3>
          </div>
          <div className={styles.score_badges}>
            {job.similarity > 0 && (
              <span className={`${styles.score_badge} ${getScoreClass(job.similarity)}`}>
                🎯 {job.similarity}% Match
              </span>
            )}
            {job.skillMatchRate > 0 && (
              <span className={`${styles.score_badge} ${getScoreClass(job.skillMatchRate)}`}>
                📊 {job.skillMatchRate}% Skills
              </span>
            )}
          </div>
        </div>

        {job.company && (
          <div className={styles.job_company}>
            <span>🏢</span> {job.company}
            {job.speciality && <span className={styles.speciality_badge}>{job.speciality}</span>}
          </div>
        )}

        <div className={styles.job_details_grid}>
          {job.location && job.location !== "Not specified" && (
            <div className={styles.job_detail}>
              <span className={styles.detail_icon}>📍</span>
              <span>{job.location}</span>
            </div>
          )}
          {job.workType && job.workType !== "Not specified" && (
            <div className={styles.job_detail}>
              <span className={styles.detail_icon}>🏠</span>
              <span>{job.workType}</span>
            </div>
          )}
          {job.jobType && job.jobType !== "Not specified" && (
            <div className={styles.job_detail}>
              <span className={styles.detail_icon}>⏰</span>
              <span>{job.jobType}</span>
            </div>
          )}
        </div>

        {(job.matchedSkills.length > 0 || job.missingSkills.length > 0) && (
          <div className={styles.skills_analysis}>
            <div className={styles.skills_analysis_header}>
              <span>📋</span>
              <strong>Skills Analysis</strong>
            </div>
            
            {job.matchedSkills.length > 0 && (
              <div className={styles.matched_skills_section}>
                <div className={styles.section_label}>
                  <span className={styles.matched_icon}>✓</span>
                  <span>Matched Skills ({job.matchedSkills.length})</span>
                </div>
                <div className={styles.skills_list}>
                  {job.matchedSkills.map((skill, idx) => (
                    <span key={`matched-${idx}`} className={styles.matched_skill_tag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {job.missingSkills.length > 0 && (
              <div className={styles.missing_skills_section}>
                <div className={styles.section_label}>
                  <span className={styles.missing_icon}>⚠️</span>
                  <span>Skills to Develop ({job.missingSkills.length})</span>
                </div>
                <div className={styles.skills_list}>
                  {job.missingSkills.map((skill, idx) => (
                    <span key={`missing-${idx}`} className={styles.missing_skill_tag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {job.url && (
          <a 
            href={job.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.apply_button}
          >
            🔗 Apply Now
            <span className={styles.apply_arrow}>→</span>
          </a>
        )}
      </div>
    );
  };

  const renderStructuredAnalysis = (data, mode = 'file') => {
    const parsed = parseJobRecommendations(data);
    if (!parsed) return null;

    return (
      <div className={styles.analysis_container}>
        <div className={styles.analysis_header}>
          <span className={styles.analysis_icon}>📊</span>
          <h3>{mode === 'file' ? 'CV Analysis Results' : 'Skills Analysis Results'}</h3>
          <span className={styles.analysis_badge}>Complete</span>
        </div>

        {renderSkillsSection(parsed.detectedSkills, parsed.totalSkills)}

        <div className={styles.jobs_section}>
          <div className={styles.section_header}>
            <span className={styles.section_icon}>🎯</span>
            <h4>Top Job Matches</h4>
            <span className={styles.job_count}>{parsed.jobs.length} positions</span>
          </div>
          
          <div className={styles.jobs_list}>
            {parsed.jobs.map(job => renderJobCard(job))}
          </div>
        </div>

        {parsed.summary && (
          <div className={styles.summary_section}>
            <div className={styles.summary_header}>
              <span>💡</span>
              <strong>Summary</strong>
            </div>
            <p>{parsed.summary}</p>
          </div>
        )}

        <div className={styles.next_steps}>
          <div className={styles.next_steps_header}>
            <span>✨</span>
            <strong>Next Steps</strong>
          </div>
          <ul>
            <li>Click on job links above to apply directly</li>
            <li>Focus on developing the missing skills highlighted</li>
            <li>Ask me for interview tips or learning resources</li>
          </ul>
        </div>
      </div>
    );
  };

  const handleTextSubmit = async (textMessage) => {
    if (!textMessage.trim()) return;
    
    const userMsg = { 
      sender: "user", 
      text: `💬 ${textMessage}`, 
      timestamp: new Date() 
    };
    setChat((prev) => [...prev, userMsg]);
    
    const analyzingMsg = { 
      sender: "bot", 
      text: "🔍 Analyzing your skills and finding matching jobs...", 
      timestamp: new Date(),
      isTyping: true
    };
    setChat((prev) => [...prev, analyzingMsg]);
    
    try {
      const result = await analyzeCVWithText(textMessage, 5);
      setAnalysisData(result);
      setAnalysisMode('text');
      
      const botMsg = { 
        sender: "bot", 
        text: "Analysis complete!",
        structuredData: result,
        timestamp: new Date(),
        isAnalysis: true,
        analysisMode: 'text'
      };
      setChat((prev) => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, botMsg];
      });
      
    } catch (error) {
      console.error("Text analysis failed:", error);
      const errorMsg = { 
        sender: "bot", 
        text: `❌ Failed to analyze your message: ${error.message}\n\nPlease try describing your role and skills differently. Example: "I am a frontend developer with skills in React, TypeScript, and Angular"`, 
        timestamp: new Date(),
        isError: true
      };
      setChat((prev) => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, errorMsg];
      });
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const validTypes = ['application/pdf'];
    if (!validTypes.includes(file.type)) {
      const errorMsg = "❌ Please upload a PDF file. The API only accepts PDF format.";
      setChat((prev) => [...prev, { 
        sender: "user", 
        text: `Uploaded: ${file.name}`, 
        timestamp: new Date() 
      }]);
      setChat((prev) => [...prev, { 
        sender: "bot", 
        text: errorMsg, 
        timestamp: new Date(),
        isError: true
      }]);
      return;
    }
    
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const errorMsg = "❌ File too large. Maximum size is 5MB.";
      setChat((prev) => [...prev, { 
        sender: "user", 
        text: `Uploaded: ${file.name}`, 
        timestamp: new Date() 
      }]);
      setChat((prev) => [...prev, { 
        sender: "bot", 
        text: errorMsg, 
        timestamp: new Date(),
        isError: true
      }]);
      return;
    }
    
    setUploadedFile(file);
    
    const userMsg = { 
      sender: "user", 
      text: `📄 I've uploaded my CV: ${file.name}`, 
      timestamp: new Date() 
    };
    setChat((prev) => [...prev, userMsg]);
    
    const analyzingMsg = { 
      sender: "bot", 
      text: "🔍 Analyzing your CV... This may take a few moments.", 
      timestamp: new Date(),
      isTyping: true
    };
    setChat((prev) => [...prev, analyzingMsg]);
    
    try {
      const result = await analyzeCVWithFile(file, 5);
      setAnalysisData(result);
      setAnalysisMode('file');
      
      const botMsg = { 
        sender: "bot", 
        text: "Analysis complete!",
        structuredData: result,
        timestamp: new Date(),
        isAnalysis: true,
        analysisMode: 'file'
      };
      setChat((prev) => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, botMsg];
      });
      
    } catch (error) {
      console.error("Analysis failed:", error);
      const errorMsg = { 
        sender: "bot", 
        text: `❌ Failed to analyze CV: ${error.message}\n\nPlease ensure the CV is in valid PDF format and try again.`, 
        timestamp: new Date(),
        isError: true
      };
      setChat((prev) => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [...filtered, errorMsg];
      });
    }
  };

  const renderChatMessage = (msg, index) => {
    if (msg.isAnalysis && msg.structuredData) {
      return (
        <div key={index} className={`${styles.message} ${styles.bot_msg}`}>
          <div className={styles.message_bubble}>
            <div className={styles.message_content}>
              {renderStructuredAnalysis(msg.structuredData, msg.analysisMode || 'file')}
            </div>
            <div className={styles.message_time}>
              {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      );
    }
    
    if (msg.isError) {
      return (
        <div key={index} className={`${styles.message} ${styles.bot_msg}`}>
          <div className={`${styles.message_bubble} ${styles.error_bubble}`}>
            <div className={styles.message_text}>{msg.text}</div>
            <div className={styles.message_time}>
              {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      );
    }
    
    if (msg.sender === "user") {
      return (
        <div key={index} className={`${styles.message} ${styles.user_msg}`}>
          <div className={styles.message_bubble}>
            <div className={styles.message_text}>{msg.text}</div>
            <div className={styles.message_time}>
              {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div key={index} className={`${styles.message} ${styles.bot_msg}`}>
        <div className={styles.message_bubble}>
          <div className={styles.message_text}>{msg.text}</div>
          <div className={styles.message_time}>
            {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  };

  const sendMessage = async (customMessage = null) => {
    const msgToSend = customMessage || message;
    if (!msgToSend.trim() || !sessionId) return;

    // If no analysis has been done yet, treat this as a text analysis request
    if (!analysisData) {
      await handleTextSubmit(msgToSend);
      setMessage("");
      return;
    }

    const userMsg = { sender: "user", text: msgToSend, timestamp: new Date() };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    try {
      if (analysisData && analysisData.jobs) {
        setTimeout(() => {
          const response = generateContextualResponse(msgToSend, analysisData);
          const botMsg = { sender: "bot", text: response, timestamp: new Date() };
          setChat((prev) => [...prev, botMsg]);
          setIsTyping(false);
        }, 500);
      } else {
        const promptMsg = "Please describe your role and skills, or upload your CV. Example: 'I am a frontend developer with skills in React, TypeScript, and Angular'";
        const botMsg = { sender: "bot", text: promptMsg, timestamp: new Date() };
        setChat((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }
    } catch (err) {
      console.error(err);
      setChat((prev) => [...prev, { 
        sender: "bot", 
        text: "❌ Error processing your request.", 
        timestamp: new Date(),
        isError: true
      }]);
      setIsTyping(false);
    }
  };

  const generateContextualResponse = (question, data) => {
    const lowerQuestion = question.toLowerCase();
    const parsed = parseJobRecommendations(data);
    
    if (lowerQuestion.includes("skill") || lowerQuestion.includes("missing")) {
      let response = "**Skills Development Guide**\n\n";
      const allMissingSkills = new Set();
      
      parsed.jobs.forEach(job => {
        job.missingSkills.forEach(skill => allMissingSkills.add(skill));
      });
      
      if (allMissingSkills.size > 0) {
        response += "To improve your job matches, focus on learning:\n";
        Array.from(allMissingSkills).slice(0, 10).forEach(skill => {
          response += `• ${skill}\n`;
        });
        response += "\nWould you like learning resources for any of these skills?";
      } else {
        response += "Great news! Your skills match well with the recommended positions. Keep building on your strengths!";
      }
      
      return response;
    }
    
    if (lowerQuestion.includes("location") || lowerQuestion.includes("remote")) {
      let response = "**📍 Job Locations Summary**\n\n";
      
      parsed.jobs.forEach(job => {
        response += `**${job.title}**\n`;
        response += `• Location: ${job.location}\n`;
        response += `• Work Type: ${job.workType}\n\n`;
      });
      
      response += "Would you like me to help you find jobs in a specific location?";
      return response;
    }
    
    if (lowerQuestion.includes("top") || lowerQuestion.includes("best match")) {
      const topJob = parsed.jobs[0];
      return `**🏆 Best Match: ${topJob.title}**\n\n• Company: ${topJob.company}\n• Match Score: ${topJob.similarity}%\n• Skill Match: ${topJob.skillMatchRate}%\n• Location: ${topJob.location} (${topJob.workType})\n\n🔗 ${topJob.url}`;
    }
    
    if (lowerQuestion.includes("link") || lowerQuestion.includes("apply")) {
      let response = "**🔗 Application Links**\n\n";
      parsed.jobs.forEach(job => {
        response += `• **${job.title}**: ${job.url}\n`;
      });
      return response;
    }
    
    return "I can help you with:\n• Viewing all detected skills\n• Understanding skill gaps for each job\n• Finding remote vs on-site positions\n• Getting application links for jobs\n• Learning resources for missing skills\n\nWhat would you like to know more about?";
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
      <div className={styles.bg_circle_3}></div>
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
              <p>AI-powered CV & skills analysis with personalized job recommendations</p>
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
                  <p>Two ways to get personalized job recommendations:</p>
                  
                  <div className={styles.options_container}>
                    <div className={styles.option_card}>
                      <div className={styles.option_header}>📝 Text Analysis</div>
                      <p>Describe your role and skills in a message</p>
                      <div className={styles.example_text}>
                        Example: "I am a frontend developer with skills in React, TypeScript, and Angular"
                      </div>
                    </div>
                    
                    <div className={styles.option_divider}>OR</div>
                    
                    <div className={styles.option_card}>
                      <div className={styles.option_header}>📄 CV Upload</div>
                      <p>Upload your CV in PDF format</p>
                    </div>
                  </div>
                  
                  <ul className={styles.feature_list}>
                    <li>🔍 Skill detection from your input</li>
                    <li>📍 Location and work type preferences</li>
                    <li>🔗 Direct application links</li>
                  </ul>
                  
                  <div className={styles.upload_area} onClick={() => fileInputRef.current?.click()}>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      accept=".pdf" 
                      hidden 
                    />
                    <div className={styles.upload_icon}>📁</div>
                    <p>Click to upload your CV (PDF only)</p>
                    <span>PDF format, max 10MB</span>
                  </div>
                </div>
              </div>
            ) : (
              chat.map((msg, i) => renderChatMessage(msg, i))
            )}
            {(isTyping || isAnalyzing) && !chat.some(msg => msg.isTyping) && (
              <div className={`${styles.message} ${styles.bot_msg}`}>
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
                placeholder="Describe your role and skills... or ask questions about job matches..."
                rows={1}
              />
              <button 
                className={styles.upload_btn} 
                onClick={() => fileInputRef.current?.click()} 
                title="Upload CV (PDF only)"
                disabled={isAnalyzing}
              >
                📎
              </button>
              <button 
                className={styles.send_btn} 
                onClick={() => sendMessage()} 
                disabled={!message.trim() || isAnalyzing}
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