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

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ==================== COMPLETE BACKEND DATA ====================

// Complete Skills List from Backend (55 skills)
const skillsList = [
  { id: 1, name: "C#", category: "Backend" },
  { id: 2, name: "ASP.NET Core Web API", category: "Backend" },
  { id: 3, name: "Entity Framework Core", category: "Backend" },
  { id: 4, name: "LINQ Queries", category: "Backend" },
  { id: 5, name: "RESTful API Design", category: "Backend" },
  { id: 6, name: "Dependency Injection", category: "Backend" },
  { id: 7, name: "HTML5", category: "Frontend" },
  { id: 8, name: "CSS3", category: "Frontend" },
  { id: 9, name: "JavaScript ES6+", category: "Frontend" },
  { id: 10, name: "React.js Fundamentals", category: "Frontend" },
  { id: 11, name: "Responsive Web Design", category: "Frontend" },
  { id: 12, name: "SQL Server", category: "Database" },
  { id: 13, name: "Database Normalization", category: "Database" },
  { id: 14, name: "Writing Complex SQL Queries", category: "Database" },
  { id: 15, name: "Stored Procedures", category: "Database" },
  { id: 16, name: "Python Programming", category: "Data" },
  { id: 17, name: "Data Analysis with Pandas", category: "Data" },
  { id: 18, name: "Data Visualization", category: "Data" },
  { id: 19, name: "Machine Learning Fundamentals", category: "Data" },
  { id: 20, name: "Docker Containers", category: "DevOps" },
  { id: 21, name: "CI/CD Pipelines", category: "DevOps" },
  { id: 22, name: "Azure Cloud Basics", category: "Cloud" },
  { id: 23, name: "OWASP Security Principles", category: "Security" },
  { id: 24, name: "Authentication & Authorization (JWT)", category: "Security" },
  { id: 25, name: "React Hooks", category: "Frontend" },
  { id: 26, name: "State Management (Redux)", category: "Frontend" },
  { id: 27, name: "Tailwind CSS", category: "Frontend" },
  { id: 28, name: "Unit Testing (xUnit)", category: "Backend" },
  { id: 29, name: "Microservices Architecture", category: "Architecture" },
  { id: 30, name: "SOLID Principles", category: "Architecture" },
  { id: 31, name: "Design Patterns", category: "Architecture" },
  { id: 32, name: "PostgreSQL", category: "Database" },
  { id: 33, name: "MongoDB", category: "Database" },
  { id: 34, name: "NumPy", category: "Data" },
  { id: 35, name: "Scikit-learn", category: "Data" },
  { id: 36, name: "TensorFlow", category: "Data" },
  { id: 37, name: "Kubernetes", category: "DevOps" },
  { id: 38, name: "Terraform", category: "DevOps" },
  { id: 39, name: "Azure App Services", category: "Cloud" },
  { id: 40, name: "Azure Functions", category: "Cloud" },
  { id: 41, name: "SQL Injection Prevention", category: "Security" },
  { id: 42, name: "XSS & CSRF Protection", category: "Security" },
  { id: 43, name: "Git & Version Control", category: "General" },
  { id: 44, name: "Agile / Scrum", category: "General" },
  { id: 45, name: "TypeScript", category: "Frontend" },
  { id: 46, name: "Next.js", category: "Frontend" },
  { id: 47, name: "System Design", category: "Architecture" },
  { id: 48, name: "Message Queues (RabbitMQ)", category: "Architecture" },
  { id: 49, name: "OWASP Top 10", category: "Security" },
  { id: 50, name: "ETL Pipelines", category: "Data" },
  { id: 51, name: "Jupyter Notebooks", category: "Data" },
  { id: 52, name: "GitHub Actions", category: "DevOps" },
  { id: 53, name: "Monitoring (Prometheus)", category: "DevOps" },
  { id: 54, name: "React Router", category: "Frontend" },
  { id: 55, name: "Responsive Design", category: "Frontend" }
];

// Complete Interests List from Backend (19 interests)
const interestsList = [
  { id: 1, name: "Backend Development with .NET" },
  { id: 2, name: "Frontend Web Development" },
  { id: 3, name: "Full-Stack Web Applications" },
  { id: 4, name: "Data Analytics and Visualization" },
  { id: 5, name: "Artificial Intelligence & Machine Learning" },
  { id: 6, name: "Cloud Computing (Azure)" },
  { id: 7, name: "DevOps & Automation" },
  { id: 8, name: "Cybersecurity & Ethical Hacking" },
  { id: 9, name: "Software Architecture & System Design" },
  { id: 10, name: "Mobile App Development (React Native)" },
  { id: 11, name: "Quality Assurance & Test Automation" },
  { id: 12, name: "Site Reliability & System Observability" },
  { id: 13, name: "Database Design & Administration" },
  { id: 14, name: "Technical Product Management" },
  { id: 15, name: "Blockchain & Decentralized Applications" },
  { id: 16, name: "Embedded Systems & IoT" },
  { id: 17, name: "Security Architecture & Threat Modeling" },
  { id: 18, name: "Platform Engineering & Internal Tooling" },
  { id: 19, name: "Data Engineering & ETL Pipelines" },
  { id: 20, name: "MLOps & AI System Architecture" },
  { id: 21, name: "TypeScript Full-Stack Development" },
  { id: 22, name: "Game Development & Interactive Experiences" }
];

// Complete Career Goals from Backend (22 career goals)
const careerOptions = [
  { id: 1, value: "junior-backend-dotnet", label: "Junior Backend .NET Developer", icon: "🔷", color: "#512bd4", description: "Build and maintain RESTful APIs using ASP.NET Core and SQL Server." },
  { id: 2, value: "fullstack-dotnet", label: "Full-Stack .NET Developer", icon: "🌐", color: "#512bd4", description: "Develop complete web applications using ASP.NET Core and React.js." },
  { id: 3, value: "frontend-react", label: "Frontend React Developer", icon: "🎨", color: "#61dafb", description: "Create responsive and interactive user interfaces using React and modern JavaScript." },
  { id: 4, value: "data-analyst", label: "Data Analyst", icon: "📈", color: "#f59e0b", description: "Analyze datasets, generate insights, and build dashboards using Python and SQL." },
  { id: 5, value: "ml-engineer", label: "Machine Learning Engineer", icon: "🧠", color: "#10b981", description: "Develop predictive models and AI solutions using Python and ML frameworks." },
  { id: 6, value: "cloud-engineer-azure", label: "Cloud Engineer (Azure)", icon: "☁️", color: "#0078d4", description: "Design and deploy scalable applications on Microsoft Azure." },
  { id: 7, value: "devops-engineer", label: "DevOps Engineer", icon: "⚙️", color: "#8b5cf6", description: "Automate deployments and manage CI/CD pipelines using Docker and cloud tools." },
  { id: 8, value: "cybersecurity-analyst", label: "Cybersecurity Analyst", icon: "🛡️", color: "#ef4444", description: "Secure applications and infrastructure by applying modern security practices." },
  { id: 9, value: "senior-backend-dotnet", label: "Senior Backend .NET Developer", icon: "🏆", color: "#512bd4", description: "Lead backend architecture, mentor juniors, and design scalable distributed systems." },
  { id: 11, value: "software-architect", label: "Software Architect", icon: "🏛️", color: "#6366f1", description: "Design high-level system architecture and make strategic technology decisions." },
  { id: 18, value: "mobile-developer-react-native", label: "Mobile Developer (React Native)", icon: "📱", color: "#61dafb", description: "Build cross-platform mobile apps using React Native and modern JavaScript." },
  { id: 19, value: "qa-automation-engineer", label: "QA Automation Engineer", icon: "🧪", color: "#ef4444", description: "Write automated tests and build CI/CD testing pipelines for quality assurance." },
  { id: 26, value: "site-reliability-engineer", label: "Site Reliability Engineer", icon: "📊", color: "#22c55e", description: "Ensure system reliability, observability, and incident response at scale." },
  { id: 27, value: "database-developer", label: "Database Developer", icon: "🗄️", color: "#3b82f6", description: "Design optimized database schemas, stored procedures, and performance tuning." },
  { id: 28, value: "technical-product-manager", label: "Technical Product Manager", icon: "📋", color: "#f59e0b", description: "Bridge engineering and business to deliver impactful technical products." },
  { id: 29, value: "blockchain-developer", label: "Blockchain Developer", icon: "⛓️", color: "#8b5cf6", description: "Build decentralized applications and smart contracts on blockchain platforms." },
  { id: 30, value: "embedded-systems-engineer", label: "Embedded Systems Engineer", icon: "🔌", color: "#ef4444", description: "Develop firmware and software for microcontrollers and IoT devices." },
  { id: 31, value: "security-architect", label: "Security Architect", icon: "🔐", color: "#dc2626", description: "Design enterprise security frameworks and threat mitigation strategies." },
  { id: 32, value: "platform-engineer", label: "Platform Engineer", icon: "🏗️", color: "#64748b", description: "Build internal developer platforms and tooling to improve engineering velocity." },
  { id: 33, value: "data-engineer", label: "Data Engineer", icon: "📦", color: "#0ea5e9", description: "Build and maintain ETL pipelines, data warehouses, and data infrastructure." },
  { id: 34, value: "ai-ml-architect", label: "AI/ML Architect", icon: "🤖", color: "#8b5cf6", description: "Design end-to-end machine learning systems and MLOps pipelines." },
  { id: 35, value: "fullstack-typescript", label: "Full-Stack TypeScript Developer", icon: "📘", color: "#3178c6", description: "Build type-safe full-stack applications with TypeScript, Node.js, and React." }
];

// Languages
// const languagesList = ["Arabic", "English", "French", "German", "Spanish", "Italian", "Chinese", "Japanese"];

// Skill level mapping (1 = Beginner, 2 = Intermediate, 3 = Advanced)
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
  
  // Step 1 - Skills
  const [skills, setSkills] = useState({});
  const [activeSkill, setActiveSkill] = useState(null);
  const [skillCategories, setSkillCategories] = useState({});
  
  // // Step 2 - CV
  // const [file, setFile] = useState(null);
  // const [dragActive, setDragActive] = useState(false);
  // const [error, setError] = useState("");
  
  // Step 2 - Career
  const [careerPath, setCareerPath] = useState("");
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  
  // Step 3 - Interests & Languages
  const [selectedInterests, setSelectedInterests] = useState([]);
  // const [selectedLanguages, setSelectedLanguages] = useState([]);
  
  // Search/filter states
  const [skillSearch, setSkillSearch] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("all");
  const [interestSearch, setInterestSearch] = useState("");
  
  // Notification
  const [notification, setNotification] = useState(null);
  const [undoSkill, setUndoSkill] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  // Get user profile from API
  const getUserProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        console.log("No auth token found");
        setIsLoading(false);
        return;
      }

      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/User/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      console.log("User profile data:", data);

      // Check if profile is complete (careerGoalId exists and is not 0 or null)
      if (data.data.careerGoalId && data.data.careerGoalId !== 0) {
        console.log("Profile already completed, redirecting to dashboard");
        localStorage.setItem("profileCompleted", "true");
        localStorage.setItem("profileData", JSON.stringify(data));
        navigate("/dashboard");
        return;
      }

      // If profile exists but careerGoalId is 0 or null, populate existing data
      if (data) {
        // Populate skills if any
        if (data.skills && Array.isArray(data.skills)) {
          const existingSkills = {};
          data.skills.forEach(skill => {
            const skillInfo = skillsList.find(s => s.id === skill.skillId);
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

        // Populate career goal if exists but not 0
        if (data.careerGoalId && data.careerGoalId !== 0) {
          const career = careerOptions.find(c => c.id === data.careerGoalId);
          if (career) {
            setCareerPath(career.value);
            setSelectedCareerId(data.careerGoalId);
          }
        }

        // Populate languages if any
        // if (data.languages && Array.isArray(data.languages)) {
        //   setSelectedLanguages(data.languages);
        // }
      }

    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Don't redirect on error, allow user to complete profile
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Check profile completion on component mount
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  // Group skills by category
  useEffect(() => {
    const categories = {};
    skillsList.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push(skill);
    });
    setSkillCategories(categories);
  }, []);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const showNotification = (message, type, skillName = null) => {
    setNotification({ message, type, skillName });
    if (type !== "undo") {
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Filter skills based on search and category
  const getFilteredSkills = () => {
    let filtered = skillsList;
    
    if (skillSearch) {
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(skillSearch.toLowerCase())
      );
    }
    
    // if (selectedCategory !== "all") {
    //   filtered = filtered.filter(skill => skill.category === selectedCategory);
    // }
    
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
    
    // Get career goal ID
    const careerGoalId = selectedCareerId;
    
    const profileData = {
      skills: formattedSkills,
      interestIds: interestIds,
      careerGoalId: careerGoalId
    };
    
    console.log("Submitting profile data:", profileData);
    
    try {
      const token = getAuthToken();
      const response = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/User/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to complete profile");
      }
      
      const result = await response.json();
      console.log("Profile completed successfully:", result);
      
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
    // if (activeStep === 1 && !file) {
    //   showNotification("Please upload your CV", "error");
    //   return;
    // }
    if (activeStep === 1 && !careerPath) {
      showNotification("Please select a career path", "error");
      return;
    }
    if (activeStep === 2 && (selectedInterests.length === 0 )) {
      showNotification("Please select interests", "error");
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
  // const handleFileUpload = useCallback((selectedFile) => {
  //   setError("");
  //   if (!selectedFile) return;

  //   const ALLOWED_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  //   const MAX_FILE_SIZE = 10 * 1024 * 1024;

  //   if (!ALLOWED_TYPES.includes(selectedFile.type)) {
  //     setError("Only PDF, .doc and .docx files are allowed");
  //     return;
  //   }

  //   if (selectedFile.size > MAX_FILE_SIZE) {
  //     setError("File size must be less than 10MB");
  //     return;
  //   }

  //   setFile(selectedFile);
    
  //   // ✅ أضف: تحويل وحفظ الـ CV في localStorage
  //   try {
  //     const base64 =  convertFileToBase64(selectedFile);
  //     localStorage.setItem('userCVUrl', base64);
  //     localStorage.setItem('userCVName', selectedFile.name);
  //     localStorage.setItem('userCVType', selectedFile.type);
  //     console.log('✅ CV saved to localStorage');
  //   } catch (err) {
  //     console.error('❌ Error saving CV:', err);
  //     }

  //   showNotification("CV uploaded successfully!", "success");
  // }, []);

  // const handleDrop = useCallback((e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setDragActive(false);
  //   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
  //     handleFileUpload(e.dataTransfer.files[0]);
  //   }
  // }, [handleFileUpload]);

  // const handleDrag = useCallback((e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (e.type === "dragenter" || e.type === "dragover") {
  //     setDragActive(true);
  //   } else if (e.type === "dragleave") {
  //     setDragActive(false);
  //   }
  // }, []);

  // const handleChange = useCallback((e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     handleFileUpload(e.target.files[0]);
  //   }
  // }, [handleFileUpload]);

  // const removeFile = useCallback(() => {
  //   setFile(null);
  //   setError("");

  //   // ✅ أضف: حذف الـ CV من localStorage
  //   localStorage.removeItem('userCVUrl');
  //   localStorage.removeItem('userCVName');
  //   localStorage.removeItem('userCVType');
    
  //   showNotification("CV removed", "info");
  // }, []);

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

  // const handleLanguageChange = useCallback((event) => {
  //   const lang = event.target.name;
  //   setSelectedLanguages((prev) =>
  //     event.target.checked ? [...prev, lang] : prev.filter((l) => l !== lang)
  //   );
  // }, []);

  // Get unique categories for filter
  const categories = ["all", ...new Set(skillsList.map(skill => skill.category))];

  const stepConfigs = [
    { 
      icon: "🎯", 
      title: "Select Your Skills", 
      desc: "Choose the skills you have and rate your proficiency level",
      color: "#0A5ADB"
    },
    // { 
    //   icon: "📄", 
    //   title: "Upload Your CV", 
    //   desc: "Share your CV so we can better understand your background",
    //   color: "#58A7B5"
    // },
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

          {/* Step 1 - Skills with Search and Filter */}
          {activeStep === 0 && (
            <div className={styles.step_content}>
              {/* Search and Filter Bar */}
              <div className={styles.skills_filter_bar}>
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className={styles.skills_search}
                />
                {/* <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.category_filter}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select> */}
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

          {/* Step 2 - CV Upload */}
          {/* {activeStep === 1 && (
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
              </div> */}
              {/* {error && <Alert severity="error" className={styles.error_alert}>{error}</Alert>} */}
              
              {/* <div className={styles.upload_tips}>
                <div className={styles.tip_item}>💡 Your CV helps us personalize your learning path</div>
                <div className={styles.tip_item}>🔒 Your file is securely stored and never shared</div>
              </div>
            </div>
          )} */}

          {/* Step 2 - Career Path with all 22 options */}
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

          {/* Step 3 - Interests (all 19) */}
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

              {/* <div className={styles.languages_section}>
                <div className={styles.section_title_wrapper}>
                  <span className={styles.section_emoji}>🗣️</span>
                  <h4>Languages You Speak ({languagesList.length} options)</h4>
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
              </div> */}
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

                {/* <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>📄</span>
                    <h4>CV</h4>
                  </div>
                  <p className={styles.review_text}>{file?.name || "No file uploaded"}</p>
                </div> */}

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

                {/* <div className={styles.review_item}>
                  <div className={styles.review_item_header}>
                    <span className={styles.review_icon}>🗣️</span>
                    <h4>Languages ({selectedLanguages.length})</h4>
                  </div>
                  <div className={styles.review_languages}>
                    {selectedLanguages.map(lang => (
                      <span key={lang} className={styles.review_tag}>{lang}</span>
                    ))}
                  </div>
                </div> */}
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