import { Avatar, Button, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect, useCallback, useRef } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUserProfile, updateUserProfileData } from "../../Api/authenticationService";
import styles from "./Profile.module.css";

// Import images
import Progress_img from "../../assets/book-open_.png";
import Document_img from "../../assets/File_dock.png";
import Fundementals from "../../assets/book-open_.png";
import Community from "../../assets/users_blue.png";
import Portfolio from "../../assets/File_dock.png";
import Badge from "../../assets/Flag_alt.png";

// ---------- Backend static data (from the provided lists) ----------
const SKILLS_LIST = [
  { id: 2, name: "JavaScript", category: " " },
  { id: 3, name: "Project Management", category: " " },
  { id: 4, name: "Data Analysis", category: " " },
  { id: 5, name: "Machine Learning", category: " " },
  { id: 6, name: "SqL", category: " " },
  { id: 7, name: "C++", category: " " },
  { id: 8, name: "Html", category: " " },
  { id: 9, name: "Css", category: " " },
  { id: 10, name: "Python", category: " " },
  { id: 11, name: "Docker", category: " " },
  { id: 12, name: "C#", category: " " },
  { id: 13, name: "ASP.NET Core Web API", category: " " },
  { id: 14, name: "Entity Framework Core", category: " " },
  { id: 15, name: "LINQ Queries", category: " " },
  { id: 16, name: "RESTful API Design", category: " " },
  { id: 17, name: "Dependency Injection", category: " " },
  { id: 18, name: "HTML5", category: " " },
  { id: 19, name: "CSS3", category: " " },
  { id: 20, name: "JavaScript ES6+", category: " " },
  { id: 21, name: "React.js Fundamentals", category: " " },
  { id: 22, name: "Responsive Web Design", category: " " },
  { id: 23, name: "SQL Server", category: " " },
  { id: 24, name: "Database Normalization", category: " " },
  { id: 25, name: "Writing Complex SQL Queries", category: " " },
  { id: 26, name: "Stored Procedures", category: " " },
  { id: 27, name: "Python Programming", category: " " },
  { id: 28, name: "Data Analysis with Pandas", category: " " },
  { id: 29, name: "Data Visualization", category: " " },
  { id: 30, name: "Machine Learning Fundamentals", category: " " },
  { id: 31, name: "Docker Containers", category: " " },
  { id: 32, name: "CI/CD Pipelines", category: " " },
  { id: 33, name: "Azure Cloud Basics", category: " " },
  { id: 34, name: "OWASP Security Principles", category: " " },
  { id: 35, name: "Authentication & Authorization (JWT)", category: " " },
];

const INTERESTS_LIST = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Data Science" },
  { id: 3, name: "Mobile App Development" },
  { id: 4, name: "Cloud Computing" },
  { id: 5, name: "Cybersecurity" },
  { id: 6, name: "Artificial Intelligence" },
  { id: 7, name: "Game Development" },
  { id: 8, name: "DevOps" },
  { id: 9, name: "UI/UX Design" },
  { id: 10, name: "Blockchain" },
  { id: 11, name: "Backend Development with .NET" },
  { id: 12, name: "Frontend Web Development" },
  { id: 13, name: "Full-Stack Web Applications" },
  { id: 14, name: "Data Analytics and Visualization" },
  { id: 15, name: "Artificial Intelligence & Machine Learning" },
  { id: 16, name: "Cloud Computing (Azure)" },
  { id: 17, name: "DevOps & Automation" },
  { id: 18, name: "Cybersecurity & Ethical Hacking" },
];

const CAREER_GOALS_LIST = [
  { id: 13, name: "Full-Stack Developer", description: "Aspire to master both frontend and backend technologies, building complete web applications." },
  { id: 14, name: "Backend Developer", description: "Focus on server-side development, working with databases, APIs, and business logic." },
  { id: 15, name: "Frontend Developer", description: "Specialize in creating engaging user interfaces and responsive web experiences." },
  { id: 16, name: "Data Scientist", description: "Aim to leverage programming skills to analyze data, build models, and extract insights." },
  { id: 17, name: "Software Engineer", description: "Aspire to design, develop, and maintain software applications with clean, scalable code." },
  { id: 18, name: "Data Analyst", description: "Focus on analyzing and interpreting data to help organizations make informed decisions." },
  { id: 19, name: "Machine Learning Engineer", description: "Aim to develop expertise in machine learning algorithms and deploy predictive models." },
  { id: 20, name: "Database Administrator", description: "Focus on managing and optimizing databases, ensuring performance, security, and availability." },
  { id: 21, name: "Game Developer", description: "Aspire to create interactive and immersive gaming experiences across multiple platforms." },
  { id: 22, name: "Cloud Solutions Architect", description: "Aim to design and implement cloud-based solutions that are scalable and cost-effective." },
  { id: 23, name: "Cybersecurity Specialist", description: "Focus on protecting systems and data from cyber threats using modern security tools." },
  { id: 24, name: "AI Researcher", description: "Aspire to conduct research in artificial intelligence, utilizing cutting-edge algorithms." },
  { id: 25, name: "Junior Backend .NET Developer", description: "Build and maintain RESTful APIs using ASP.NET Core and SQL Server." },
  { id: 26, name: "Full-Stack .NET Developer", description: "Develop complete web applications using ASP.NET Core and React.js." },
  { id: 27, name: "Frontend React Developer", description: "Create responsive and interactive user interfaces using React and modern JavaScript." },
  { id: 28, name: "Data Analyst", description: "Analyze datasets, generate insights, and build dashboards using Python and SQL." },
  { id: 29, name: "Machine Learning Engineer", description: "Develop predictive models and AI solutions using Python and ML frameworks." },
  { id: 30, name: "Cloud Engineer (Azure)", description: "Design and deploy scalable applications on Microsoft Azure." },
  { id: 31, name: "DevOps Engineer", description: "Automate deployments and manage CI/CD pipelines using Docker and cloud tools." },
  { id: 32, name: "Cybersecurity Analyst", description: "Secure applications and infrastructure by applying modern security practices." },
];

function stringAvatar(name) {
  const names = name.split(" ");
  if (names.length >= 2) {
    return {
      children: `${names[0][0]}${names[1][0]}`,
    };
  }
  return {
    children: name[0],
  };
}

// ✅ دالة مساعدة لقراءة البيانات من localStorage
const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// ✅ دالة مساعدة لحفظ البيانات في localStorage
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [value, setValue] = useState('1');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const syncTimeoutRef = useRef(null);

  // Backend‑synced profile fields
  const [careerGoalId, setCareerGoalId] = useState(15);
  const [interestIds, setInterestIds] = useState([]);
  const [userSkills, setUserSkills] = useState([]); // Array of { skillId, skillLevel }
  
  // Editing states
  const [editingCareer, setEditingCareer] = useState(false);
  const [editingInterests, setEditingInterests] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);
  const [tempCareerId, setTempCareerId] = useState(null);
  const [tempInterestIds, setTempInterestIds] = useState([]);
  const [tempSkills, setTempSkills] = useState([]);

  const [userData, setUserData] = useState({
    name: "",
    title: "Frontend Developer",
    email: "",
    location: "",
    joined: "",
    bio: "Passionate developer dedicated to continuous learning and building impactful applications.",
    cvUrl: null,
    cvName: null
  });

  const [progress, setProgress] = useState([
    { name: "Fundamentals", percentage: 0, color: "#0A5ADB" },
    { name: "Core Skills", percentage: 0, color: "#58A7B5" },
    { name: "Advanced", percentage: 0, color: "#667eea" },
  ]);

  const [projects, setProjects] = useState([]);
  const [badges, setBadges] = useState([]);
  const [activities, setActivities] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Helper: get skill name by ID
  const getSkillName = (skillId) => {
    const skill = SKILLS_LIST.find(s => s.id === skillId);
    return skill ? skill.name : `Skill ${skillId}`;
  };

  // Helper: get skill color
  const getSkillColor = (skillName) => {
    const colors = {
      "JavaScript": "#F7DF1E",
      "React": "#61DAFB",
      "Node.js": "#68A063",
      "TypeScript": "#3178C6",
      "Python": "#3776AB",
      "C#": "#239120",
      "Java": "#007396",
      "Docker": "#2496ED",
      "AWS": "#FF9900",
      "MongoDB": "#47A248",
      "PostgreSQL": "#336791",
      "Git": "#F05032"
    };
    return colors[skillName] || "#0A5ADB";
  };

  // Helper: get level label
  const getLevelLabel = (level) => {
    switch(level) {
      case 1: return "Beginner";
      case 2: return "Intermediate";
      case 3: return "Advanced";
      default: return "Not Set";
    }
  };

  // Helper: get level color
  const getLevelColor = (level) => {
    switch(level) {
      case 1: return "#10b981";
      case 2: return "#f59e0b";
      case 3: return "#0A5ADB";
      default: return "#999";
    }
  };

  // ---------- Sync to backend (debounced) ----------
  const syncProfileToBackend = useCallback(async (showToast = false) => {
    try {
      const payload = {
        skills: userSkills,
        interestIds: interestIds,
        careerGoalId: careerGoalId
      };

      await updateUserProfileData(payload);
      if (showToast) {
        showNotification("Profile synced with server!", "success");
      }
    } catch (err) {
      console.error("Failed to sync profile:", err);
      if (showToast) {
        showNotification("Failed to sync profile: " + err.message, "error");
      }
    }
  }, [userSkills, interestIds, careerGoalId]);

  const debouncedSync = useCallback(() => {
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => {
      syncProfileToBackend(false);
    }, 500);
  }, [syncProfileToBackend]);

  useEffect(() => {
    if (!loading) debouncedSync();
    return () => clearTimeout(syncTimeoutRef.current);
  }, [userSkills, interestIds, careerGoalId, loading, debouncedSync]);

  useEffect(() => {
    setAnimate(true);
    fetchUserData();
  }, []);

  // Skills handlers
  const handleEditSkills = () => {
    setTempSkills([...userSkills]);
    setEditingSkills(true);
  };

  const handleSaveSkills = () => {
    setUserSkills(tempSkills);
    setEditingSkills(false);
    showNotification("Skills updated!", "success");
  };

  const handleCancelSkills = () => {
    setTempSkills(userSkills);
    setEditingSkills(false);
  };

  const handleAddSkill = (skillId) => {
    // Check if skill already exists
    if (tempSkills.some(s => s.skillId === skillId)) {
      showNotification("Skill already added!", "error");
      return;
    }
    setTempSkills([...tempSkills, { skillId, skillLevel: 1 }]);
  };

  const handleRemoveSkill = (skillId) => {
    setTempSkills(tempSkills.filter(s => s.skillId !== skillId));
  };

  const handleUpdateSkillLevel = (skillId, newLevel) => {
    setTempSkills(tempSkills.map(s => 
      s.skillId === skillId ? { ...s, skillLevel: newLevel } : s
    ));
  };

  // Career Goal handlers
  const handleEditCareer = () => {
    setTempCareerId(careerGoalId);
    setEditingCareer(true);
  };

  const handleSaveCareer = () => {
    setCareerGoalId(tempCareerId);
    setEditingCareer(false);
    showNotification("Career goal updated!", "success");
  };

  const handleCancelCareer = () => {
    setTempCareerId(careerGoalId);
    setEditingCareer(false);
  };

  // Interests handlers
  const handleEditInterests = () => {
    setTempInterestIds([...interestIds]);
    setEditingInterests(true);
  };

  const handleSaveInterests = () => {
    setInterestIds(tempInterestIds);
    setEditingInterests(false);
    showNotification("Interests updated!", "success");
  };

  const handleCancelInterests = () => {
    setTempInterestIds(interestIds);
    setEditingInterests(false);
  };

  const handleToggleInterest = (interestId) => {
    setTempInterestIds(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userDataRes = await getCurrentUser();
      const userProfile = await getUserProfile();
      const profileResponse = await getUserProfile();
      const profileData = profileResponse.data || profileResponse;

      // ✅ أول حاجة: نقرأ من localStorage (من Complete Profile)
      const savedCV = localStorage.getItem('userCVUrl');
      const savedCVName = localStorage.getItem('userCVName');
      
      // ✅ ترتيب الأولوية: localStorage أولاً (من Complete Profile) > API
      const cvUrl = savedCV || profileData?.cvUrl || null;
      const cvName = savedCVName || profileData?.cvName || null;

      console.log('🔍 CV Debug Info:');
      console.log('  - savedCV (localStorage):', savedCV ? 'Found ✓' : 'Not found');
      console.log('  - savedCVName (localStorage):', savedCVName || 'Not found');
      console.log('  - profileData.cvUrl (API):', profileData?.cvUrl ? 'Found ✓' : 'Not found');
      console.log('  - profileData.cvName (API):', profileData?.cvName || 'Not found');
      console.log('  - Final cvUrl:', cvUrl ? 'Will display ✓' : 'No CV');
      console.log('  - Final cvName:', cvName || 'No name');

      console.log("User Profile Data:", userProfile.data);

      setUserData({
        name: userDataRes.fullName || userDataRes.firstName + " " + userDataRes.lastName || userDataRes.username || userDataRes.name || "Learner",
        title: userProfile.data.careerGoalName || "Frontend Developer",
        email: userDataRes.email || "",
        location: userDataRes.location || userDataRes.city || "Egypt",
        joined: userDataRes.joinedDate ? new Date(userDataRes.joinedDate).toLocaleString('default', { month: 'long', year: 'numeric' }) : "2026",
        bio: userDataRes.bio || userDataRes.about || "Passionate developer dedicated to continuous learning and building impactful applications.",
        cvUrl: cvUrl,
        cvName: cvName
      });

      if (userProfile.data.careerGoalId) {
        setCareerGoalId(userProfile.data.careerGoalId);
      } else {
        const matched = CAREER_GOALS_LIST.find(cg => cg.name === userProfile.data.careerGoalName);
        if (matched) setCareerGoalId(matched.id);
      }

      // Set interestIds from backend
      if (userProfile.data.interestIds && Array.isArray(userProfile.data.interestIds) && userProfile.data.interestIds.length > 0) {
        console.log("Setting interests from interestIds:", userProfile.data.interestIds);
        setInterestIds(userProfile.data.interestIds);
      } else if (userProfile.data.interests && Array.isArray(userProfile.data.interests) && userProfile.data.interests.length > 0) {
        console.log("Setting interests from interests array:", userProfile.data.interests);
        const ids = userProfile.data.interests.map(i => i.id || i.interestId).filter(id => id);
        setInterestIds(ids);
      } else {
        console.log("No interests found in API response");
        setInterestIds([]);
      }

      // Set skills from backend
      if (userProfile.data.skills && Array.isArray(userProfile.data.skills) && userProfile.data.skills.length > 0) {
        console.log("Setting skills from API:", userProfile.data.skills);
        setUserSkills(userProfile.data.skills);
      } else {
        setUserSkills([]);
      }

      if (userDataRes.progress) {
        setProgress([
          { name: "Fundamentals", percentage: userDataRes.progress.fundamentals || 0, color: "#0A5ADB" },
          { name: "Core Skills", percentage: userDataRes.progress.coreSkills || 0, color: "#58A7B5" },
          { name: "Advanced", percentage: userDataRes.progress.advanced || 0, color: "#667eea" },
        ]);
      }

      if (userProfile.data.projects && userProfile.data.projects.length > 0) {
        setProjects(userProfile.data.projects.map((project, index) => ({
          id: index + 1,
          name: project.name,
          level: project.level || "Beginner",
          status: project.status || "Not Started",
          progress: project.progress || 0,
          color: getProjectColor(project.status)
        })));
      } else {
        setProjects([
          { id: 1, name: "Sample Project", level: "Beginner", status: "Not Started", progress: 0, color: "#0A5ADB" }
        ]);
      }

      if (userProfile.data.badges && userProfile.data.badges.length > 0) {
        setBadges(userProfile.data.badges.map((badge, index) => ({
          id: index + 1,
          badge: badge.icon || "🏆",
          heading: badge.name,
          content: badge.description,
          points: badge.points || 0,
          date: badge.earnedDate ? new Date(badge.earnedDate).toLocaleString('default', { month: 'short', year: 'numeric' }) : "Pending",
          earned: badge.earned || false,
          required: badge.requirement
        })));
      } else {
        setBadges([
          { id: 1, badge: "🎯", heading: "First Steps", content: "Complete profile setup", points: 100, date: "Pending", earned: false },
          { id: 2, badge: "⚡", heading: "Quick Learner", content: "Finish 5 courses", points: 250, date: "Pending", earned: false },
        ]);
      }

      if (userProfile.data.recentActivities && userProfile.data.recentActivities.length > 0) {
        setActivities(userProfile.data.recentActivities.map((activity, index) => ({
          id: index + 1,
          logo: getActivityLogo(activity.type),
          title: activity.title,
          history: activity.timeAgo || activity.date,
          type: activity.type
        })));
      }

      setError(null);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError(err.message || "Failed to load profile data");
      showNotification("Failed to load profile data", "error");
    } finally {
      setLoading(false);
    }
  };

  const getProjectColor = (status) => {
    switch(status) {
      case "Completed": return "#10b981";
      case "In Progress": return "#f59e0b";
      default: return "#0A5ADB";
    }
  };

  const getActivityLogo = (type) => {
    switch(type) {
      case "course": return Fundementals;
      case "community": return Community;
      case "project": return Portfolio;
      default: return Badge;
    }
  };

  const saveDataToLocal = () => {
    const dataToSave = {
      userData,
      stats,
      progress,
      projects,
      userSkills,
    };
    localStorage.setItem('profileData', JSON.stringify(dataToSave));
    showNotification("Profile saved locally!", "success");
    syncProfileToBackend(true);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      name: "New Project",
      level: "Beginner",
      status: "Not Started",
      progress: 0,
      color: "#0A5ADB"
    };
    setProjects([...projects, newProject]);
    saveDataToLocal();
    showNotification("New project added!", "success");
  };

  const handleUpdateProjectStatus = (id, newStatus) => {
    setProjects(projects.map(p => p.id === id ? { 
      ...p, 
      status: newStatus, 
      progress: newStatus === "Completed" ? 100 : p.progress,
      color: getProjectColor(newStatus)
    } : p));
    saveDataToLocal();
    showNotification(`Project status updated to ${newStatus}`, "success");
  };

  const handleUpdateProjectName = (id, newName) => {
    setProjects(projects.map(p => p.id === id ? { ...p, name: newName } : p));
    saveDataToLocal();
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    saveDataToLocal();
    showNotification("Project removed", "info");
  };

  const handleUpdateProgress = (index, newPercentage) => {
    const limitedPercentage = Math.min(100, Math.max(0, newPercentage));
    const updatedProgress = [...progress];
    updatedProgress[index].percentage = limitedPercentage;
    setProgress(updatedProgress);
    saveDataToLocal();
    
    const avgProgress = Math.round(updatedProgress.reduce((acc, p) => acc + p.percentage, 0) / updatedProgress.length);
    setStats(stats.map(s => 
      s.name === "Courses Completed" ? { ...s, num: Math.floor(avgProgress / 10) } : s
    ));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      showNotification("Please upload a PDF or Word document", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification("File size must be less than 5MB", "error");
      return;
    }

    setUploading(true);
    showNotification("Uploading CV...", "info");

    try {
      const base64 = await convertFileToBase64(file);
      
      localStorage.setItem('userCVUrl', base64);
      localStorage.setItem('userCVName', file.name);
      localStorage.setItem('userCVType', file.type);
      
      setUserData(prev => ({ ...prev, cvUrl: base64, cvName: file.name }));
      
      showNotification("CV uploaded successfully!", "success");
    } catch (err) {
      console.error("Upload error:", err);
      showNotification("Failed to upload CV. Please try again.", "error");
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleDownloadCV = () => {
    if (userData.cvUrl) {
      if (userData.cvUrl.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = userData.cvUrl;
        link.download = userData.cvName || localStorage.getItem('userCVName') || 'CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(userData.cvUrl, "_blank");
      }
    } else {
      showNotification("No CV uploaded yet!", "info");
    }
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification("Profile link copied to clipboard!", "success");
  };

  const totalPoints = badges.filter(b => b.earned).reduce((acc, b) => acc + b.points, 0);
  const averageSkillLevel = userSkills.length > 0 
    ? Math.round(userSkills.reduce((acc, s) => acc + s.skillLevel, 0) / userSkills.length * 100 / 3)
    : 0;
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const currentCareerGoal = CAREER_GOALS_LIST.find(cg => cg.id === careerGoalId);
  const selectedInterests = INTERESTS_LIST.filter(i => interestIds.includes(i.id));

  // Group skills by category for better organization
  const skillsByCategory = SKILLS_LIST.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className={styles.profile_container}>
        <div className={styles.loading_container}>
          <div className={styles.loading_spinner}></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !userData.name) {
    return (
      <div className={styles.profile_container}>
        <div className={styles.error_container}>
          <p className={styles.error_message}>{error}</p>
          <button onClick={fetchUserData} className={styles.retry_button}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profile_container}>
      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.profile_content}>
        {/* Header Card */}
        <div className={`${styles.header_card} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.header_top}>
            <div className={styles.avatar_section}>
              <div className={styles.avatar_wrapper}>
                <Avatar
                  {...stringAvatar(userData.name)}
                  className={styles.avatar}
                />
              </div>
              <div className={styles.user_info}>
                <Typography variant="h5" className={styles.user_name}>{userData.name}</Typography>
                <Typography variant="body2" className={styles.user_title}>{userData.title}</Typography>
                <p className={styles.user_bio}>{userData.bio}</p>
              </div>
            </div>
            <div className={styles.header_actions}>
              <button className={styles.share_btn} onClick={handleShareProfile}>
                <ShareIcon /> Share Profile
              </button>
              <button className={styles.save_all_btn} onClick={saveDataToLocal}>
                Save All Changes
              </button>
            </div>
          </div>

          <div className={styles.contact_info}>
            <div className={styles.contact_item}>
              <EmailOutlinedIcon />
              <Typography>{userData.email}</Typography>
              <span className={styles.read_only_badge}>Verified</span>
            </div>
            <div className={styles.contact_item}>
              <LocationOnOutlinedIcon />
              <Typography>{userData.location}</Typography>
            </div>
            <div className={styles.contact_item}>
              <CalendarTodayIcon />
              <Typography>Joined {userData.joined}</Typography>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className={`${styles.tabs_section} ${animate ? styles.slide_up : ""}`}>
          <TabContext value={value}>
            <Box className={styles.tabs_header}>
              <TabList
                onChange={handleChange}
                TabIndicatorProps={{ className: styles.tab_indicator }}
                className={styles.tab_list}
              >
                <Tab label="Overview" value="1" className={styles.tab} />
                <Tab label="Skills" value="2" className={styles.tab} />
                <Tab label="Badges" value="3" className={styles.tab} />
                <Tab label="Activity" value="4" className={styles.tab} />
              </TabList>
            </Box>

            {/* Overview Tab */}
            <TabPanel value="1" className={styles.tab_panel}>
              {/* Career Goal Section */}
              <div className={styles.settings_section}>
                <div className={styles.section_header}>
                  <h4>🎯 Career Goal</h4>
                  {!editingCareer && (
                    <button onClick={handleEditCareer} className={styles.edit_btn}>
                      <EditIcon /> Edit
                    </button>
                  )}
                </div>
                {editingCareer ? (
                  <div className={styles.edit_section}>
                    <select
                      value={tempCareerId}
                      onChange={(e) => setTempCareerId(Number(e.target.value))}
                      className={styles.select_input}
                    >
                      {CAREER_GOALS_LIST.map(cg => (
                        <option key={cg.id} value={cg.id}>{cg.name}</option>
                      ))}
                    </select>
                    <div className={styles.edit_actions}>
                      <button onClick={handleSaveCareer} className={styles.save_btn}>
                        <CheckIcon /> Save
                      </button>
                      <button onClick={handleCancelCareer} className={styles.cancel_btn}>
                        <CloseIcon /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.display_section}>
                    <div className={styles.career_display}>
                      <span className={styles.career_name}>{currentCareerGoal?.name || "Not set"}</span>
                      <span className={styles.career_description}>{currentCareerGoal?.description}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Interests Section */}
              <div className={styles.settings_section}>
                <div className={styles.section_header}>
                  <h4>💡 Interests</h4>
                  {!editingInterests && (
                    <button onClick={handleEditInterests} className={styles.edit_btn}>
                      <EditIcon /> Edit
                    </button>
                  )}
                </div>
                {editingInterests ? (
                  <div className={styles.edit_section}>
                    <div className={styles.interests_grid}>
                      {INTERESTS_LIST.map(interest => (
                        <button
                          key={interest.id}
                          onClick={() => handleToggleInterest(interest.id)}
                          className={`${styles.interest_chip} ${tempInterestIds.includes(interest.id) ? styles.selected : ""}`}
                        >
                          {interest.name}
                        </button>
                      ))}
                    </div>
                    <div className={styles.edit_actions}>
                      <button onClick={handleSaveInterests} className={styles.save_btn}>
                        <CheckIcon /> Save
                      </button>
                      <button onClick={handleCancelInterests} className={styles.cancel_btn}>
                        <CloseIcon /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.display_section}>
                    {selectedInterests.length > 0 ? (
                      <div className={styles.interests_display}>
                        {selectedInterests.map(interest => (
                          <span key={interest.id} className={styles.interest_tag}>
                            {interest.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className={styles.empty_message}>No interests selected yet</p>
                    )}
                  </div>
                )}
              </div>

              {/* Skills Summary Section */}
                <div className={styles.settings_section}>
                  <div className={styles.section_header}>
                    <h4>⚡ Skills Summary</h4>
                    <button onClick={() => setValue('2')} className={styles.view_all_btn_small}>
                      Manage All Skills →
                    </button>
                  </div>
                  <div className={styles.skills_summary}>
                    {userSkills.slice(0, 5).map(skill => {
                      const skillName = getSkillName(skill.skillId);
                      return (
                        <div key={skill.skillId} className={styles.summary_skill_item}>
                          <div className={styles.summary_skill_header}>
                            <span className={styles.summary_skill_name}>{skillName}</span>
                            <span 
                              className={styles.summary_skill_level}
                              style={{ 
                                color: skill.skillLevel === 1 ? "#10b981" : skill.skillLevel === 2 ? "#f59e0b" : "#0A5ADB",
                                background: `rgba(${skill.skillLevel === 1 ? '16, 185, 129' : skill.skillLevel === 2 ? '245, 158, 11' : '10, 90, 219'}, 0.1)`
                              }}
                            >
                              {getLevelLabel(skill.skillLevel)}
                            </span>
                          </div>
                          <div className={styles.level_indicator_container}>
                            <div className={styles.level_indicator}>
                              <div 
                                className={styles.level_fill}
                                style={{ 
                                  width: `${(skill.skillLevel / 3) * 100}%`,
                                  background: "rgb(77, 141, 243)"  // Same color for all levels
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {userSkills.length > 5 && (
                      <p className={styles.more_skills}>+{userSkills.length - 5} more skills</p>
                    )}
                    {userSkills.length === 0 && (
                      <p className={styles.empty_message}>No skills added yet. Click "Manage All Skills" to add your skills.</p>
                    )}
                  </div>
                </div>

              <div className={styles.overview_grid}>
                {/* Roadmap Progress */}
                <div className={styles.roadmap_card}>
                  <div className={styles.card_header}>
                    <img src={Progress_img} alt="Progress" />
                    <div>
                      <h4>Roadmap Progress</h4>
                      <p>{userData.title}</p>
                    </div>
                  </div>
                  <div className={styles.progress_list}>
                    {progress.map((item, index) => (
                      <div key={index} className={styles.progress_item}>
                        <div className={styles.progress_header}>
                          <span>{item.name}</span>
                          <div className={styles.progress_controls}>
                            <span style={{ color: item.color }}>{item.percentage}%</span>
                            <button 
                              className={styles.progress_btn}
                              onClick={() => handleUpdateProgress(index, item.percentage - 10)}
                              disabled={item.percentage <= 0}
                            >
                              -10
                            </button>
                            <button 
                              className={styles.progress_btn}
                              onClick={() => handleUpdateProgress(index, item.percentage + 10)}
                              disabled={item.percentage >= 100}
                            >
                              +10
                            </button>
                          </div>
                        </div>
                        <div className={styles.progress_bar_container}>
                          <div 
                            className={styles.progress_bar}
                            style={{ 
                              width: `${item.percentage}%`,
                              background: `linear-gradient(90deg, ${item.color}, ${item.color}cc)`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.card_footer}>
                    <button className={styles.view_btn} onClick={() => navigate('/learningpath')}>
                      View Full Roadmap →
                    </button>
                  </div>
                </div>

                {/* Saved Projects */}
                <div className={styles.projects_card}>
                  <div className={styles.card_header}>
                    <img src={Document_img} alt="Projects" />
                    <div>
                      <h4>Saved Projects</h4>
                      <p>Your project bookmarks</p>
                    </div>
                    <button className={styles.add_btn} onClick={handleAddProject}>
                      <AddIcon /> Add Project
                    </button>
                  </div>
                  <div className={styles.projects_list}>
                    {projects.map((project) => (
                      <div key={project.id} className={styles.project_item}>
                        <div className={styles.project_info}>
                          <div className={styles.project_header}>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) => handleUpdateProjectName(project.id, e.target.value)}
                              className={styles.project_name_input}
                            />
                            <button 
                              className={styles.delete_btn}
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                          <div className={styles.project_tags}>
                            <select 
                              className={styles.project_level}
                              value={project.level}
                              onChange={(e) => setProjects(projects.map(p => p.id === project.id ? {...p, level: e.target.value} : p))}
                            >
                              <option>Beginner</option>
                              <option>Intermediate</option>
                              <option>Advanced</option>
                            </select>
                            <select 
                              className={`${styles.project_status} ${styles[project.status.toLowerCase().replace(' ', '_')]}`}
                              value={project.status}
                              onChange={(e) => handleUpdateProjectStatus(project.id, e.target.value)}
                            >
                              <option>Not Started</option>
                              <option>In Progress</option>
                              <option>Completed</option>
                            </select>
                          </div>
                        </div>
                        {project.status !== "Not Started" && (
                          <div className={styles.project_progress}>
                            <div className={styles.progress_bar_container}>
                              <div 
                                className={styles.progress_bar}
                                style={{ 
                                  width: `${project.progress}%`,
                                  background: `linear-gradient(90deg, ${project.color}, ${project.color}cc)`
                                }}
                              />
                            </div>
                            <span>{project.progress}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CV & Documents */}
              <div className={styles.documents_card}>
                <div className={styles.card_header}>
                  <img src={Document_img} alt="Documents" />
                  <div>
                    <h4>CV & Documents</h4>
                    <p>Your uploaded documents</p>
                  </div>
                </div>
                <div className={styles.document_item}>
                  <div className={styles.document_info}>
                    <div className={styles.document_icon}>📄</div>
                    <div>
                      {/* ✅ عرض الـ CV - الأولوية: localStorage أولاً */}
                      <h4>{userData.cvName || (userData.cvUrl ? 'Your CV' : "No CV Uploaded")}</h4>
                      <p>{userData.cvUrl ? "CV uploaded successfully" : "Upload your CV to showcase your experience"}</p>
                    </div>
                  </div>
                  {userData.cvUrl ? (
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      className={styles.download_btn}
                      onClick={handleDownloadCV}
                    >
                      Download
                    </Button>
                  ) : (
                    <p className={styles.no_cv_text}>No CV uploaded yet</p>
                  )}
                </div>
                <div className={styles.card_footer}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                  />
                  <button 
                    className={styles.upload_btn} 
                    onClick={handleUploadClick}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>Uploading...</>
                    ) : (
                      <><UploadFileIcon /> Upload New Document</>
                    )}
                  </button>
                </div>
              </div>
            </TabPanel>

            {/* Skills Tab */}
<TabPanel value="2" className={styles.tab_panel}>
  <div className={styles.skills_overview}>
    <div className={styles.skills_stats}>
      <div className={styles.skill_stat_card}>
        <span className={styles.skill_stat_value}>{averageSkillLevel}%</span>
        <span className={styles.skill_stat_label}>Average Proficiency</span>
      </div>
      <div className={styles.skill_stat_card}>
        <span className={styles.skill_stat_value}>{userSkills.length}</span>
        <span className={styles.skill_stat_label}>Total Skills</span>
      </div>
    </div>

    <div className={styles.skills_card}>
      <div className={styles.card_header}>
        <div>
          <h4>Your Skills</h4>
          <p>Select skills from the list below and set your proficiency level (1=Beginner, 2=Intermediate, 3=Advanced)</p>
        </div>
        {!editingSkills && (
          <button onClick={handleEditSkills} className={styles.add_skill_btn}>
            <EditIcon /> Manage Skills
          </button>
        )}
      </div>

      {editingSkills ? (
        <div className={styles.skills_edit_mode}>
          <div className={styles.selected_skills_section}>
            <h5>Your Selected Skills</h5>
            {tempSkills.length > 0 ? (
              <div className={styles.selected_skills_list}>
                {tempSkills.map(skill => {
                  const skillInfo = SKILLS_LIST.find(s => s.id === skill.skillId);
                  return (
                    <div key={skill.skillId} className={styles.selected_skill_item}>
                      <div className={styles.selected_skill_info}>
                        <span className={styles.selected_skill_name}>{skillInfo?.name}</span>
                        <div className={styles.level_selector}>
                          <button
                            className={`${styles.level_btn} ${skill.skillLevel === 1 ? styles.active : ''}`}
                            onClick={() => handleUpdateSkillLevel(skill.skillId, 1)}
                          >
                            Beginner
                          </button>
                          <button
                            className={`${styles.level_btn} ${skill.skillLevel === 2 ? styles.active : ''}`}
                            onClick={() => handleUpdateSkillLevel(skill.skillId, 2)}
                          >
                            Intermediate
                          </button>
                          <button
                            className={`${styles.level_btn} ${skill.skillLevel === 3 ? styles.active : ''}`}
                            onClick={() => handleUpdateSkillLevel(skill.skillId, 3)}
                          >
                            Advanced
                          </button>
                        </div>
                      </div>
                      <button
                        className={styles.remove_skill_btn}
                        onClick={() => handleRemoveSkill(skill.skillId)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className={styles.empty_message}>No skills selected yet. Browse the categories below to add skills.</p>
            )}
          </div>

          <div className={styles.available_skills_section}>
            <h5>Available Skills</h5>
            <div className={styles.skills_categories}>
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category} className={styles.skill_category}>
                  <h6>{category}</h6>
                  <div className={styles.category_skills}>
                    {skills.map(skill => {
                      const isSelected = tempSkills.some(s => s.skillId === skill.id);
                      return (
                        <button
                          key={skill.id}
                          className={`${styles.skill_option} ${isSelected ? styles.disabled : ''}`}
                          onClick={() => !isSelected && handleAddSkill(skill.id)}
                          disabled={isSelected}
                        >
                          {skill.name}
                          {isSelected && <CheckIcon className={styles.check_icon} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.edit_actions}>
            <button onClick={handleSaveSkills} className={styles.save_btn}>
              <CheckIcon /> Save Skills
            </button>
            <button onClick={handleCancelSkills} className={styles.cancel_btn}>
              <CloseIcon /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.skills_display_mode}>
          {userSkills.length > 0 ? (
            <div className={styles.skills_list_display}>
              {userSkills.map(skill => {
                const skillName = getSkillName(skill.skillId);
                return (
                  <div key={skill.skillId} className={styles.skill_display_card}>
                    <div className={styles.skill_display_header}>
                      <div 
                        className={styles.skill_dot}
                        style={{ background: getSkillColor(skillName) }}
                      />
                      <span className={styles.skill_display_name}>{skillName}</span>
                    </div>
                    <div className={styles.skill_display_level}>
                      <span 
                        className={styles.level_badge}
                        style={{ background: getLevelColor(skill.skillLevel) }}
                      >
                        {getLevelLabel(skill.skillLevel)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.empty_skills_state}>
              <p>You haven't added any skills yet.</p>
              <button onClick={handleEditSkills} className={styles.add_skill_btn}>
                <AddIcon /> Add Your First Skill
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</TabPanel>

            {/* Badges Tab */}
            <TabPanel value="3" className={styles.tab_panel}>
              <div className={styles.badges_stats}>
                <div className={styles.badge_stat}>
                  <span className={styles.badge_stat_value}>{badges.filter(b => b.earned).length}</span>
                  <span className={styles.badge_stat_label}>Badges Earned</span>
                </div>
                <div className={styles.badge_stat}>
                  <span className={styles.badge_stat_value}>{totalPoints}</span>
                  <span className={styles.badge_stat_label}>Total Points</span>
                </div>
                <div className={styles.badge_stat}>
                  <span className={styles.badge_stat_value}>{badges.filter(b => !b.earned).length}</span>
                  <span className={styles.badge_stat_label}>Locked Badges</span>
                </div>
              </div>
              <div className={styles.badges_grid}>
                {badges.map((badge) => (
                  <div key={badge.id} className={`${styles.badge_card} ${!badge.earned ? styles.locked : ""}`}>
                    <div className={styles.badge_icon}>{badge.badge}</div>
                    <h4>{badge.heading}</h4>
                    <p>{badge.content}</p>
                    {!badge.earned && badge.required && <p className={styles.badge_required}>Required: {badge.required}</p>}
                    <div className={styles.badge_footer}>
                      <span className={styles.badge_points}>+{badge.points} pts</span>
                      <span className={styles.badge_date}>{badge.date}</span>
                      {!badge.earned && (
                        <button className={styles.track_btn} onClick={() => navigate('/learningpath')}>
                          Track Progress
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>

            {/* Activity Tab */}
            <TabPanel value="4" className={styles.tab_panel}>
              <div className={styles.activity_card}>
                <div className={styles.card_header}>
                  <h4>Recent Activity</h4>
                  <p>Your latest actions on the platform</p>
                </div>
                <div className={styles.activity_timeline}>
                  {activities.map((activity) => (
                    <div key={activity.id} className={styles.activity_item}>
                      <div className={styles.activity_icon}>
                        <img src={activity.logo} alt={activity.type} />
                      </div>
                      <div className={styles.activity_content}>
                        <h4>{activity.title}</h4>
                        <p>{activity.history}</p>
                      </div>
                      <div className={`${styles.activity_badge} ${styles[activity.type]}`}>
                        {activity.type}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.card_footer}>
                  <button className={styles.view_all_btn}>View All Activity →</button>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  );
}