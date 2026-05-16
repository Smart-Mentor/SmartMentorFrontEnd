import { Avatar, Button, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
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
import { getCurrentUser } from "../../api/authenticationService"; 
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  
  const [userData, setUserData] = useState({
    name: "",
    title: "Frontend Developer",
    email: "",
    location: "",
    joined: "",
    bio: "Passionate developer dedicated to continuous learning and building impactful applications."
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

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [badges, setBadges] = useState([]);
  const [activities, setActivities] = useState([]);

  const [newSkill, setNewSkill] = useState({ name: "", percentage: 0 });
  const [showAddSkill, setShowAddSkill] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    setAnimate(true);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const data = await getCurrentUser();
      
      // Map API response to component state
      setUserData({
        name: data.fullName || data.firstName + " " + data.lastName || data.username || data.name || "Learner",
        title: data.title || data.jobTitle || "Frontend Developer",
        email: data.email || "",
        location: data.location || data.city || "Egypt",
        joined: data.joinedDate ? new Date(data.joinedDate).toLocaleString('default', { month: 'long', year: 'numeric' }) : "2026",
        bio: data.bio || data.about || "Passionate developer dedicated to continuous learning and building impactful applications."
      });

      // Update stats from API data
      setStats([
        { name: "Courses Completed", num: data.coursesCompleted || data.totalCourses || 0, icon: "📚", color: "#0A5ADB" },
        { name: "Projects Done", num: data.projectsCompleted || data.totalProjects || 0, icon: "🚀", color: "#58A7B5" },
        { name: "Community Points", num: data.communityPoints || data.points || 0, icon: "⭐", color: "#667eea" },
        { name: "Badges Earned", num: data.badgesEarned || data.totalBadges || 0, icon: "🏆", color: "#f59e0b" },
      ]);

      // Update progress from API
      if (data.progress) {
        setProgress([
          { name: "Fundamentals", percentage: data.progress.fundamentals || 0, color: "#0A5ADB" },
          { name: "Core Skills", percentage: data.progress.coreSkills || 0, color: "#58A7B5" },
          { name: "Advanced", percentage: data.progress.advanced || 0, color: "#667eea" },
        ]);
      }

      // Update skills from API
      if (data.skills && data.skills.length > 0) {
        setSkills(data.skills.map((skill, index) => ({
          id: index + 1,
          name: skill.name,
          percentage: skill.proficiency || skill.level || 0,
          color: getSkillColor(skill.name),
          projects: skill.projectsCount || 0
        })));
      } else {
        // Default skills if none from API
        setSkills([
          { id: 1, name: "React", percentage: 0, color: "#61DAFB", projects: 0 },
          { id: 2, name: "Node.js", percentage: 0, color: "#68A063", projects: 0 },
          { id: 3, name: "TypeScript", percentage: 0, color: "#3178C6", projects: 0 },
        ]);
      }

      // Update projects from API
      if (data.projects && data.projects.length > 0) {
        setProjects(data.projects.map((project, index) => ({
          id: index + 1,
          name: project.name,
          level: project.level || "Beginner",
          status: project.status || "Not Started",
          progress: project.progress || 0,
          color: getProjectColor(project.status)
        })));
      } else {
        // Default projects if none from API
        setProjects([
          { id: 1, name: "Sample Project", level: "Beginner", status: "Not Started", progress: 0, color: "#0A5ADB" }
        ]);
      }

      // Update badges from API
      if (data.badges && data.badges.length > 0) {
        setBadges(data.badges.map((badge, index) => ({
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
        // Default badges if none from API
        setBadges([
          { id: 1, badge: "🎯", heading: "First Steps", content: "Complete profile setup", points: 100, date: "Pending", earned: false },
          { id: 2, badge: "⚡", heading: "Quick Learner", content: "Finish 5 courses", points: 250, date: "Pending", earned: false },
        ]);
      }

      // Update activities from API
      if (data.recentActivities && data.recentActivities.length > 0) {
        setActivities(data.recentActivities.map((activity, index) => ({
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

  // Helper function to get skill color
  const getSkillColor = (skillName) => {
    const colors = {
      "React": "#61DAFB",
      "Node.js": "#68A063",
      "TypeScript": "#3178C6",
      "Python": "#3776AB",
      "JavaScript": "#F7DF1E",
      "MongoDB": "#47A248",
      "Docker": "#2496ED",
      "AWS": "#FF9900"
    };
    return colors[skillName] || "#0A5ADB";
  };

  // Helper function to get project color based on status
  const getProjectColor = (status) => {
    switch(status) {
      case "Completed": return "#10b981";
      case "In Progress": return "#f59e0b";
      default: return "#0A5ADB";
    }
  };

  // Helper function to get activity logo
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
      skills,
    };
    localStorage.setItem('profileData', JSON.stringify(dataToSave));
    showNotification("Profile saved locally!", "success");
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        color: getSkillColor(newSkill.name), 
        projects: 0 
      }]);
      setNewSkill({ name: "", percentage: 0 });
      setShowAddSkill(false);
      saveDataToLocal();
      showNotification(`${newSkill.name} added to your skills!`, "success");
    } else {
      showNotification("Please enter a valid skill name and percentage (1-100)", "error");
    }
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(s => s.id !== id));
    saveDataToLocal();
    showNotification("Skill removed", "info");
  };

  const handleUpdateSkill = (id, newPercentage) => {
    const limitedPercentage = limitPercentage(newPercentage);
    setSkills(skills.map(s => s.id === id ? { ...s, percentage: limitedPercentage } : s));
    saveDataToLocal();
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
    const limitedPercentage = limitPercentage(newPercentage);
    const updatedProgress = [...progress];
    updatedProgress[index].percentage = limitedPercentage;
    setProgress(updatedProgress);
    saveDataToLocal();
    
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
  const averageSkill = skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + s.percentage, 0) / skills.length) : 0;
  const completedProjects = projects.filter(p => p.status === "Completed").length;

  // Update stats when projects or skills change
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
                {/* Name - Read only */}
                <Typography variant="h5" className={styles.user_name}>{userData.name}</Typography>
                
                {/* Title - Read only (no edit button) */}
                <Typography variant="body2" className={styles.user_title}>{userData.title}</Typography>
                
                {/* Bio - Read only (no edit button) */}
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

          {/* Contact Info - Read only */}
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
                      <h4>{userData.name.replace(' ', '_')}_CV.pdf</h4>
                      <p>Uploaded recently</p>
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