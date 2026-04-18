import { Avatar, Button, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

// Import images
import Progress_img from "../../assets/book-open_.png";
import Document_img from "../../assets/File_dock.png";
import Fundementals from "../../assets/book-open_.png";
import Community from "../../assets/users_blue.png";
import Portfolio from "../../assets/File_dock.png";
import Badge from "../../assets/Flag_alt.png";

// Validation functions
const validateName = (name) => {
  const trimmedName = name.trim();
  const nameParts = trimmedName.split(/\s+/);
  
  // Check if name has exactly 2 parts (first and last name)
  if (nameParts.length !== 2) {
    return { isValid: false, message: "Please enter both first name and last name" };
  }
  
  // Check if both parts contain only letters (and optionally hyphens/apostrophes)
  const nameRegex = /^[A-Za-z]+(?:[-'][A-Za-z]+)?$/;
  if (!nameRegex.test(nameParts[0]) || !nameRegex.test(nameParts[1])) {
    return { isValid: false, message: "Names should only contain letters" };
  }
  
  // Check minimum length (at least 2 characters each)
  if (nameParts[0].length < 2 || nameParts[1].length < 2) {
    return { isValid: false, message: "Each name should be at least 2 characters long" };
  }
  
  return { isValid: true, message: "" };
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address (e.g., name@example.com)" };
  }
  return { isValid: true, message: "" };
};

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

export default function Profile() {
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const [animate, setAnimate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempLocation, setTempLocation] = useState("");
  
  const [userData, setUserData] = useState({
    name: "Kareem Nabil",
    title: "Frontend Developer",
    email: "kareem.nabil@example.com",
    location: "Tanta, Egypt",
    joined: "January 2026",
    bio: "Passionate frontend developer with 3+ years of experience building responsive web applications."
  });

  const [stats, setStats] = useState([
    { name: "Courses Completed", num: 10, icon: "📚", color: "#0A5ADB" },
    { name: "Projects Done", num: 8, icon: "🚀", color: "#58A7B5" },
    { name: "Community Points", num: 247, icon: "⭐", color: "#667eea" },
    { name: "Badges Earned", num: 5, icon: "🏆", color: "#f59e0b" },
  ]);

  const [progress, setProgress] = useState([
    { name: "Fundamentals", percentage: 80, color: "#0A5ADB" },
    { name: "Core Skills", percentage: 45, color: "#58A7B5" },
    { name: "Advanced", percentage: 20, color: "#667eea" },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: "E-commerce Platform", level: "Intermediate", status: "In Progress", progress: 65, color: "#0A5ADB" },
    { id: 2, name: "Weather Dashboard", level: "Beginner", status: "Completed", progress: 100, color: "#10b981" },
    { id: 3, name: "Social Media App", level: "Advanced", status: "Not Started", progress: 0, color: "#f59e0b" },
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: "React", percentage: 80, color: "#61DAFB", projects: 5 },
    { id: 2, name: "Node.js", percentage: 70, color: "#68A063", projects: 4 },
    { id: 3, name: "TypeScript", percentage: 60, color: "#3178C6", projects: 3 },
    { id: 4, name: "MongoDB", percentage: 50, color: "#47A248", projects: 3 },
  ]);

  const [badges, setBadges] = useState([
    { id: 1, badge: "🎯", heading: "First Steps", content: "Completed profile setup", points: 100, date: "Jan 2025", earned: true },
    { id: 2, badge: "⚡", heading: "Quick Learner", content: "Finished 5 courses", points: 250, date: "Feb 2025", earned: true },
    { id: 3, badge: "🤝", heading: "Community Helper", content: "Helped 10 people", points: 150, date: "Mar 2025", earned: true },
    { id: 4, badge: "🏆", heading: "Project Master", content: "Completed 3 projects", points: 500, date: "Mar 2025", earned: true },
    { id: 5, badge: "💪", heading: "Consistency King", content: "30 day learning streak", points: 300, date: "Pending", earned: false, required: "30 day streak" },
  ]);

  const [activities, setActivities] = useState([
    { id: 1, logo: Fundementals, title: "Completed React Fundamentals", history: "2 hours ago", type: "course" },
    { id: 2, logo: Community, title: "Answered question in Community", history: "Yesterday", type: "community" },
    { id: 3, logo: Portfolio, title: "Updated Portfolio Project", history: "2 days ago", type: "project" },
    { id: 4, logo: Badge, title: "Earned Quick Learner Badge", history: "3 days ago", type: "badge" },
  ]);

  const [newSkill, setNewSkill] = useState({ name: "", percentage: 0 });
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setAnimate(true);
    loadSavedData();
  }, []);

  const loadSavedData = () => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserData(data.userData || userData);
      setStats(data.stats || stats);
      setProgress(data.progress || progress);
      setProjects(data.projects || projects);
      setSkills(data.skills || skills);
    }
  };

  const saveData = () => {
    const dataToSave = {
      userData,
      stats,
      progress,
      projects,
      skills,
    };
    localStorage.setItem('profileData', JSON.stringify(dataToSave));
    showNotification("Profile saved successfully!", "success");
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Start editing name
  const startEditName = () => {
    setTempName(userData.name);
    setIsEditing(true);
  };

  // Save name
  const handleUpdateName = () => {
    const validation = validateName(tempName);
    if (validation.isValid) {
      setUserData({...userData, name: tempName.trim()});
      setIsEditing(false);
      saveData();
      showNotification("Name updated successfully!", "success");
    } else {
      showNotification(validation.message, "error");
    }
  };

  // Cancel name edit
  const cancelEditName = () => {
    setIsEditing(false);
    setTempName("");
  };

  // Start editing contact
  const startEditContact = () => {
    setTempEmail(userData.email);
    setTempLocation(userData.location);
    setIsEditingContact(true);
  };

  // Save contact
  const handleUpdateContact = () => {
    const emailValidation = validateEmail(tempEmail);
    
    if (!emailValidation.isValid) {
      showNotification(emailValidation.message, "error");
      return;
    }
    
    setUserData({
      ...userData,
      email: tempEmail,
      location: tempLocation
    });
    setIsEditingContact(false);
    saveData();
    showNotification("Contact information updated!", "success");
  };

  // Cancel contact edit
  const cancelEditContact = () => {
    setIsEditingContact(false);
    setTempEmail("");
    setTempLocation("");
  };

  // Limit percentage between 0 and 100
  const limitPercentage = (value) => {
    return Math.min(100, Math.max(0, value));
  };

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.percentage > 0 && newSkill.percentage <= 100) {
      const newId = Math.max(...skills.map(s => s.id), 0) + 1;
      setSkills([...skills, { 
        id: newId, 
        name: newSkill.name, 
        percentage: limitPercentage(newSkill.percentage), 
        color: "#0A5ADB", 
        projects: 0 
      }]);
      setNewSkill({ name: "", percentage: 0 });
      setShowAddSkill(false);
      saveData();
      showNotification(`${newSkill.name} added to your skills!`, "success");
    } else {
      showNotification("Please enter a valid skill name and percentage (1-100)", "error");
    }
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(s => s.id !== id));
    saveData();
    showNotification("Skill removed", "info");
  };

  const handleUpdateSkill = (id, newPercentage) => {
    const limitedPercentage = limitPercentage(newPercentage);
    setSkills(skills.map(s => s.id === id ? { ...s, percentage: limitedPercentage } : s));
    saveData();
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
    saveData();
    showNotification("New project added!", "success");
  };

  const handleUpdateProjectStatus = (id, newStatus) => {
    setProjects(projects.map(p => p.id === id ? { 
      ...p, 
      status: newStatus, 
      progress: newStatus === "Completed" ? 100 : p.progress 
    } : p));
    saveData();
    showNotification(`Project status updated to ${newStatus}`, "success");
  };

  const handleUpdateProjectName = (id, newName) => {
    setProjects(projects.map(p => p.id === id ? { ...p, name: newName } : p));
    saveData();
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    saveData();
    showNotification("Project removed", "info");
  };

  const handleUpdateProgress = (index, newPercentage) => {
    const limitedPercentage = limitPercentage(newPercentage);
    const updatedProgress = [...progress];
    updatedProgress[index].percentage = limitedPercentage;
    setProgress(updatedProgress);
    saveData();
    
    // Update overall stats based on progress
    const avgProgress = Math.round(updatedProgress.reduce((acc, p) => acc + p.percentage, 0) / updatedProgress.length);
    setStats(stats.map(s => 
      s.name === "Courses Completed" ? { ...s, num: Math.floor(avgProgress / 10) } : s
    ));
  };

  const handleDownloadCV = () => {
    showNotification("Downloading CV...", "info");
    setTimeout(() => {
      showNotification("CV downloaded successfully!", "success");
    }, 1000);
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification("Profile link copied to clipboard!", "success");
  };

  const totalPoints = badges.filter(b => b.earned).reduce((acc, b) => acc + b.points, 0);
  const averageSkill = Math.round(skills.reduce((acc, s) => acc + s.percentage, 0) / skills.length);
  const completedProjects = projects.filter(p => p.status === "Completed").length;

  return (
    <div className={styles.profile_container}>
      {/* Notification */}
      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      {/* Background decorative elements */}
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
                {isEditing ? (
                  <div className={styles.edit_name_container}>
                    <input 
                      type="text" 
                      value={tempName} 
                      onChange={(e) => setTempName(e.target.value)}
                      className={styles.edit_input}
                      placeholder="First Last"
                      autoFocus
                    />
                    <button onClick={handleUpdateName} className={styles.save_btn}>
                      <SaveIcon />
                    </button>
                    <button onClick={cancelEditName} className={styles.cancel_btn}>
                      <CancelIcon />
                    </button>
                  </div>
                ) : (
                  <div className={styles.name_wrapper}>
                    <Typography variant="h5" className={styles.user_name}>{userData.name}</Typography>
                    <button className={styles.edit_name_btn} onClick={startEditName}>
                      <EditIcon />
                    </button>
                  </div>
                )}
                <Typography variant="body2" className={styles.user_title}>{userData.title}</Typography>
                <p className={styles.user_bio}>{userData.bio}</p>
              </div>
            </div>
            <div className={styles.header_actions}>
              <button className={styles.share_btn} onClick={handleShareProfile}>
                <ShareIcon /> Share Profile
              </button>
              <button className={styles.save_all_btn} onClick={saveData}>
                Save All Changes
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.contact_info}>
            {isEditingContact ? (
              <div className={styles.edit_contact_container}>
                <input 
                  type="email" 
                  value={tempEmail} 
                  onChange={(e) => setTempEmail(e.target.value)}
                  placeholder="Email"
                  className={styles.contact_input}
                />
                <input 
                  type="text" 
                  value={tempLocation} 
                  onChange={(e) => setTempLocation(e.target.value)}
                  placeholder="Location"
                  className={styles.contact_input}
                />
                <button onClick={handleUpdateContact} className={styles.save_btn}>
                  <SaveIcon />
                </button>
                <button onClick={cancelEditContact} className={styles.cancel_btn}>
                  <CancelIcon />
                </button>
              </div>
            ) : (
              <>
                <div className={styles.contact_item}>
                  <EmailOutlinedIcon />
                  <Typography>{userData.email}</Typography>
                  <button className={styles.edit_contact_btn} onClick={startEditContact}>
                    <EditIcon />
                  </button>
                </div>
                <div className={styles.contact_item}>
                  <LocationOnOutlinedIcon />
                  <Typography>{userData.location}</Typography>
                </div>
                <div className={styles.contact_item}>
                  <CalendarTodayIcon />
                  <Typography>Joined {userData.joined}</Typography>
                </div>
              </>
            )}
          </div>

          {/* Stats Cards */}
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
              <div className={styles.overview_grid}>
                {/* Roadmap Progress */}
                <div className={styles.roadmap_card}>
                  <div className={styles.card_header}>
                    <img src={Progress_img} alt="Progress" />
                    <div>
                      <h4>Roadmap Progress</h4>
                      <p>Frontend Developer Path</p>
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
                      <h4>Kareem_Nabil_CV.pdf</h4>
                      <p>Uploaded 2 days ago • 2.4 MB</p>
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    className={styles.download_btn}
                    onClick={handleDownloadCV}
                  >
                    Download
                  </Button>
                </div>
                <div className={styles.card_footer}>
                  <button className={styles.upload_btn}>+ Upload New Document</button>
                </div>
              </div>
            </TabPanel>

            {/* Skills Tab */}
            <TabPanel value="2" className={styles.tab_panel}>
              <div className={styles.skills_overview}>
                <div className={styles.skills_stats}>
                  <div className={styles.skill_stat_card}>
                    <span className={styles.skill_stat_value}>{averageSkill}%</span>
                    <span className={styles.skill_stat_label}>Average Proficiency</span>
                  </div>
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
                      <p>Current proficiency levels</p>
                    </div>
                    <button className={styles.add_skill_btn} onClick={() => setShowAddSkill(!showAddSkill)}>
                      <AddIcon /> Add Skill
                    </button>
                  </div>

                  {showAddSkill && (
                    <div className={styles.add_skill_form}>
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                        className={styles.skill_input}
                      />
                      <input
                        type="number"
                        placeholder="Percentage (1-100)"
                        value={newSkill.percentage}
                        onChange={(e) => setNewSkill({...newSkill, percentage: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))})}
                        className={styles.skill_input}
                        min="0"
                        max="100"
                      />
                      <button onClick={handleAddSkill} className={styles.confirm_btn}>Add</button>
                      <button onClick={() => setShowAddSkill(false)} className={styles.cancel_btn}>Cancel</button>
                    </div>
                  )}

                  <div className={styles.skills_list}>
                    {skills.map((skill) => (
                      <div key={skill.id} className={styles.skill_item}>
                        <div className={styles.skill_header}>
                          <div className={styles.skill_name_wrapper}>
                            <div className={styles.skill_dot} style={{ background: skill.color }}></div>
                            <span>{skill.name}</span>
                            <span className={styles.skill_projects}>📁 {skill.projects} projects</span>
                          </div>
                          <div className={styles.skill_controls}>
                            <span className={styles.skill_percentage}>{skill.percentage}%</span>
                            <button 
                              className={styles.skill_btn}
                              onClick={() => handleUpdateSkill(skill.id, skill.percentage - 10)}
                              disabled={skill.percentage <= 0}
                            >
                              -10
                            </button>
                            <button 
                              className={styles.skill_btn}
                              onClick={() => handleUpdateSkill(skill.id, skill.percentage + 10)}
                              disabled={skill.percentage >= 100}
                            >
                              +10
                            </button>
                            <button 
                              className={styles.delete_skill_btn}
                              onClick={() => handleDeleteSkill(skill.id)}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        </div>
                        <div className={styles.progress_bar_container}>
                          <div 
                            className={styles.progress_bar}
                            style={{ 
                              width: `${skill.percentage}%`,
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`
                            }}
                          />
                        </div>
                      </div>
                    ))}
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
                    {!badge.earned && <p className={styles.badge_required}>Required: {badge.required}</p>}
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