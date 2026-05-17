import { Avatar, Button, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getUserProfile,
  getAllSkills,
  getAllInterests,
  getAllCareerGoals,
  getGapAnalysis,
  updateUserProfile
} from "../../api/authenticationService";
import styles from "./Profile.module.css";

// Import images
import Progress_img from "../../assets/book-open_.png";
import Document_img from "../../assets/File_dock.png";
import Fundementals from "../../assets/book-open_.png";
import Community from "../../assets/users_blue.png";
import Portfolio from "../../assets/File_dock.png";
import Badge from "../../assets/Flag_alt.png";

function stringAvatar(name) {
  const names = name.split(" ");
  if (names.length >= 2) {
    return { children: `${names[0][0]}${names[1][0]}` };
  }
  return { children: name[0] };
}

// ✅ دالة تحويل المستوى لاسم
const getLevelName = (level) => {
  switch(level) {
    case 1: return "Beginner";
    case 2: return "Intermediate";
    case 3: return "Advanced";
    default: return "Beginner";
  }
};

// ✅ دالة تحويل المستوى لاللون
const getLevelColor = (level) => {
  switch(level) {
    case 1: return "#10b981";
    case 2: return "#f59e0b";
    case 3: return "#ef4444";
    default: return "#10b981";
  }
};

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

  const [stats, setStats] = useState([
    { name: "Courses Completed", num: 0, icon: "📚", color: "#0A5ADB" },
    { name: "Projects Done", num: 0, icon: "🚀", color: "#58A7B5" },
    { name: "Community Points", num: 0, icon: "⭐", color: "#667eea" },
    { name: "Badges Earned", num: 0, icon: "🏆", color: "#f59e0b" },
  ]);

  const [progress, setProgress] = useState([
    { name: "Fundamentals", percentage: 0, color: "#0A5ADB" },
    { name: "Core Skills", percentage: 0, color: "#58A7B5" },
    { name: "Advanced", percentage: 0, color: "#667eea" },
  ]);

  // ✅ Projects من localStorage أو array فاضي
  const [projects, setProjects] = useState(() => loadFromLocalStorage('userProjects', []));
  
  // ✅ Skills من localStorage أو array فاضي
  const [skills, setSkills] = useState(() => loadFromLocalStorage('userSkills', []));
  
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState("");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState(1);
  const [badges, setBadges] = useState([]);
  const [activities, setActivities] = useState([]);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setAnimate(true);
    fetchUserData();
  }, []);

  // ✅ حفظ الـ projects في localStorage كل ما تتغير
  useEffect(() => {
    if (!loading) {
      saveToLocalStorage('userProjects', projects);
    }
  }, [projects, loading]);

  // ✅ حفظ الـ skills في localStorage كل ما تتغير
  useEffect(() => {
    if (!loading) {
      saveToLocalStorage('userSkills', skills);
    }
  }, [skills, loading]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      const profileResponse = await getUserProfile();
      const skillsResponse = await getAllSkills();
      setAllSkills(skillsResponse || []);
      const allInterests = await getAllInterests();
      const allCareerGoals = await getAllCareerGoals();
      const gapAnalysis = await getGapAnalysis();
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
      
      setUserData({
        name: currentUser.firstName + " " + currentUser.lastName,
        title: profileData?.careerGoalName || "Student",
        email: currentUser.email || "",
        location: "Egypt",
        joined: "2026",
        bio: profileData?.bio || "Passionate developer dedicated to continuous learning and building impactful applications.",
        cvUrl: cvUrl,
        cvName: cvName
      });

      // ✅ تحديث الـ stats
      const savedProjects = loadFromLocalStorage('userProjects', []);
      const savedSkills = loadFromLocalStorage('userSkills', []);
      const completedProjects = savedProjects.filter(p => p.status === "Completed").length;
      const earnedBadges = badges.filter(b => b.earned).length;
      const totalPoints = badges.filter(b => b.earned).reduce((acc, b) => acc + b.points, 0);

      setStats([
        { name: "Courses Completed", num: 0, icon: "📚", color: "#0A5ADB" },
        { name: "Projects Done", num: completedProjects, icon: "🚀", color: "#58A7B5" },
        { name: "Community Points", num: totalPoints, icon: "⭐", color: "#667eea" },
        { name: "Badges Earned", num: earnedBadges, icon: "🏆", color: "#f59e0b" },
      ]);

      setProgress([
        { name: "Fundamentals", percentage: gapAnalysis?.statusOfTheGapAnalysis?.completionPercentage || 0, color: "#0A5ADB" },
        { name: "Core Skills", percentage: savedSkills.length > 0 ? 60 : 0, color: "#58A7B5" },
        { name: "Advanced", percentage: gapAnalysis?.readySkills?.length > 0 ? 80 : 0, color: "#667eea" },
      ]);

      // ✅ تحديث skills من API مع الـ level
      if (profileData?.skills && profileData.skills.length > 0) {
        setSkills(profileData.skills.map((skill) => ({
          id: skill.skillId,
          name: skill.skillName,
          level: skill.skillLevel || 1,
          color: getSkillColor(skill.skillName),
          projects: 0,
        })));
      }
      // ✅ لو مفيش skills محفوظة في localStorage ولا في API، حط default
      else if (savedSkills.length === 0) {
        setSkills([
          { id: 1, name: "React", level: 1, color: "#61DAFB", projects: 0 },
          { id: 2, name: "Node.js", level: 1, color: "#68A063", projects: 0 },
          { id: 3, name: "TypeScript", level: 1, color: "#3178C6", projects: 0 },
        ]);
      }

      // ✅ لو مفيش projects محفوظة في localStorage، حط default
      if (savedProjects.length === 0) {
        setProjects([{ id: 1, name: "Sample Project", level: "Beginner", status: "Not Started", progress: 0, color: "#0A5ADB" }]);
      }

      setBadges([
        { id: 1, badge: "🎯", heading: "First Steps", content: "Complete profile setup", points: 100, date: "Pending", earned: false },
        { id: 2, badge: "⚡", heading: "Quick Learner", content: "Finish 5 courses", points: 250, date: "Pending", earned: false },
      ]);
      setActivities([]);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError(err.message || "Failed to load profile data");
      showNotification("Failed to load profile data", "error");
    } finally {
      setLoading(false);
    }
  };

  const getSkillColor = (skillName) => {
    const colors = {
      "React": "#61DAFB", "Node.js": "#68A063", "TypeScript": "#3178C6",
      "Python": "#3776AB", "JavaScript": "#F7DF1E", "MongoDB": "#47A248",
      "Docker": "#2496ED", "AWS": "#FF9900"
    };
    return colors[skillName] || "#0A5ADB";
  };

  const getProjectColor = (status) => {
    switch(status) {
      case "Completed": return "#10b981";
      case "In Progress": return "#f59e0b";
      default: return "#0A5ADB";
    }
  };

  const saveDataToLocal = () => {
    const dataToSave = { userData, stats, progress, projects, skills };
    saveToLocalStorage('profileData', dataToSave);
    showNotification("Profile saved locally!", "success");
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddSkill = () => {
    if (!selectedSkillId) {
      showNotification("Please select a skill", "error");
      return;
    }
    const selectedSkill = allSkills.find(skill => skill.id === Number(selectedSkillId));
    if (!selectedSkill) {
      showNotification("Skill not found", "error");
      return;
    }
    
    setSkills([...skills, {
      id: selectedSkill.id,
      name: selectedSkill.name,
      level: selectedSkillLevel,
      color: getSkillColor(selectedSkill.name),
      projects: 0,
    }]);
    
    setSelectedSkillId("");
    setSelectedSkillLevel(1);
    setShowAddSkill(false);
    showNotification(`${selectedSkill.name} added successfully!`, "success");
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(s => s.id !== id));
    showNotification("Skill removed", "info");
  };

  const handleAddProject = () => {
    setProjects([...projects, { id: Date.now(), name: "New Project", level: "Beginner", status: "Not Started", progress: 0, color: "#0A5ADB" }]);
    showNotification("New project added!", "success");
  };

  const handleUpdateProjectStatus = (id, newStatus) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus, progress: newStatus === "Completed" ? 100 : p.progress, color: getProjectColor(newStatus) } : p));
    showNotification(`Project status updated to ${newStatus}`, "success");
  };

  const handleUpdateProjectName = (id, newName) => {
    setProjects(projects.map(p => p.id === id ? { ...p, name: newName } : p));
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    showNotification("Project removed", "info");
  };

  const handleUpdateProgress = (index, newPercentage) => {
    const updatedProgress = [...progress];
    updatedProgress[index].percentage = Math.min(100, Math.max(0, newPercentage));
    setProgress(updatedProgress);
    saveToLocalStorage('userProgress', updatedProgress);
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
  const completedProjects = projects.filter(p => p.status === "Completed").length;

  useEffect(() => {
    setStats(prevStats => prevStats.map(stat => {
      if (stat.name === "Projects Done") return { ...stat, num: completedProjects };
      if (stat.name === "Badges Earned") return { ...stat, num: badges.filter(b => b.earned).length };
      if (stat.name === "Community Points") return { ...stat, num: totalPoints };
      return stat;
    }));
  }, [completedProjects, badges, totalPoints]);

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

  const availableSkills = allSkills.filter(skill => !skills.some(s => s.id === skill.id));

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
                <Avatar {...stringAvatar(userData.name)} className={styles.avatar} />
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

          <div className={styles.stats_grid}>
            {stats.map((item, index) => (
              <div key={index} className={styles.stat_card} style={{ borderBottomColor: item.color }}>
                <span className={styles.stat_icon}>{item.icon}</span>
                <div className={styles.stat_info}>
                  <span className={styles.stat_value}>{item.num}</span>
                  <span className={styles.stat_label}>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <div className={`${styles.tabs_section} ${animate ? styles.slide_up : ""}`}>
          <TabContext value={value}>
            <Box className={styles.tabs_header}>
              <TabList onChange={handleChange} className={styles.tab_list}>
                <Tab label="Overview" value="1" className={styles.tab} />
                <Tab label="Skills" value="2" className={styles.tab} />
                <Tab label="Badges" value="3" className={styles.tab} />
                <Tab label="Activity" value="4" className={styles.tab} />
              </TabList>
            </Box>

            {/* Overview Tab */}
            <TabPanel value="1" className={styles.tab_panel}>
              <div className={styles.overview_grid}>
                {/* Roadmap Progress */}
                <div className={styles.roadmap_card}>
                  <div className={styles.card_header}>
                    <img src={Progress_img} alt="Progress" />
                    <div>
                      <h4>Roadmap Progress</h4>
                      <p>{userData.title} Path</p>
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
                    {projects.length === 0 ? (
                      <div className={styles.empty_state}>
                        <p>No projects yet. Add your first project!</p>
                      </div>
                    ) : (
                      projects.map((project) => (
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
                      ))
                    )}
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
                    <span className={styles.skill_stat_value}>{skills.length}</span>
                    <span className={styles.skill_stat_label}>Total Skills</span>
                  </div>
                  <div className={styles.skill_stat_card}>
                    <span className={styles.skill_stat_value}>{totalPoints}</span>
                    <span className={styles.skill_stat_label}>Skill Points</span>
                  </div>
                </div>

                <div className={styles.skills_card}>
                  <div className={styles.card_header}>
                    <div>
                      <h4>Your Skills</h4>
                      <p>Your proficiency levels</p>
                    </div>
                    <button className={styles.add_skill_btn} onClick={() => setShowAddSkill(!showAddSkill)}>
                      <AddIcon /> Add Skill
                    </button>
                  </div>

                  {showAddSkill && (
                    <div className={styles.add_skill_form}>
                      <div className={styles.skill_select_wrapper}>
                        <select
                          value={selectedSkillId}
                          onChange={(e) => setSelectedSkillId(e.target.value)}
                          className={styles.skill_select}
                        >
                          <option value="">Select a skill...</option>
                          {availableSkills.map((skill) => (
                            <option key={skill.id} value={skill.id}>
                              {skill.name} {skill.category ? `- ${skill.category}` : ''}
                            </option>
                          ))}
                        </select>
                        <div className={styles.select_arrow}>▼</div>
                      </div>
                      
                      <div className={styles.level_select_wrapper}>
                        <select
                          value={selectedSkillLevel}
                          onChange={(e) => setSelectedSkillLevel(Number(e.target.value))}
                          className={styles.level_select}
                        >
                          <option value={1}>Beginner</option>
                          <option value={2}>Intermediate</option>
                          <option value={3}>Advanced</option>
                        </select>
                        <div className={styles.select_arrow}>▼</div>
                      </div>
                      
                      <button onClick={handleAddSkill} className={styles.confirm_btn}>Add</button>
                      <button onClick={() => setShowAddSkill(false)} className={styles.cancel_btn}>✕</button>
                    </div>
                  )}

                  <div className={styles.skills_list}>
                    {skills.length === 0 ? (
                      <div className={styles.empty_state}>
                        <p>No skills added yet. Add your skills from the complete profile page!</p>
                      </div>
                    ) : (
                      skills.map((skill) => (
                        <div key={skill.id} className={styles.skill_item}>
                          <div className={styles.skill_header}>
                            <div className={styles.skill_name_wrapper}>
                              <div className={styles.skill_dot} style={{ background: skill.color }}></div>
                              <span className={styles.skill_name}>{skill.name}</span>
                            </div>
                            
                            <div className={styles.level_badge} style={{ background: getLevelColor(skill.level) }}>
                              {getLevelName(skill.level)}
                            </div>
                            
                            <button 
                              className={styles.delete_skill_btn}
                              onClick={() => handleDeleteSkill(skill.id)}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                          
                          <div className={styles.progress_bar_container}>
                            <div 
                              className={styles.progress_bar}
                              style={{ 
                                width: `${(skill.level / 3) * 100}%`,
                                background: getLevelColor(skill.level)
                              }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className={styles.card_footer}>
                    <button className={styles.assess_btn} onClick={() => navigate('/skills')}>
                      Take Skill Assessment →
                    </button>
                  </div>
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
                  {activities.length === 0 ? (
                    <div className={styles.empty_state}>
                      <p>No activity yet. Start by completing your profile!</p>
                    </div>
                  ) : (
                    activities.map((activity) => (
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
                    ))
                  )}
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