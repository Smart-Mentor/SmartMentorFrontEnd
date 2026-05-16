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
  completeUserProfile, 
  getAllSkills, 
  getAllInterests, 
  getAllCareerGoals 
} from "../../api/authenticationService";

// Transition component for MUI Dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ============================================
// ✅ ICONS FOR CAREER GOALS
// ============================================
const careerIcons = {
  "Full-Stack": "⚛️",
  "Backend": "🔧",
  "Frontend": "🎨",
  "Data Scientist": "📊",
  "Data Analyst": "📈",
  "Software Engineer": "💻",
  "Machine Learning": "🤖",
  "Database": "🗄️",
  "Game Developer": "🎮",
  "Cloud": "☁️",
  "Cybersecurity": "🔒",
  "AI": "🧠",
  "DevOps": "🚀",
  "Azure": "⚡",
  ".NET": "🟣",
  "React": "⚛️",
  "Python": "🐍",
  "Java": "☕",
  "default": "💼",
};

const getCareerIcon = (careerName) => {
  if (!careerName) return careerIcons.default;
  
  // Check if career name contains any key
  for (const key of Object.keys(careerIcons)) {
    if (careerName.toLowerCase().includes(key.toLowerCase())) {
      return careerIcons[key];
    }
  }
  
  return careerIcons.default;
};

// ============================================
// ✅ COLORS FOR CAREER GOALS
// ============================================
const careerColors = {
  "Full-Stack": "#667eea",
  "Backend": "#0A5ADB",
  "Frontend": "#58A7B5",
  "Data Scientist": "#ef4444",
  "Data Analyst": "#14b8a6",
  "Software Engineer": "#6366f1",
  "Machine Learning": "#10b981",
  "Database": "#f59e0b",
  "Game Developer": "#ec4899",
  "Cloud": "#3b82f6",
  "Cybersecurity": "#dc2626",
  "AI": "#8b5cf6",
  "DevOps": "#f97316",
  "Azure": "#2563eb",
  ".NET": "#512bd4",
  "React": "#61DAFB",
  "Python": "#3776ab",
  "Java": "#007396",
  "default": "#667eea",
};

const getCareerColor = (careerName) => {
  if (!careerName) return careerColors.default;
  
  for (const key of Object.keys(careerColors)) {
    if (careerName.toLowerCase().includes(key.toLowerCase())) {
      return careerColors[key];
    }
  }
  
  return careerColors.default;
};
// Level colors
const levelColors = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#0A5ADB",
};

// Level maps for conversion
const levelMap = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

const reverseLevelMap = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
};

// SkillChip Component
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
    switch (level) {
      case "Beginner":
        return { background: "linear-gradient(135deg, #10b981, #34d399)" };
      case "Intermediate":
        return { background: "linear-gradient(135deg, #f59e0b, #fbbf24)" };
      case "Advanced":
        return { background: "linear-gradient(135deg, #0A5ADB, #58A7B5)" };
      default:
        return {};
    }
  };

  return (
    <Tooltip
      title={level || ""}
      arrow
      placement="top"
      open={showTooltip || hovering}
      TransitionComponent={Zoom}
    >
      <Chip
        label={skill}
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

// Main Component
export default function CompleteProfile() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [animate, setAnimate] = useState(false);

  // ✅ DATA FROM API
  const [skillsList, setSkillsList] = useState([]);
  const [interestsList, setInterestsList] = useState([]);
  const [careerOptions, setCareerOptions] = useState([]);
  
  // Loading states for API data
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [loadingCareers, setLoadingCareers] = useState(true);

  // Step 1 - Skills
  const [skills, setSkills] = useState({});
  const [activeSkill, setActiveSkill] = useState(null);

  // Step 2 - CV
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  // Step 3 - Career
  const [careerPath, setCareerPath] = useState("");

  // Step 4 - Interests & Languages
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // Notification
  const [notification, setNotification] = useState(null);
  const [undoSkill, setUndoSkill] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Languages list (static)
  const languagesList = ["Arabic", "English", "French", "German"];

  // ============================================
  // ✅ FETCH DATA FROM API ON MOUNT
  // ============================================
  useEffect(() => {
    setAnimate(true);
    
    const fetchData = async () => {
      try {
        // Fetch Skills
        setLoadingSkills(true);
        const skillsData = await getAllSkills();
        if (Array.isArray(skillsData)) {
          setSkillsList(skillsData);
        } else if (skillsData.data) {
          setSkillsList(skillsData.data);
        } else {
          setSkillsList([]);
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        setSkillsList([]);
      } finally {
        setLoadingSkills(false);
      }

      try {
        // Fetch Interests
        setLoadingInterests(true);
        const interestsData = await getAllInterests();
        if (Array.isArray(interestsData)) {
          setInterestsList(interestsData);
        } else if (interestsData.data) {
          setInterestsList(interestsData.data);
        } else {
          setInterestsList([]);
        }
      } catch (err) {
        console.error("Failed to fetch interests:", err);
        setInterestsList([]);
      } finally {
        setLoadingInterests(false);
      }

      try {
        // Fetch Career Goals
        setLoadingCareers(true);
        const careersData = await getAllCareerGoals();
        if (Array.isArray(careersData)) {
          setCareerOptions(careersData);
        } else if (careersData.data) {
          setCareerOptions(careersData.data);
        } else {
          setCareerOptions([]);
        }
      } catch (err) {
        console.error("Failed to fetch career goals:", err);
        setCareerOptions([]);
      } finally {
        setLoadingCareers(false);
      }
    };

    fetchData();
  }, []);

  // Show notification helper
  const showNotification = (message, type, skillName = null) => {
    setNotification({ message, type, skillName });
    if (type !== "undo") {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Navigation - Linear progression, cannot skip steps
  const handleNext = useCallback(() => {
    if (activeStep === 0 && Object.keys(skills).length === 0) {
      showNotification("Please select at least one skill", "error");
      return;
    }

    if (activeStep === 2 && !careerPath) {
      showNotification("Please select a career path", "error");
      return;
    }

    if (activeStep === 3 && (selectedInterests.length === 0 || selectedLanguages.length === 0)) {
      showNotification("Please select interests and languages", "error");
      return;
    }

    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    } else {
      handleComplete();
    }
  }, [activeStep, skills, file, careerPath, selectedInterests, selectedLanguages]);

  const handleBack = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  }, [activeStep]);

  // Complete Profile Handler
  const handleComplete = useCallback(async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const formattedSkills = Object.entries(skills).map(([skillId, skillLevel]) => ({
        skillId: Number(skillId),
        skillLevel,
      }));

      const profileData = {
        skills: formattedSkills,
        interestIds: selectedInterests,
        careerGoalId: careerPath,
      };

      console.log("PROFILE DATA:", profileData);

      await completeUserProfile(profileData);

      localStorage.setItem("profileCompleted", "true");

      showNotification("🎉 Profile completed successfully!", "success");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.error("Complete Profile Error:", error);
      showNotification(error.message || "Failed to complete profile. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }, [skills, selectedInterests, careerPath, navigate, isSubmitting]);

  // Step 1 Functions
  const handleSkillClick = useCallback((skill) => {
    if (activeSkill?.id === skill.id) {
      setActiveSkill(null);
      return;
    }
    setActiveSkill(skill);
  }, [activeSkill]);

  const handleDeleteSkill = useCallback((skillId) => {
    const level = skills[skillId];

    const skillData = skillsList.find(
      (s) => s.id === Number(skillId)
    );

    const deletedSkill = {
      skillId,
      level,
      name: skillData?.name,
    };

    setSkills((prev) => {
      const updated = { ...prev };
      delete updated[skillId];
      return updated;
    });

    if (activeSkill?.id === skillId) {
      setActiveSkill(null);
    }

    setUndoSkill(deletedSkill);

    showNotification(
      `"${skillData?.name}" was removed`,
      "undo"
    );

    const timeout = setTimeout(() => {
      setUndoSkill(null);
      setNotification(null);
    }, 5000);

    setUndoTimeout(timeout);
  }, [skills, activeSkill, skillsList]);

  const handleUndoDelete = useCallback(() => {
    if (undoSkill) {
      setSkills((prev) => ({
        ...prev,
        [undoSkill.skillId]: undoSkill.level
      }));
      setUndoSkill(null);
      setNotification(null);
      if (undoTimeout) clearTimeout(undoTimeout);
      showNotification(`"${undoSkill.name}" restored`, "success");
    }
  }, [undoSkill, undoTimeout]);

  const changeLevel = useCallback((level) => {
    if (!level || !activeSkill) return;

    setSkills((prev) => ({
      ...prev,
      [activeSkill.id]: levelMap[level],
    }));

    setActiveSkill(null);

    showNotification(`${activeSkill.name} level set to ${level}`, "success");
  }, [activeSkill]);

  // Step 2 Functions
  const handleFileUpload = useCallback((selectedFile) => {
    setError("");
    if (!selectedFile) return;

    const ALLOWED_TYPES = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Only PDF, .doc and .docx files are allowed");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    showNotification("CV uploaded successfully!", "success");
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, [handleFileUpload]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  }, [handleFileUpload]);

  const removeFile = useCallback(() => {
    setFile(null);
    setError("");
    showNotification("CV removed", "info");
  }, []);

  // Step 4 Functions
  const toggleInterest = useCallback((interestId) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((i) => i !== interestId)
        : [...prev, interestId]
    );
  }, []);

  const handleLanguageChange = useCallback((event) => {
    const lang = event.target.name;
    setSelectedLanguages((prev) =>
      event.target.checked ? [...prev, lang] : prev.filter((l) => l !== lang)
    );
  }, []);

  // Step configurations
  const stepConfigs = [
    {
      icon: "🎯",
      title: "Select Your Skills",
      desc: "Choose the skills you have and rate your proficiency level",
      color: "#0A5ADB"
    },
    {
      icon: "📄",
      title: "Upload Your CV",
      desc: "Share your CV so we can better understand your background",
      color: "#58A7B5"
    },
    {
      icon: "💼",
      title: "Choose Your Career Path",
      desc: "Select the career path you want to pursue",
      color: "#667eea"
    },
    {
      icon: "🎨",
      title: "Interests & Languages",
      desc: "Tell us about your interests and language skills",
      color: "#f59e0b"
    },
    {
      icon: "✅",
      title: "Review Your Profile",
      desc: "Double-check your information before completing",
      color: "#10b981"
    },
  ];

  // ============================================
  // ✅ GET SKILL NAME FROM API DATA
  // ============================================
  const getSkillName = (skillId) => {
    const skill = skillsList.find(s => s.id === Number(skillId) || s.skillId === Number(skillId));
    return skill?.name || skill?.skillName || `Skill ${skillId}`;
  };

  // ============================================
  // ✅ GET INTEREST NAME FROM API DATA
  // ============================================
  const getInterestName = (interestId) => {
    const interest = interestsList.find(i => i.id === interestId || i.interestId === interestId);
    return interest?.name || `Interest ${interestId}`;
  };

  // ============================================
  // ✅ GET CAREER NAME FROM API DATA
  // ============================================
  const getCareerName = (careerId) => {
    const career = careerOptions.find(c => c.id === careerId || c.careerGoalId === careerId);
    return career?.name || career?.careerGoalName || `Career ${careerId}`;
  };

  return (
    <div className={styles.complete_profile_container}>
      {/* Undo Notification for Skill Deletion */}
      {undoSkill && (
        <div className={styles.undo_notification}>
          <div className={styles.undo_content}>
            <span className={styles.undo_icon}>🗑️</span>
            <span className={styles.undo_message}>"{undoSkill.name}" was removed</span>
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
            <span>Step {activeStep + 1} of 5</span>
            <span>{Math.round((activeStep + 1) / 5 * 100)}% Complete</span>
          </div>
          <div className={styles.progress_bar_container}>
            <div
              className={styles.progress_bar_fill}
              style={{ width: `${(activeStep + 1) / 5 * 100}%` }}
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

          {/* Step 1 - Skills */}
          {activeStep === 0 && (
            <div className={styles.step_content}>
              {loadingSkills ? (
                <div className={styles.loading_state}>
                  <div className={styles.spinner}></div>
                  <p>Loading skills...</p>
                </div>
              ) : (
                <ClickAwayListener onClickAway={() => setActiveSkill(null)}>
                  <div>
                    <div className={styles.skills_grid}>
                      {skillsList.map((skill) => {
                        const level = skills[skill.id || skill.skillId];
                        const isActive = activeSkill?.id === skill.id || activeSkill?.skillId === skill.skillId;

                        return (
                          <SkillChip
                            key={skill.id || skill.skillId}
                            skill={skill.name || skill.skillName}
                            level={reverseLevelMap[level]}
                            isActive={isActive}
                            onClick={() => handleSkillClick(skill)}
                            onDelete={() => handleDeleteSkill(skill.id || skill.skillId)}
                          />
                        );
                      })}
                    </div>

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
                          Level for <strong>{activeSkill?.name || activeSkill?.skillName}</strong>
                        </Typography>
                        <div className={styles.level_options}>
                          {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => changeLevel(lvl)}
                              className={`${styles.level_option} ${
                                reverseLevelMap[skills[activeSkill?.id || activeSkill?.skillId]] === lvl ? styles.selected : ""
                              }`}
                              style={{
                                background:
                                  reverseLevelMap[skills[activeSkill?.id || activeSkill?.skillId]] === lvl ? levelColors[lvl] : "#f5f5f5",
                                color:
                                  reverseLevelMap[skills[activeSkill?.id || activeSkill?.skillId]] === lvl ? "#fff" : "#555",
                              }}
                            >
                              <span className={styles.level_emoji}>
                                {lvl === "Beginner" && "🌱"}
                                {lvl === "Intermediate" && "⚡"}
                                {lvl === "Advanced" && "🚀"}
                              </span>
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </ClickAwayListener>
              )}

              {/* Selected Skills Preview */}
              {Object.keys(skills).length > 0 && (
                <div className={styles.selected_skills_preview}>
                  <div className={styles.preview_header}>
                    <h4>Your Selected Skills</h4>
                    <span className={styles.preview_count}>{Object.keys(skills).length} skills</span>
                  </div>
                  <div className={styles.selected_skills_list}>
                    {Object.entries(skills).map(([skillId, level]) => {
                      return (
                        <div key={skillId} className={styles.selected_skill_item}>
                          <span className={styles.selected_skill_name}>
                            {getSkillName(skillId)}
                          </span>

                          <span
                            className={styles.skill_level_badge}
                            style={{
                              background: levelColors[reverseLevelMap[level]],
                            }}
                          >
                            {reverseLevelMap[level]}
                          </span>

                          <button
                            className={styles.remove_skill_btn}
                            onClick={() => handleDeleteSkill(Number(skillId))}
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2 - CV Upload */}
          {activeStep === 1 && (
            <div className={styles.step_content}>
              <div
                className={`${styles.upload_area} ${dragActive ? styles.drag_active : ""} ${error ? styles.has_error : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="cv-upload"
                  style={{ display: "none" }}
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                />
                {!file ? (
                  <label htmlFor="cv-upload" className={styles.upload_label}>
                    <div className={styles.upload_icon_wrapper}>
                      <CloudUploadIcon className={styles.upload_icon} />
                    </div>
                    <Typography variant="h6" className={styles.upload_title}>Upload your CV</Typography>
                    <Typography variant="body2" className={styles.upload_hint}>Drag and drop or click to browse</Typography>
                    <Typography variant="caption" className={styles.upload_format}>PDF, DOC, DOCX (max 10MB)</Typography>
                  </label>
                ) : (
                  <div className={styles.file_preview}>
                    <div className={styles.file_icon_wrapper}>
                      <InsertDriveFileIcon className={styles.file_icon} />
                    </div>
                    <div className={styles.file_info}>
                      <Typography className={styles.file_name}>{file.name}</Typography>
                      <Typography className={styles.file_size}>{(file.size / 1024 / 1024).toFixed(2)} MB</Typography>
                    </div>
                    <button className={styles.remove_file_btn} onClick={removeFile}>
                      <DeleteIcon /> Remove
                    </button>
                  </div>
                )}
              </div>
              {error && <Alert severity="error" className={styles.error_alert}>{error}</Alert>}

              <div className={styles.upload_tips}>
                <div className={styles.tip_item}>💡 Your CV helps us personalize your learning path</div>
                <div className={styles.tip_item}>🔒 Your file is securely stored and never shared</div>
              </div>
            </div>
          )}

{/* Step 3 - Career Path */}
{activeStep === 2 && (
  <div className={styles.step_content}>
    {loadingCareers ? (
      <div className={styles.loading_state}>
        <div className={styles.spinner}></div>
        <p>Loading career paths...</p>
      </div>
    ) : (
      <div className={styles.career_grid}>
        {careerOptions.map((option) => {
          const careerName = option.name || option.careerGoalName || "";
          const icon = getCareerIcon(careerName);
          const color = getCareerColor(careerName);
          const careerId = option.id || option.careerGoalId;

          return (
            <button
              key={careerId}
              onClick={() => setCareerPath(careerId)}
              className={`${styles.career_card} ${careerPath === careerId ? styles.selected : ""}`}
            >
              <div className={styles.career_icon_wrapper} style={{ background: `${color}15` }}>
                <span className={styles.career_icon}>{icon}</span>
              </div>
              <div className={styles.career_info}>
                <span className={styles.career_name}>{careerName}</span>
                {careerPath === careerId && (
                  <span className={styles.career_badge}>Selected</span>
                )}
              </div>
              {careerPath === careerId && (
                <CheckCircleIcon className={styles.career_check} style={{ color: color }} />
              )}
            </button>
          );
        })}
      </div>
    )}
  </div>
)}

          {/* Step 4 - Interests & Languages */}
          {activeStep === 3 && (
            <div className={styles.step_content}>
              <div className={styles.interests_section}>
                <div className={styles.section_title_wrapper}>
                  <span className={styles.section_emoji}>🎯</span>
                  <h4>Areas of Interest</h4>
                </div>
                {loadingInterests ? (
                  <div className={styles.loading_state}>
                    <div className={styles.spinner}></div>
                    <p>Loading interests...</p>
                  </div>
                ) : (
                  <div className={styles.interests_grid}>
                    {interestsList.map((interest) => (
                      <Chip
                        key={interest.id || interest.interestId}
                        label={interest.name || interest.interestName}
                        onClick={() => toggleInterest(interest.id || interest.interestId)}
                        color={selectedInterests.includes(interest.id || interest.interestId) ? "primary" : "default"}
                        variant={selectedInterests.includes(interest.id || interest.interestId) ? "filled" : "outlined"}
                        className={styles.interest_chip}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.languages_section}>
                <div className={styles.section_title_wrapper}>
                  <span className={styles.section_emoji}>🗣️</span>
                  <h4>Languages You Speak</h4>
                </div>
                <div className={styles.languages_grid}>
                  {languagesList.map((lang) => (
                    <label key={lang} className={styles.language_label}>
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(lang)}
                        onChange={handleLanguageChange}
                        name={lang}
                      />
                      <span className={styles.checkmark}></span>
                      <span className={styles.language_name}>{lang}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5 - Review */}
          {activeStep === 4 && (
            <div className={styles.step_content}>
              <div className={styles.review_section}>
                <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>🎯</span>
                    <h4>Skills</h4>
                  </div>
                  <div className={styles.review_skills}>
                    {Object.entries(skills).map(([skillId, level]) => {
                      return (
                        <div key={skillId} className={styles.review_skill_tag}>
                          {getSkillName(skillId)}
                          <span
                            className={styles.review_level}
                            style={{
                              color: levelColors[reverseLevelMap[level]],
                            }}
                          >
                            ({reverseLevelMap[level]})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>📄</span>
                    <h4>CV</h4>
                  </div>
                  <p className={styles.review_text}>{file?.name || "No file uploaded"}</p>
                </div>

                <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>💼</span>
                    <h4>Career Path</h4>
                  </div>
                  <p className={styles.review_text}>
                    {getCareerName(careerPath)}
                  </p>
                </div>

                <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>🎨</span>
                    <h4>Interests</h4>
                  </div>
                  <div className={styles.review_interests}>
                    {selectedInterests.map((interestId) => {
                      return (
                        <span key={interestId} className={styles.review_tag}>
                          {getInterestName(interestId)}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>🗣️</span>
                    <h4>Languages</h4>
                  </div>
                  <div className={styles.review_languages}>
                    {selectedLanguages.map(lang => (
                      <span key={lang} className={styles.review_tag}>{lang}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={styles.navigation_buttons}>
            {activeStep > 0 && (
              <Button onClick={handleBack} className={styles.back_btn}>
                ← Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={`${styles.next_btn} ${activeStep === 4 ? styles.complete_btn : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : activeStep === 4 ? "Complete Profile" : "Continue →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}