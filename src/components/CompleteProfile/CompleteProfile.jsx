import React, { useState, useEffect, forwardRef, useCallback } from "react";
import {
  Button,
  Typography,
  Chip,
  ClickAwayListener,
  Tooltip,
  Zoom,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UndoIcon from "@mui/icons-material/Undo";
import { useNavigate } from "react-router-dom";
import styles from "./CompleteProfile.module.css";
import logo from "../../assets/sign in logo.png";
import {
  getAllSkills,
  getAllInterests,
  getAllCareerGoals,
  getUserProfile,
  completeUserProfile,
} from "../../Api/authenticationService";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Icons and colors mapping for career goals
const careerIcons = {
  "Junior Backend .NET Developer": { icon: "🔷", color: "#512bd4" },
  "Full-Stack .NET Developer": { icon: "🌐", color: "#512bd4" },
  "Frontend React Developer": { icon: "🎨", color: "#61dafb" },
  "Data Analyst": { icon: "📈", color: "#f59e0b" },
  "Machine Learning Engineer": { icon: "🧠", color: "#10b981" },
  "Cloud Engineer (Azure)": { icon: "☁️", color: "#0078d4" },
  "DevOps Engineer": { icon: "⚙️", color: "#8b5cf6" },
  "Cybersecurity Analyst": { icon: "🛡️", color: "#ef4444" },
  "Senior Backend .NET Developer": { icon: "🏆", color: "#512bd4" },
  "Software Architect": { icon: "🏛️", color: "#6366f1" },
  "Mobile Developer (React Native)": { icon: "📱", color: "#61dafb" },
  "QA Automation Engineer": { icon: "🧪", color: "#ef4444" },
  "Site Reliability Engineer": { icon: "📊", color: "#22c55e" },
  "Database Developer": { icon: "🗄️", color: "#3b82f6" },
  "Technical Product Manager": { icon: "📋", color: "#f59e0b" },
  "Blockchain Developer": { icon: "⛓️", color: "#8b5cf6" },
  "Embedded Systems Engineer": { icon: "🔌", color: "#ef4444" },
  "Security Architect": { icon: "🔐", color: "#dc2626" },
  "Platform Engineer": { icon: "🏗️", color: "#64748b" },
  "Data Engineer": { icon: "📦", color: "#0ea5e9" },
  "AI/ML Architect": { icon: "🤖", color: "#8b5cf6" },
  "Full-Stack TypeScript Developer": { icon: "📘", color: "#3178c6" },
};

// Skill level mapping
const skillLevelMap = {
  "Beginner": 1,
  "Intermediate": 2,
  "Advanced": 3
};

const levelColors = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#0A5ADB",
};

const levelEmojis = {
  Beginner: "🌱",
  Intermediate: "⚡",
  Advanced: "🚀"
};

// Get token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("authToken") || "";
};

// SkillChip component
const SkillChip = ({ skill, level, isActive, onClick, onDelete }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (level) {
      setShowTooltip(true);
      const timer = setTimeout(() => setShowTooltip(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [level]);

  const getLevelStyle = () => {
    if (!level) return {};
    switch(level) {
      case "Beginner": return { background: "linear-gradient(135deg, #10b981, #34d399)" };
      case "Intermediate": return { background: "linear-gradient(135deg, #f59e0b, #fbbf24)" };
      case "Advanced": return { background: "linear-gradient(135deg, #0A5ADB, #58A7B5)" };
      default: return {};
    }
  };

  return (
    <Tooltip
      title={level || "Click to select level"}
      arrow
      placement="top"
      open={showTooltip || hovering}
      TransitionComponent={Zoom}
    >
      <Chip
        label={skill.name}
        clickable
        onClick={onClick}
        onDelete={level ? onDelete : undefined}
        deleteIcon={<CloseIcon />}
        onMouseEnter={() => level && setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`${styles.skill_chip} ${level ? styles.has_level : ""} ${isActive ? styles.active : ""}`}
        style={getLevelStyle()}
      />
    </Tooltip>
  );
};

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Data from API
  const [skillsList, setSkillsList] = useState([]);
  const [interestsList, setInterestsList] = useState([]);
  const [careerOptions, setCareerOptions] = useState([]);
  const [skillCategories, setSkillCategories] = useState({});
  
  // Step 1 - Skills
  const [skills, setSkills] = useState({});
  const [activeSkill, setActiveSkill] = useState(null);
  
  // Step 2 - Career
  const [careerPath, setCareerPath] = useState("");
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  
  // Step 3 - Interests
  const [selectedInterests, setSelectedInterests] = useState([]);
  
  // Search/filter states
  const [skillSearch, setSkillSearch] = useState("");
  const [interestSearch, setInterestSearch] = useState("");
  
  // Notification
  const [notification, setNotification] = useState(null);
  const [undoSkill, setUndoSkill] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  // Fetch all master data from API
  const fetchMasterData = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        console.log("No auth token found");
        setIsLoading(false);
        return;
      }

      // Fetch all data in parallel
      const [skillsData, interestsData, careerGoalsData] = await Promise.all([
        getAllSkills(),
        getAllInterests(),
        getAllCareerGoals()
      ]);

      // Process skills
      const formattedSkills = skillsData.map(skill => ({
        id: skill.id,
        name: skill.name,
        category: skill.category || "General"
      }));
      setSkillsList(formattedSkills);

      // Group skills by category
      const categories = {};
      formattedSkills.forEach(skill => {
        if (!categories[skill.category]) {
          categories[skill.category] = [];
        }
        categories[skill.category].push(skill);
      });
      setSkillCategories(categories);

      // Process interests
      const formattedInterests = interestsData.map(interest => ({
        id: interest.id,
        name: interest.name
      }));
      setInterestsList(formattedInterests);

      // Process career goals with icons and colors
      const formattedCareerGoals = careerGoalsData.map(goal => {
        const iconData = careerIcons[goal.name] || { icon: "💼", color: "#6366f1" };
        return {
          id: goal.id,
          value: goal.name.toLowerCase().replace(/\s+/g, '-'),
          label: goal.name,
          description: goal.description || "Build your career in this field.",
          icon: iconData.icon,
          color: iconData.color
        };
      });
      setCareerOptions(formattedCareerGoals);

      // Now fetch user's existing profile data
      await fetchUserProfileData(formattedSkills, formattedInterests, formattedCareerGoals);

    } catch (error) {
      console.error("Error fetching master data:", error);
      showNotification("Failed to load data. Please refresh the page.", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch user profile data
  const fetchUserProfileData = useCallback(async (skillsData, interestsData, careerData) => {
    try {
      const profileData = await getUserProfile();
      console.log("User profile data:", profileData);

      if (profileData.success && profileData.data) {
        const data = profileData.data;

        // Check if profile is complete
        if (data.careerGoalId && data.careerGoalId !== 0) {
          console.log("Profile already completed, redirecting to dashboard");
          localStorage.setItem("profileCompleted", "true");
          localStorage.setItem("profileData", JSON.stringify(profileData));
          navigate("/dashboard");
          return;
        }

        // Populate skills if any
        if (data.skills && Array.isArray(data.skills)) {
          const existingSkills = {};
          data.skills.forEach(skill => {
            const skillInfo = skillsData.find(s => s.id === skill.skillId);
            if (skillInfo) {
              const levelText = Object.keys(skillLevelMap).find(
                key => skillLevelMap[key] === skill.skillLevel
              );
              if (levelText) {
                existingSkills[skillInfo.name] = levelText;
              }
            }
          });
          setSkills(existingSkills);
        }

        // Populate interests if any
        if (data.interests && Array.isArray(data.interests)) {
          const existingInterests = data.interests.map(interest => interest.name);
          setSelectedInterests(existingInterests);
        }

        // Populate career goal if exists
        if (data.careerGoalId && data.careerGoalId !== 0) {
          const career = careerData.find(c => c.id === data.careerGoalId);
          if (career) {
            setCareerPath(career.value);
            setSelectedCareerId(data.careerGoalId);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [navigate]);

  // Check profile completion on component mount
  useEffect(() => {
    fetchMasterData();
  }, [fetchMasterData]);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const showNotification = (message, type, skillName = null) => {
    setNotification({ message, type, skillName });
    if (type !== "undo") {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Filter skills based on search
  const getFilteredSkills = () => {
    let filtered = skillsList;
    if (skillSearch) {
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(skillSearch.toLowerCase())
      );
    }
    return filtered;
  };

  // Filter interests
  const getFilteredInterests = () => {
    if (!interestSearch) return interestsList;
    return interestsList.filter(interest =>
      interest.name.toLowerCase().includes(interestSearch.toLowerCase())
    );
  };

  // API Call to complete profile
  const submitProfileToAPI = async () => {
    setIsSubmitting(true);
    
    // Format skills data
    const formattedSkills = Object.entries(skills).map(([skillName, level]) => {
      const skill = skillsList.find(s => s.name === skillName);
      return {
        skillId: skill?.id || 0,
        skillLevel: skillLevelMap[level]
      };
    }).filter(skill => skill.skillId !== 0);
    
    // Get interest IDs
    const interestIds = selectedInterests
      .map(interestName => {
        const interest = interestsList.find(i => i.name === interestName);
        return interest?.id;
      })
      .filter(id => id !== undefined);
    
    const profileData = {
      skills: formattedSkills,
      interestIds: interestIds,
      careerGoalId: selectedCareerId
    };
    
    console.log("Submitting profile data:", profileData);
    
    try {
      await completeUserProfile(profileData);
      
      localStorage.setItem("profileCompleted", "true");
      localStorage.setItem("profileData", JSON.stringify(profileData));
      
      showNotification("Profile completed successfully!", "success");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
      
    } catch (error) {
      console.error("Error submitting profile:", error);
      showNotification(error.message || "Failed to save profile. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = useCallback(() => {
    if (activeStep === 0 && Object.keys(skills).length === 0) {
      showNotification("Please select at least one skill", "error");
      return;
    }
    if (activeStep === 1 && !careerPath) {
      showNotification("Please select a career path", "error");
      return;
    }
    if (activeStep === 2 && selectedInterests.length === 0) {
      showNotification("Please select at least one interest", "error");
      return;
    }
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      handleComplete();
    }
  }, [activeStep, skills, careerPath, selectedInterests]);

  const handleBack = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  }, [activeStep]);

  const handleComplete = useCallback(() => {
    submitProfileToAPI();
  }, [skills, careerPath, selectedInterests]);

  // Step 1 Functions
  const handleSkillClick = useCallback((skill) => {
    if (activeSkill === skill.name) {
      setActiveSkill(null);
      return;
    }
    setActiveSkill(skill.name);
  }, [activeSkill]);

  const handleDeleteSkill = useCallback((skillName) => {
    const level = skills[skillName];
    const deletedSkill = { skill: skillName, level };
    
    setSkills((prev) => {
      const updated = { ...prev };
      delete updated[skillName];
      return updated;
    });
    
    if (activeSkill === skillName) {
      setActiveSkill(null);
    }
    
    setUndoSkill(deletedSkill);
    showNotification(`"${skillName}" was removed`, "undo", skillName);
    
    const timeout = setTimeout(() => {
      setUndoSkill(null);
      setNotification(null);
    }, 5000);
    
    setUndoTimeout(timeout);
  }, [skills, activeSkill]);

  const handleUndoDelete = useCallback(() => {
    if (undoSkill) {
      setSkills((prev) => ({
        ...prev,
        [undoSkill.skill]: undoSkill.level
      }));
      setUndoSkill(null);
      setNotification(null);
      if (undoTimeout) clearTimeout(undoTimeout);
      showNotification(`"${undoSkill.skill}" restored`, "success");
    }
  }, [undoSkill, undoTimeout]);

  const changeLevel = useCallback((level) => {
    if (!level || !activeSkill) return;
    setSkills((prev) => ({
      ...prev,
      [activeSkill]: level,
    }));
    setActiveSkill(null);
    showNotification(`${activeSkill} level set to ${level}`, "success");
  }, [activeSkill]);

  // Step 2 Functions
  const handleCareerSelect = useCallback((careerId, careerValue) => {
    setCareerPath(careerValue);
    setSelectedCareerId(careerId);
  }, []);

  // Step 3 Functions
  const toggleInterest = useCallback((interestName) => {
    setSelectedInterests((prev) =>
      prev.includes(interestName) ? prev.filter((i) => i !== interestName) : [...prev, interestName]
    );
  }, []);

  const stepConfigs = [
    { 
      icon: "🎯", 
      title: "Select Your Skills", 
      desc: "Choose the skills you have and rate your proficiency level",
      color: "#0A5ADB"
    },
    { 
      icon: "💼", 
      title: "Choose Your Career Path", 
      desc: "Select the career path you want to pursue",
      color: "#667eea"
    },
    { 
      icon: "🎨", 
      title: "Interests", 
      desc: "Tell us about your interests to personalize your experience",
      color: "#f59e0b"
    },
    { 
      icon: "✅", 
      title: "Review Your Profile", 
      desc: "Double-check your information before completing",
      color: "#10b981"
    },
  ];

  // Show loading state while checking profile
  if (isLoading) {
    return (
      <div className={styles.complete_profile_container}>
        <div className={styles.loading_overlay}>
          <div className={styles.loading_spinner}></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.complete_profile_container}>
      {/* Undo Notification */}
      {undoSkill && (
        <div className={styles.undo_notification}>
          <div className={styles.undo_content}>
            <span className={styles.undo_icon}>🗑️</span>
            <span className={styles.undo_message}>"{undoSkill.skill}" was removed</span>
            <button className={styles.undo_button} onClick={handleUndoDelete}>
              <UndoIcon /> Undo
            </button>
          </div>
        </div>
      )}

      {/* Regular Notification */}
      {notification && !undoSkill && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          <span className={styles.notification_icon}>
            {notification.type === "success" && "✅"}
            {notification.type === "error" && "❌"}
            {notification.type === "info" && "ℹ️"}
          </span>
          {notification.message}
        </div>
      )}

      {/* Loading Overlay for submission */}
      {isSubmitting && (
        <div className={styles.loading_overlay}>
          <div className={styles.loading_spinner}></div>
          <p>Saving your profile...</p>
        </div>
      )}

      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.complete_profile_content}>
        {/* Header */}
        <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.logo_section}>
            <div className={styles.logo_wrapper}>
              <img src={logo} alt="SmartMentor Logo" className={styles.logo} />
              <div className={styles.logo_pulse}></div>
            </div>
            <h1 className={styles.logo_text}>SmartMentor</h1>
          </div>
          <h2 className={styles.title}>Complete Your Profile</h2>
          <p className={styles.subtitle}>Help us personalize your learning experience</p>
        </div>

        {/* Progress Bar */}
        <div className={`${styles.progress_section} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.progress_labels}>
            <span>Step {activeStep + 1} of 4</span>
            <span>{Math.round((activeStep + 1) / 4 * 100)}% Complete</span>
          </div>
          <div className={styles.progress_bar_container}>
            <div 
              className={styles.progress_bar_fill} 
              style={{ width: `${(activeStep + 1) / 4 * 100}%` }}
            />
          </div>
          <div className={styles.steps_indicators}>
            {stepConfigs.map((_, index) => (
              <div 
                key={index}
                className={`${styles.step_indicator} ${index === activeStep ? styles.active : ""} ${index < activeStep ? styles.completed : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Step Content Card */}
        <div className={`${styles.card} ${animate ? styles.slide_up : ""}`}>
          {/* Step Header */}
          <div className={styles.step_header}>
            <div className={styles.step_icon_wrapper} style={{ background: `${stepConfigs[activeStep].color}15` }}>
              <span className={styles.step_icon_large}>{stepConfigs[activeStep].icon}</span>
            </div>
            <h3>{stepConfigs[activeStep].title}</h3>
            <p>{stepConfigs[activeStep].desc}</p>
          </div>

          {/* Step 1 - Skills with Search */}
          {activeStep === 0 && (
            <div className={styles.step_content}>
              {/* Search Bar */}
              <div className={styles.skills_filter_bar}>
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className={styles.skills_search}
                />
              </div>

              <ClickAwayListener onClickAway={() => setActiveSkill(null)}>
                <div>
                  <div className={styles.skills_grid}>
                    {getFilteredSkills().map((skill) => {
                      const level = skills[skill.name];
                      const isActive = activeSkill === skill.name;
                      
                      return (
                        <SkillChip
                          key={skill.id}
                          skill={skill}
                          level={level}
                          isActive={isActive}
                          onClick={() => handleSkillClick(skill)}
                          onDelete={() => handleDeleteSkill(skill.name)}
                        />
                      );
                    })}
                  </div>

                  {getFilteredSkills().length === 0 && (
                    <div className={styles.no_results}>
                      <span>🔍</span>
                      <p>No skills found matching your search</p>
                    </div>
                  )}

                  <Dialog
                    open={!!activeSkill}
                    onClose={() => setActiveSkill(null)}
                    TransitionComponent={Transition}
                    fullWidth
                    maxWidth="xs"
                    PaperProps={{ className: styles.level_dialog }}
                  >
                    <DialogTitle className={styles.level_dialog_title}>
                      <span className={styles.level_dialog_icon}>📊</span>
                      Select Proficiency Level
                    </DialogTitle>
                    <DialogContent className={styles.level_dialog_content}>
                      <Typography className={styles.level_dialog_skill}>
                        Level for <strong>{activeSkill}</strong>
                      </Typography>
                      <div className={styles.level_options}>
                        {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => changeLevel(lvl)}
                            className={`${styles.level_option} ${skills[activeSkill] === lvl ? styles.selected : ""}`}
                            style={{
                              background: skills[activeSkill] === lvl ? levelColors[lvl] : "#f5f5f5",
                              color: skills[activeSkill] === lvl ? "#fff" : "#555",
                            }}
                          >
                            <span className={styles.level_emoji}>{levelEmojis[lvl]}</span>
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </ClickAwayListener>

              {/* Selected Skills Preview */}
              {Object.keys(skills).length > 0 && (
                <div className={styles.selected_skills_preview}>
                  <div className={styles.preview_header}>
                    <h4>Your Selected Skills ({Object.keys(skills).length})</h4>
                    <button 
                      className={styles.clear_all_btn}
                      onClick={() => {
                        Object.keys(skills).forEach(skill => handleDeleteSkill(skill));
                      }}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className={styles.selected_skills_list}>
                    {Object.entries(skills).map(([skillName, level]) => (
                      <div key={skillName} className={styles.selected_skill_item}>
                        <span className={styles.selected_skill_name}>{skillName}</span>
                        <span className={styles.skill_level_badge} style={{ background: levelColors[level] }}>
                          {levelEmojis[level]} {level}
                        </span>
                        <button
                          className={styles.remove_skill_btn}
                          onClick={() => handleDeleteSkill(skillName)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2 - Career Path */}
          {activeStep === 1 && (
            <div className={styles.step_content}>
              <div className={styles.career_stats}>
                <span className={styles.career_count}>{careerOptions.length} Career Paths Available</span>
              </div>
              <div className={styles.career_grid}>
                {careerOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleCareerSelect(option.id, option.value)}
                    className={`${styles.career_card} ${careerPath === option.value ? styles.selected : ""}`}
                  >
                    <div className={styles.career_icon_wrapper} style={{ background: `${option.color}15` }}>
                      <span className={styles.career_icon}>{option.icon}</span>
                    </div>
                    <div className={styles.career_info}>
                      <span className={styles.career_name}>{option.label}</span>
                      <span className={styles.career_description}>{option.description.substring(0, 60)}...</span>
                      {careerPath === option.value && (
                        <span className={styles.career_badge}>Selected</span>
                      )}
                    </div>
                    {careerPath === option.value && (
                      <CheckCircleIcon className={styles.career_check} style={{ color: option.color }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 - Interests */}
          {activeStep === 2 && (
            <div className={styles.step_content}>
              <div className={styles.interests_section}>
                <div className={styles.section_title_wrapper}>
                  <span className={styles.section_emoji}>🎯</span>
                  <h4>Areas of Interest ({interestsList.length} options)</h4>
                </div>
                <input
                  type="text"
                  placeholder="Search interests..."
                  value={interestSearch}
                  onChange={(e) => setInterestSearch(e.target.value)}
                  className={styles.interests_search}
                />
                <div className={styles.interests_grid}>
                  {getFilteredInterests().map((interest) => (
                    <Chip
                      key={interest.id}
                      label={interest.name}
                      onClick={() => toggleInterest(interest.name)}
                      color={selectedInterests.includes(interest.name) ? "primary" : "default"}
                      variant={selectedInterests.includes(interest.name) ? "filled" : "outlined"}
                      className={styles.interest_chip}
                    />
                  ))}
                </div>
                {getFilteredInterests().length === 0 && (
                  <div className={styles.no_results}>No interests found</div>
                )}
              </div>
            </div>
          )}

          {/* Step 4 - Review */}
          {activeStep === 3 && (
            <div className={styles.step_content}>
              <div className={styles.review_section}>
                <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>🎯</span>
                    <h4>Skills ({Object.keys(skills).length})</h4>
                  </div>
                  <div className={styles.review_skills}>
                    {Object.entries(skills).map(([skillName, level]) => (
                      <div key={skillName} className={styles.review_skill_tag}>
                        {skillName} <span className={styles.review_level} style={{ color: levelColors[level] }}>({level})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>💼</span>
                    <h4>Career Path</h4>
                  </div>
                  <p className={styles.review_text}>{careerOptions.find(c => c.value === careerPath)?.label || "Not selected"}</p>
                </div>

                <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>🎨</span>
                    <h4>Interests ({selectedInterests.length})</h4>
                  </div>
                  <div className={styles.review_interests}>
                    {selectedInterests.map(interest => (
                      <span key={interest} className={styles.review_tag}>{interest}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={styles.navigation_buttons}>
            {activeStep > 0 && (
              <Button onClick={handleBack} className={styles.back_btn} disabled={isSubmitting}>
                ← Back
              </Button>
            )}
            <Button 
              onClick={handleNext} 
              className={`${styles.next_btn} ${activeStep === 3 ? styles.complete_btn : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : (activeStep === 3 ? "Complete Profile" : "Continue →")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}