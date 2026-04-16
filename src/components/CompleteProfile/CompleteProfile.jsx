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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const skillsList = [
  "JavaScript", "TypeScript", "React", "Java", "SQL", "Python", "C++",
  "Node.js", "MongoDB", "Git", "Docker", "AWS", "CSS", "HTML",
];

const levelColors = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#0A5ADB",
};

const careerOptions = [
  { value: "backend-developer", label: "Backend Developer", icon: "🔧", color: "#0A5ADB" },
  { value: "frontend-developer", label: "Frontend Developer", icon: "🎨", color: "#58A7B5" },
  { value: "fullstack-developer", label: "Full Stack Developer", icon: "⚛️", color: "#667eea" },
  { value: "mobile-developer", label: "Mobile Developer", icon: "📱", color: "#f59e0b" },
  { value: "aiml-engineer", label: "AI/ML Engineer", icon: "🤖", color: "#10b981" },
  { value: "data-scientist", label: "Data Scientist", icon: "📊", color: "#ef4444" },
  { value: "devops-engineer", label: "DevOps Engineer", icon: "🚀", color: "#8b5cf6" },
  { value: "cybersecurity", label: "Cyber Security", icon: "🔒", color: "#ec489a" },
  { value: "uiux-designer", label: "UI/UX Designer", icon: "🎯", color: "#14b8a6" },
];

const interestsList = [
  "Web Development", "Mobile Development", "DevOps", "AI/ML",
  "Data Science", "Cybersecurity", "Cloud Computing", "UI/UX Design",
  "Blockchain", "Game Development",
];

const languagesList = ["Arabic", "English", "French", "German"];

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

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [animate, setAnimate] = useState(false);
  
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

  useEffect(() => {
    setAnimate(true);
  }, []);

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
    if (activeStep === 1 && !file) {
      showNotification("Please upload your CV", "error");
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

  const handleComplete = useCallback(() => {
    const profileData = {
      skills,
      careerPath,
      interests: selectedInterests,
      languages: selectedLanguages,
      cv: file?.name,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem("completeProfileData", JSON.stringify(profileData));
    localStorage.setItem("profileCompleted", "true");
    showNotification("Profile completed successfully!", "success");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  }, [skills, careerPath, selectedInterests, selectedLanguages, file, navigate]);

  // Step 1 Functions
  const handleSkillClick = useCallback((skill) => {
    if (activeSkill === skill) {
      setActiveSkill(null);
      return;
    }
    setActiveSkill(skill);
  }, [activeSkill]);

  // Delete skill with undo option
  const handleDeleteSkill = useCallback((skill) => {
    const level = skills[skill];
    const deletedSkill = { skill, level };
    
    // Remove the skill
    setSkills((prev) => {
      const updated = { ...prev };
      delete updated[skill];
      return updated;
    });
    
    if (activeSkill === skill) {
      setActiveSkill(null);
    }
    
    // Show undo notification
    setUndoSkill(deletedSkill);
    showNotification(`"${skill}" was removed`, "undo", skill);
    
    // Auto remove undo notification after 5 seconds
    const timeout = setTimeout(() => {
      setUndoSkill(null);
      setNotification(null);
    }, 5000);
    
    setUndoTimeout(timeout);
  }, [skills, activeSkill]);

  // Undo delete
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
  const handleFileUpload = useCallback((selectedFile) => {
    setError("");
    if (!selectedFile) return;

    const ALLOWED_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
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
  const toggleInterest = useCallback((interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  }, []);

  const handleLanguageChange = useCallback((event) => {
    const lang = event.target.name;
    setSelectedLanguages((prev) =>
      event.target.checked ? [...prev, lang] : prev.filter((l) => l !== lang)
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

  return (
    <div className={styles.complete_profile_container}>
      {/* Undo Notification for Skill Deletion */}
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
              <ClickAwayListener onClickAway={() => setActiveSkill(null)}>
                <div>
                  <div className={styles.skills_grid}>
                    {skillsList.map((skill) => {
                      const level = skills[skill];
                      const isActive = activeSkill === skill;
                      
                      return (
                        <SkillChip
                          key={skill}
                          skill={skill}
                          level={level}
                          isActive={isActive}
                          onClick={() => handleSkillClick(skill)}
                          onDelete={() => handleDeleteSkill(skill)}
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

              {/* Selected Skills Preview */}
              {Object.keys(skills).length > 0 && (
                <div className={styles.selected_skills_preview}>
                  <div className={styles.preview_header}>
                    <h4>Your Selected Skills</h4>
                    <span className={styles.preview_count}>{Object.keys(skills).length} skills</span>
                  </div>
                  <div className={styles.selected_skills_list}>
                    {Object.entries(skills).map(([skill, level]) => (
                      <div key={skill} className={styles.selected_skill_item}>
                        <span className={styles.selected_skill_name}>{skill}</span>
                        <span className={styles.skill_level_badge} style={{ background: levelColors[level] }}>
                          {level}
                        </span>
                        <button
                          className={styles.remove_skill_btn}
                          onClick={() => handleDeleteSkill(skill)}
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
              <div className={styles.career_grid}>
                {careerOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setCareerPath(option.value)}
                    className={`${styles.career_card} ${careerPath === option.value ? styles.selected : ""}`}
                  >
                    <div className={styles.career_icon_wrapper} style={{ background: `${option.color}15` }}>
                      <span className={styles.career_icon}>{option.icon}</span>
                    </div>
                    <div className={styles.career_info}>
                      <span className={styles.career_name}>{option.label}</span>
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

          {/* Step 4 - Interests & Languages */}
          {activeStep === 3 && (
            <div className={styles.step_content}>
              <div className={styles.interests_section}>
                <div className={styles.section_title_wrapper}>
                  <span className={styles.section_emoji}>🎯</span>
                  <h4>Areas of Interest</h4>
                </div>
                <div className={styles.interests_grid}>
                  {interestsList.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      onClick={() => toggleInterest(interest)}
                      color={selectedInterests.includes(interest) ? "primary" : "default"}
                      variant={selectedInterests.includes(interest) ? "filled" : "outlined"}
                      className={styles.interest_chip}
                    />
                  ))}
                </div>
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
                    {Object.entries(skills).map(([skill, level]) => (
                      <div key={skill} className={styles.review_skill_tag}>
                        {skill} <span className={styles.review_level} style={{ color: levelColors[level] }}>({level})</span>
                      </div>
                    ))}
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
                  <p className={styles.review_text}>{careerOptions.find(c => c.value === careerPath)?.label || "Not selected"}</p>
                </div>

                <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>🎨</span>
                    <h4>Interests</h4>
                  </div>
                  <div className={styles.review_interests}>
                    {selectedInterests.map(interest => (
                      <span key={interest} className={styles.review_tag}>{interest}</span>
                    ))}
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
            >
              {activeStep === 4 ? "Complete Profile" : "Continue →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}