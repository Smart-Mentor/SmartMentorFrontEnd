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
import { useNavigate } from "react-router-dom";
import { 
  getCurrentUser, 
  getUserProfile, 
  updateUserProfileData, 
  getCommunityPostsByCareerGoal,
  getAllSkills,
  getAllInterests,
  getAllCareerGoals
} from "../../Api/authenticationService";
import styles from "./Profile.module.css";

// Import images
import Progress_img from "../../assets/book-open_.png";
import Document_img from "../../assets/File_dock.png";
import Fundementals from "../../assets/book-open_.png";
import Community from "../../assets/users_blue.png";
import Portfolio from "../../assets/File_dock.png";

// Skill level mapping
const skillLevelMap = {
  "Beginner": 1,
  "Intermediate": 2,
  "Advanced": 3
};

const levelColors = {
  1: "#10b981",
  2: "#f59e0b",
  3: "#0A5ADB"
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const syncTimeoutRef = useRef(null);

  // Data from API
  const [skillsList, setSkillsList] = useState([]);
  const [interestsList, setInterestsList] = useState([]);
  const [careerGoalsList, setCareerGoalsList] = useState([]);

  // Backend‑synced profile fields
  const [careerGoalId, setCareerGoalId] = useState(null);
  const [interestIds, setInterestIds] = useState([]);
  const [userSkills, setUserSkills] = useState([]); 
  
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
    bio: "Passionate developer dedicated to continuous learning and building impactful applications."
  });

  const [progress, setProgress] = useState([
    { name: "Fundamentals", percentage: 0, color: "#0A5ADB" },
    { name: "Core Skills", percentage: 0, color: "#58A7B5" },
    { name: "Advanced", percentage: 0, color: "#667eea" },
  ]);

  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Helper: get skill name by ID
  const getSkillName = (skillId) => {
    const skill = skillsList.find(s => s.id === skillId);
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
    return levelColors[level] || "#999";
  };

  // Fetch master data from API
  const fetchMasterData = useCallback(async () => {
    try {
      const [skillsData, interestsData, careerGoalsData] = await Promise.all([
        getAllSkills(),
        getAllInterests(),
        getAllCareerGoals()
      ]);

      const formattedSkills = skillsData.map(skill => ({
        ...skill,
        category: " "
      }));

      setSkillsList(formattedSkills);
      setInterestsList(interestsData);
      setCareerGoalsList(careerGoalsData);
    } catch (err) {
      console.error("Failed to fetch master data:", err);
      showNotification("Failed to load skills, interests, or career goals", "error");
    }
  }, []);

  // Sync to backend
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
    fetchMasterData();
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

      console.log("User Profile Data:", userProfile.data);
      console.log("Current User Data:", userDataRes);

      if (userDataRes.userId) {
        setCurrentUserId(userDataRes.userId);
      }

      setUserData({
        name: userDataRes.fullName || `${userDataRes.firstName || ''} ${userDataRes.lastName || ''}`.trim() || userDataRes.username || userDataRes.name || "Learner",
        title: userProfile.data.careerGoalName || "Frontend Developer",
        email: userDataRes.email || "",
        location: userDataRes.location || userDataRes.city || "Egypt",
        joined: userDataRes.joinedDate ? new Date(userDataRes.joinedDate).toLocaleString('default', { month: 'long', year: 'numeric' }) : "2026",
        bio: userDataRes.bio || userDataRes.about || "Passionate developer dedicated to continuous learning and building impactful applications."
      });

      if (userProfile.data.careerGoalId) {
        setCareerGoalId(userProfile.data.careerGoalId);
      } else if (userProfile.data.careerGoalName) {
        const matched = careerGoalsList.find(cg => cg.name === userProfile.data.careerGoalName);
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

      setError(null);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError(err.message || "Failed to load profile data");
      showNotification("Failed to load profile data", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUserPosts = useCallback(async (userId) => {
    if (!userId) {
      console.log('No user ID provided');
      return;
    }

    try {
      setLoadingPosts(true);
      const allCareerGoalIds = careerGoalsList.map(cg => cg.id);
      
      if (allCareerGoalIds.length === 0) {
        console.log('No career goals available');
        setLoadingPosts(false);
        return;
      }

      let allUserPosts = [];

      // Fetch posts from each career goal
      for (const goalId of allCareerGoalIds) {
        try {
          const response = await getCommunityPostsByCareerGoal(goalId);
          
          if (response.success && response.data) {
            const userAuthoredPosts = response.data.filter(
              post => post.author?.userId === userId
            );
            allUserPosts = [...allUserPosts, ...userAuthoredPosts];
          }
        } catch (err) {
          console.error(`Error fetching posts for career goal ${goalId}:`, err);
        }
      }

      console.log(`Found ${allUserPosts.length} posts authored by user`);
      setUserPosts(allUserPosts);

      // Convert posts to activity format
      const postActivities = allUserPosts.map(post => ({
        id: `post-${post.postId}`,
        logo: Community,
        title: post.title,
        history: new Date(new Date(post.createdAt).getTime() + (3 * 60 * 60 * 1000)).toLocaleString('default', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        type: 'community',
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        isLiked: post.isLikedByCurrentUser,
        author: `${post.author?.firstName || ''} ${post.author?.lastName || ''}`.trim(),
        careerGoal: post.primaryCareerGoal?.careerGoalName || 'Unknown',
        contentPreview: post.contentPreview
      }));

      // Sort by date
      postActivities.sort((a, b) => new Date(b.history) - new Date(a.history));

      setActivities(prevActivities => {
        const nonCommunityActivities = prevActivities.filter(activity => activity.type !== 'community');
        return [...postActivities, ...nonCommunityActivities];
      });

    } catch (err) {
      console.error('Failed to fetch user posts:', err);
      showNotification('Failed to load your community posts', 'error');
    } finally {
      setLoadingPosts(false);
    }
  }, [careerGoalsList]);

  useEffect(() => {
    if (currentUserId && !loading && careerGoalsList.length > 0) {
      fetchAllUserPosts(currentUserId);
    }
  }, [currentUserId, loading, careerGoalsList, fetchAllUserPosts]);

  const getProjectColor = (status) => {
    switch(status) {
      case "Completed": return "#10b981";
      case "In Progress": return "#f59e0b";
      default: return "#0A5ADB";
    }
  };

  const saveDataToLocal = () => {
    const dataToSave = {
      userData,
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
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification("Profile link copied to clipboard!", "success");
  };

  const averageSkillLevel = userSkills.length > 0 
    ? Math.round(userSkills.reduce((acc, s) => acc + s.skillLevel, 0) / userSkills.length * 100 / 3)
    : 0;
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const currentCareerGoal = careerGoalsList.find(cg => cg.id === careerGoalId);
  const selectedInterests = interestsList.filter(i => interestIds.includes(i.id));

  const skillsByCategory = skillsList.reduce((acc, skill) => {
    const category = skill.category || " ";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
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
          </div>

          <div className={styles.contact_info}>
            <div className={styles.contact_item}>
              <EmailOutlinedIcon />
              <Typography>{userData.email}</Typography>
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
                      value={tempCareerId || ""}
                      onChange={(e) => setTempCareerId(Number(e.target.value))}
                      className={styles.select_input}
                    >
                      {careerGoalsList.map(cg => (
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
                      {interestsList.map(interest => (
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
                              color: getLevelColor(skill.skillLevel),
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
                                background: "rgb(77, 141, 243)"
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
                              const skillInfo = skillsList.find(s => s.id === skill.skillId);
                              return (
                                <div key={skill.skillId} className={styles.selected_skill_item}>
                                  <div className={styles.selected_skill_info}>
                                    <span className={styles.selected_skill_name}>{skillInfo?.name || `Skill ${skill.skillId}`}</span>
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
                              <h6>{category === " " ? "All Skills" : category}</h6>
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

            {/* Activity Tab */}
            <TabPanel value="4" className={styles.tab_panel}>
              <div className={styles.activity_card}>
                <div className={styles.card_header}>
                  <h4>Your Community Activity</h4>
                  <p>
                    {userPosts.length > 0 
                      ? `You have published ${userPosts.length} post${userPosts.length !== 1 ? 's' : ''} across all career paths` 
                      : "Your posts across different career paths will appear here"}
                  </p>
                </div>
                {loadingPosts ? (
                  <div className={styles.loading_activities}>
                    <div className={styles.loading_spinner_small}></div>
                    <p>Loading your posts...</p>
                  </div>
                ) : (
                  <div className={styles.activity_timeline}>
                    {activities.filter(a => a.type === 'community').length > 0 ? (
                      activities.filter(a => a.type === 'community').map((activity) => (
                        <div
                          key={activity.id}
                          className={`${styles.activity_item} ${activity.type === 'community' ? styles.activity_item_clickable : ''}`}
                          onClick={() => {
                            if (activity.type === 'community') {
                              const postId = activity.id.replace('post-', '');
                              navigate('/community', { state: { openPostId: postId } });
                            }
                          }}
                        >
                          <div className={styles.activity_icon}>
                            <img src={activity.logo} alt={activity.type} />
                          </div>
                          <div className={styles.activity_content}>
                            <h4>{activity.title}</h4>
                            <p>Posted on {activity.history}</p>
                            {activity.careerGoal && (
                              <div className={styles.post_career_badge}>
                                🎯 {activity.careerGoal}
                              </div>
                            )}
                            {activity.contentPreview && (
                              <p className={styles.post_preview}>{activity.contentPreview}</p>
                            )}
                            <div className={styles.post_stats}>
                              <span>❤️ {activity.likeCount} likes</span>
                              <span>💬 {activity.commentCount} comments</span>
                            </div>
                          </div>
                          <div className={`${styles.activity_badge} ${styles.community}`}>
                            Your Post
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={styles.empty_activity}>
                        <p>You haven't published any posts yet.</p>
                        <button 
                          className={styles.create_post_btn}
                          onClick={() => navigate('/community')}
                        >
                          Create Your First Post →
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {userPosts.length > 0 && (
                  <div className={styles.card_footer}>
                    <button 
                      className={styles.view_all_btn} 
                      onClick={() => navigate('/community')}
                    >
                      Go to Community →
                    </button>
                  </div>
                )}
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  );
}