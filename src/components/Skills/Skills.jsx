import React, { useState, useEffect } from "react";
import { Box, Skeleton, Alert, Button } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import SchoolIcon from "@mui/icons-material/School";
import SpeedIcon from "@mui/icons-material/Speed";
import StarIcon from "@mui/icons-material/Star";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { getUserProfile, getGapAnalysis, updateUserProfileData } from "../../api/authenticationService";
import styles from "./Skills.module.css";

const SkillsPage = () => {
  const [animate, setAnimate] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // states for gap analysis
  const [recommendedSkills, setRecommendedSkills] = useState([]);
  const [weakSkills, setWeakSkills] = useState([]);
  const [gapAnalysisLoading, setGapAnalysisLoading] = useState(false);
  const [gapAnalysisError, setGapAnalysisError] = useState(null);

  // Modal states for updating skill level
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateSkillId, setUpdateSkillId] = useState(null);
  const [updateSkillName, setUpdateSkillName] = useState("");
  const [updateSkillLevel, setUpdateSkillLevel] = useState(1);
  const [updateSkillError, setUpdateSkillError] = useState("");
  const [updateSkillSuccess, setUpdateSkillSuccess] = useState("");
  const [updating, setUpdating] = useState(false);

  // Modal states for adding recommended skill
  const [showAddModal, setShowAddModal] = useState(false);
  const [addSkillId, setAddSkillId] = useState(null);
  const [addSkillName, setAddSkillName] = useState("");
  const [addSkillLevel, setAddSkillLevel] = useState(1);
  const [addSkillError, setAddSkillError] = useState("");
  const [addSkillSuccess, setAddSkillSuccess] = useState("");
  const [adding, setAdding] = useState(false);

  const getLevelColor = (level) => {
    switch(level) {
      case 1: return "#10b981";  
      case 2: return "#f59e0b";  
      case 3: return "#0A5ADB";  
      default: return "#999";
    }
  };

  const getLevelLabel = (level) => {
    switch(level) {
      case 1: return "Beginner";
      case 2: return "Intermediate";
      case 3: return "Advanced";
      default: return "Not Set";
    }
  };

  // Get level from percentage
  const getLevelFromPercentage = (percentage) => {
    if (percentage <= 33) return 1;
    if (percentage <= 66) return 2;
    return 3;
  };

  useEffect(() => {
    setAnimate(true);
    fetchUserSkills();
    fetchGapAnalysis();
  }, []);

  const fetchUserSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const profileData = await getUserProfile();
      
      if (profileData.data.skills && profileData.data.skills.length > 0) {
        const formattedSkills = profileData.data.skills.map((skill) => {

          const skillLevel = skill.skillLevel || 1;
          const percentage = Math.round((skillLevel / 3) * 100);
          
          return {
            name: skill.skillName || `Skill ${skill.skillId}`,
            level: percentage,
            skillLevel: skillLevel,
            color: getSkillColor(skill.skillName || skill.name),
            projects: skill.projectsCount || Math.floor(Math.random() * 10) + 1,
            experience: skill.experienceYears ? `${skill.experienceYears} years` : getExperienceFromLevel(skillLevel),
            skillId: skill.skillId
          };
        });
        setSkills(formattedSkills);
      } else {
        // Default skills if none from API
        setSkills([
          { name: "React", level: 100, skillLevel: 3, color: "#61DAFB", projects: 5, experience: "2 years" },
          { name: "Node.js", level: 66, skillLevel: 2, color: "#68A063", projects: 4, experience: "1.5 years" },
          { name: "TypeScript", level: 66, skillLevel: 2, color: "#3178C6", projects: 3, experience: "1 year" },
          { name: "MongoDB", level: 66, skillLevel: 2, color: "#47A248", projects: 3, experience: "1 year" },
          { name: "Git", level: 100, skillLevel: 3, color: "#F05032", projects: 8, experience: "2 years" },
          { name: "Python", level: 33, skillLevel: 1, color: "#3776AB", projects: 2, experience: "6 months" },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch user skills:", error);
      setError(error.message || "Failed to load your skills. Please try again.");
      // Set default skills on error
      setSkills([
        { name: "React", level: 100, skillLevel: 3, color: "#61DAFB", projects: 5, experience: "2 years" },
        { name: "Node.js", level: 66, skillLevel: 2, color: "#68A063", projects: 4, experience: "1.5 years" },
        { name: "TypeScript", level: 66, skillLevel: 2, color: "#3178C6", projects: 3, experience: "1 year" },
        { name: "MongoDB", level: 66, skillLevel: 2, color: "#47A248", projects: 3, experience: "1 year" },
        { name: "Git", level: 100, skillLevel: 3, color: "#F05032", projects: 8, experience: "2 years" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getExperienceFromLevel = (level) => {
    switch(level) {
      case 1: return "6 months";
      case 2: return "1.5 years";
      case 3: return "3+ years";
      default: return "1 year";
    }
  };

  const fetchGapAnalysis = async () => {
    try {
      setGapAnalysisLoading(true);
      setGapAnalysisError(null);
      const gapData = await getGapAnalysis();
      
      console.log("Gap Analysis Data:", gapData);
      
      // Process missingSkills for Recommended Skills
      if (gapData.missingSkills && Array.isArray(gapData.missingSkills) && gapData.missingSkills.length > 0) {
        const formattedRecommended = gapData.missingSkills.map((skill, index) => ({
          name: skill.skillName || skill.name || `Skill ${skill.skillId}`,
          demand: skill.demand || `+${Math.floor(Math.random() * 30) + 30}%`,
          color: getSkillColor(skill.skillName || skill.name),
          skillId: skill.skillId,
          priority: skill.priority || index + 1,
          requiredLevel: skill.requiredLevel || 3
        }));
        setRecommendedSkills(formattedRecommended);
      } else {
        setRecommendedSkills([]);
      }
      
      // Process weakSkills for Areas to Improve
      if (gapData.weakSkills && Array.isArray(gapData.weakSkills) && gapData.weakSkills.length > 0) {
        const formattedWeakSkills = gapData.weakSkills.map((skill, index) => {
          // Convert proficiency level to consistent format
          let levelText = "medium";
          let priorityLevel = 2;
          
          if (skill.proficiencyLevel) {
            if (skill.proficiencyLevel <= 33) {
              levelText = "high";
              priorityLevel = 1;
            } else if (skill.proficiencyLevel <= 66) {
              levelText = "medium";
              priorityLevel = 2;
            } else {
              levelText = "low";
              priorityLevel = 3;
            }
          }
          
          return {
            name: skill.skillName || skill.name || `Skill ${skill.skillId}`,
            level: levelText,
            impact: skill.impact || "High",
            priority: skill.priority || priorityLevel,
            currentProficiency: skill.currentProficiency || 0,
            requiredProficiency: skill.requiredProficiency || 80,
            skillId: skill.skillId
          };
        });
        setWeakSkills(formattedWeakSkills);
      } else {
        setWeakSkills([]);
      }
    } catch (error) {
      console.error("Failed to fetch gap analysis:", error);
      setGapAnalysisError(error.message || "Failed to load skill recommendations");
      setRecommendedSkills([]);
      setWeakSkills([]);
    } finally {
      setGapAnalysisLoading(false);
    }
  };

  const getSkillColor = (skillName) => {
    const colors = {
      "React": "#61DAFB",
      "Node.js": "#68A063",
      "TypeScript": "#3178C6",
      "Python": "#3776AB",
      "JavaScript": "#F7DF1E",
      "MongoDB": "#47A248",
      "Docker": "#2496ED",
      "AWS": "#FF9900",
      "GraphQL": "#E10098",
      "Next.js": "#000000",
      "Redis": "#DC382D",
      "PostgreSQL": "#336791",
      "Git": "#F05032",
      "System Design": "#8B5CF6",
      "Testing": "#F59E0B",
      "CI/CD": "#10B981",
    };
    return colors[skillName] || "#0A5ADB";
  };

  const getPriorityColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'high':
      case 'critical':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getProficiencyGap = (skill) => {
    if (skill.currentProficiency && skill.requiredProficiency) {
      const gap = skill.requiredProficiency - skill.currentProficiency;
      return Math.max(0, gap);
    }
    return 25;
  };

  // Handle updating skill level
  const handleUpdateSkillLevel = async () => {
    if (!updateSkillId) {
      setUpdateSkillError("Invalid skill");
      return;
    }

    try {
      setUpdating(true);
      setUpdateSkillError("");
      setUpdateSkillSuccess("");

      // Get user profile to get current skills
      const profileData = await getUserProfile();
      const currentSkills = profileData.data.skills || [];
      
      // Update the specific skill level
      const updatedSkills = currentSkills.map(skill => {
        if (skill.skillId === updateSkillId) {
          return {
            ...skill,
            skillLevel: updateSkillLevel
          };
        }
        return skill;
      });

      const interestIds = profileData.data.interests?.map(i => i.interestId) || [];
      const careerGoalId = profileData.data.careerGoalId || 0;

      const updateData = {
        skills: updatedSkills,
        interestIds: interestIds,
        careerGoalId: careerGoalId
      };

      await updateUserProfileData(updateData);

      setUpdateSkillSuccess("✅ Skill level updated successfully!");
      
      setTimeout(() => {
        setShowUpdateModal(false);
        setUpdateSkillId(null);
        setUpdateSkillName("");
        setUpdateSkillLevel(1);
        setUpdateSkillSuccess("");
        fetchUserSkills();
        fetchGapAnalysis();
      }, 1500);

    } catch (err) {
      setUpdateSkillError(err.message || "Failed to update skill level");
    } finally {
      setUpdating(false);
    }
  };

  const handleAddRecommendedSkill = async () => {
    if (!addSkillId) {
      setAddSkillError("Invalid skill");
      return;
    }

    try {
      setAdding(true);
      setAddSkillError("");
      setAddSkillSuccess("");

      const profileData = await getUserProfile();
      const currentSkills = profileData.data.skills || [];
      
      const newSkill = {
        skillId: addSkillId,
        skillLevel: addSkillLevel
      };

      const updatedSkills = [...currentSkills, newSkill];

      const interestIds = profileData.data.interests?.map(i => i.interestId) || [];
      const careerGoalId = profileData.data.careerGoalId || 0;

      const updateData = {
        skills: updatedSkills,
        interestIds: interestIds,
        careerGoalId: careerGoalId
      };

      await updateUserProfileData(updateData);

      setAddSkillSuccess("✅ Skill added successfully!");
      
      setTimeout(() => {
        setShowAddModal(false);
        setAddSkillId(null);
        setAddSkillName("");
        setAddSkillLevel(1);
        setAddSkillSuccess("");
        fetchUserSkills();
        fetchGapAnalysis();
      }, 1500);

    } catch (err) {
      setAddSkillError(err.message || "Failed to add skill");
    } finally {
      setAdding(false);
    }
  };

  const openUpdateModal = (skill) => {
    setUpdateSkillId(skill.skillId);
    setUpdateSkillName(skill.name);
    setUpdateSkillLevel(skill.skillLevel);
    setUpdateSkillError("");
    setUpdateSkillSuccess("");
    setShowUpdateModal(true);
  };

  const openAddModal = (skill) => {
    setAddSkillId(skill.skillId);
    setAddSkillName(skill.name);
    setAddSkillLevel(1);
    setAddSkillError("");
    setAddSkillSuccess("");
    setShowAddModal(true);
  };

  const totalSkills = skills.length;
  const averageProficiency = skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + s.level, 0) / totalSkills) : 0;
  const expertLevel = skills.filter(s => s.skillLevel >= 3).length;

  if (loading) {
    return (
      <Box component="main" className={styles.skills_container}>
        <div className={styles.bg_blur_1}></div>
        <div className={styles.bg_blur_2}></div>
        <div className={styles.bg_blur_3}></div>
        <div className={styles.skills_content}>
          {/* Header Skeleton */}
          <div className={styles.header_section}>
            <div className={styles.header_left}>
              <Skeleton variant="rounded" width={60} height={60} sx={{ borderRadius: '20px' }} />
              <div>
                <Skeleton variant="text" width={250} height={45} />
                <Skeleton variant="text" width={200} height={24} />
              </div>
            </div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className={styles.stats_grid}>
            {[1, 2, 3].map((_, index) => (
              <div key={index} className={styles.stat_card}>
                <Skeleton variant="rounded" width={50} height={50} sx={{ borderRadius: '15px' }} />
                <div className={styles.stat_info}>
                  <Skeleton variant="text" width={60} height={32} />
                  <Skeleton variant="text" width={80} height={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Skills Section Skeleton */}
          <div className={styles.skills_section}>
            <div className={styles.section_header}>
              <div>
                <Skeleton variant="text" width={200} height={32} />
                <Skeleton variant="text" width={150} height={20} />
              </div>
            </div>
            <div className={styles.skills_list}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index} className={styles.skill_item}>
                  <div className={styles.skill_header}>
                    <div className={styles.skill_info}>
                      <div className={styles.skill_name_wrapper}>
                        <Skeleton variant="circular" width={10} height={10} />
                        <Skeleton variant="text" width={100} height={24} />
                      </div>
                      <div className={styles.skill_meta}>
                        <Skeleton variant="text" width={80} height={16} />
                        <Skeleton variant="text" width={80} height={16} />
                      </div>
                    </div>
                    <div className={styles.skill_percentage}>
                      <Skeleton variant="text" width={50} height={24} />
                      <Skeleton variant="text" width={70} height={20} />
                    </div>
                  </div>
                  <Skeleton variant="rounded" width="100%" height={8} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Grid Skeleton */}
          <div className={styles.bottom_grid_single}>
            <div className={styles.recommended_section}>
              <Skeleton variant="text" width={180} height={28} />
              <Skeleton variant="text" width={140} height={20} />
              <div className={styles.tags_container}>
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className={styles.tag_item}>
                    <Skeleton variant="text" width={120} height={20} />
                    <Skeleton variant="rounded" width={28} height={28} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Box>
    );
  }

  if (error && skills.length === 0) {
    return (
      <Box component="main" className={styles.skills_container}>
        <div className={styles.bg_blur_1}></div>
        <div className={styles.bg_blur_2}></div>
        <div className={styles.bg_blur_3}></div>
        <div className={styles.skills_content}>
          <div className={styles.error_container}>
            <Alert 
              severity="error" 
              className={styles.error_alert}
              action={
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => {
                    fetchUserSkills();
                    fetchGapAnalysis();
                  }}
                  startIcon={<RefreshIcon />}
                >
                  Retry
                </Button>
              }
            >
              <strong>Error loading skills:</strong> {error}
            </Alert>
          </div>
        </div>
      </Box>
    );
  }

  return (
    <Box component="main" className={styles.skills_container}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      {/* Error banner if partial error but still have skills */}
      {error && skills.length > 0 && (
        <div className={styles.error_banner}>
          <Alert severity="warning" className={styles.warning_alert}>
            {error} Showing cached/default data instead.
            <Button size="small" onClick={() => {
              fetchUserSkills();
              fetchGapAnalysis();
            }} sx={{ ml: 2 }}>
              Retry
            </Button>
          </Alert>
        </div>
      )}

      {/* Gap Analysis Error Banner */}
      {gapAnalysisError && (
        <div className={styles.error_banner}>
          <Alert severity="info" className={styles.info_alert}>
            {gapAnalysisError} Showing default recommendations.
            <Button size="small" onClick={fetchGapAnalysis} sx={{ ml: 2 }}>
              Retry
            </Button>
          </Alert>
        </div>
      )}

      <div className={styles.skills_content}>
        {/* Header Section */}
        <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.header_left}>
            <div className={styles.header_icon_wrapper}>
              <TrendingUpIcon className={styles.header_icon} />
            </div>
            <div>
              <h1 className={styles.header_title}>Skills Management</h1>
              <p className={styles.header_subtitle}>Track and improve your technical abilities</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.stats_grid}>
          <div className={`${styles.stat_card} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.stat_icon_wrapper} style={{ background: "rgba(10, 90, 219, 0.1)" }}>
              <SchoolIcon className={styles.stat_icon} style={{ color: "#0A5ADB" }} />
            </div>
            <div className={styles.stat_info}>
              <span className={styles.stat_value}>{totalSkills}</span>
              <span className={styles.stat_label}>Total Skills</span>
            </div>
          </div>

          <div className={`${styles.stat_card} ${animate ? styles.slide_up : ""}`} style={{ animationDelay: "0.1s" }}>
            <div className={styles.stat_icon_wrapper} style={{ background: "rgba(88, 167, 181, 0.1)" }}>
              <SpeedIcon className={styles.stat_icon} style={{ color: "#58A7B5" }} />
            </div>
            <div className={styles.stat_info}>
              <span className={styles.stat_value}>{averageProficiency}%</span>
              <span className={styles.stat_label}>Avg Proficiency</span>
            </div>
          </div>

          <div className={`${styles.stat_card} ${animate ? styles.slide_up : ""}`} style={{ animationDelay: "0.2s" }}>
            <div className={styles.stat_icon_wrapper} style={{ background: "rgba(102, 126, 234, 0.1)" }}>
              <StarIcon className={styles.stat_icon} style={{ color: "#667eea" }} />
            </div>
            <div className={styles.stat_info}>
              <span className={styles.stat_value}>{expertLevel}</span>
              <span className={styles.stat_label}>Expert Level</span>
            </div>
          </div>
        </div>

        {/* Your Skills Section */}
        <div className={`${styles.skills_section} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.section_header}>
            <div>
              <h2 className={styles.section_title}>Your Skills</h2>
              <p className={styles.section_subtitle}>Current proficiency levels</p>
            </div>
            <div className={styles.section_badge}>
              <span>Updated just now</span>
            </div>
          </div>

          <div className={styles.skills_list}>
            {skills.map((skill, index) => {
              const levelColor = getLevelColor(skill.skillLevel);
              const levelLabel = getLevelLabel(skill.skillLevel);
              
              return (
                <div 
                  key={skill.skillId || index} 
                  className={`${styles.skill_item} ${hoveredSkill === index ? styles.skill_item_hover : ""}`}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className={styles.skill_header}>
                    <div className={styles.skill_info}>
                      <div className={styles.skill_name_wrapper}>
                        <div className={styles.skill_dot} style={{ background: skill.color }}></div>
                        <span className={styles.skill_name}>{skill.name}</span>
                      </div>
                    </div>
                    <div className={styles.skill_percentage}>
                      <span className={styles.percentage_value}>{skill.level}%</span>
                      <span 
                        className={styles.percentage_label}
                        style={{ 
                          color: levelColor,
                          backgroundColor: `${levelColor}15`,
                          border: `1px solid ${levelColor}30`
                        }}
                      >
                        {levelLabel}
                      </span>
                      <button 
                        className={styles.edit_skill_btn}
                        onClick={() => openUpdateModal(skill)}
                        title="Update skill level"
                      >
                        <EditIcon />
                      </button>
                    </div>
                  </div>
                  <div className={styles.progress_bar_container}>
                    <div 
                      className={styles.progress_bar}
                      style={{ 
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${levelColor}, ${levelColor}cc)`
                      }}
                    >
                      <span className={styles.progress_percentage}>{skill.level}%</span>
                    </div>
                  </div>
                  {hoveredSkill === index && (
                    <div className={styles.skill_tooltip}>
                      <span>🏆 Level: {levelLabel}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Skills Section */}
        <div className={`${styles.recommended_section_full} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.section_header}>
            <div>
              <h2 className={styles.section_title}>Recommended Skills</h2>
              <p className={styles.section_subtitle}>
                {gapAnalysisLoading ? "Loading recommendations..." : "Skills that complement your profile"}
              </p>
            </div>
            {recommendedSkills.length > 0 && !gapAnalysisLoading && <span className={styles.trending_badge}>🔥 Trending</span>}
          </div>

          {gapAnalysisLoading ? (
            <div className={styles.loading_indicator}>
              <span>Updating recommendations...</span>
            </div>
          ) : recommendedSkills.length > 0 ? (
            <div className={styles.tags_container}>
              {recommendedSkills.map((item, i) => (
                <div key={i} className={styles.tag_item}>
                  <div className={styles.tag_content}>
                    <span className={styles.tag_name}>{item.name}</span>
                    <button 
                      className={styles.tag_add_btn}
                      onClick={() => openAddModal(item)}
                      title={`Add ${item.name}`}
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.max_reached_container}>
              <div className={styles.max_reached_icon}>🏆</div>
              <h3 className={styles.max_reached_title}>You've Reached the Peak!</h3>
              <p className={styles.max_reached_message}>
                Great job! You've mastered all recommended skills for your current track.
                Keep maintaining your expertise or explore new advanced pathways.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Update Skill Modal */}
      {showUpdateModal && (
        <div className={styles.modal_overlay} onClick={() => setShowUpdateModal(false)}>
          <div className={styles.modal_card} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modal_close} onClick={() => setShowUpdateModal(false)}>
              <CloseIcon />
            </button>
            
            <div className={styles.modal_header}>
              <div className={styles.modal_icon_wrapper} style={{ background: '#fff3e3' }}>
                <EditIcon style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <h3 className={styles.modal_title}>Update Skill Level</h3>
                <p className={styles.modal_subtitle}>Update your proficiency in <strong>{updateSkillName}</strong></p>
              </div>
            </div>

            <div className={styles.modal_body}>
              <div className={styles.modal_input_group}>
                <label>Skill Level: {getLevelLabel(updateSkillLevel)}</label>
                <select
                  value={updateSkillLevel}
                  onChange={(e) => setUpdateSkillLevel(parseInt(e.target.value))}
                  disabled={updating}
                  className={styles.modal_select}
                >
                  <option value={1}>1 - Beginner</option>
                  <option value={2}>2 - Intermediate</option>
                  <option value={3}>3 - Advanced</option>
                </select>
              </div>

              {updateSkillError && (
                <div className={styles.modal_error}>
                  <ErrorIcon />
                  <span>{updateSkillError}</span>
                </div>
              )}

              {updateSkillSuccess && (
                <div className={styles.modal_success}>
                  <CheckCircleIcon />
                  <span>{updateSkillSuccess}</span>
                </div>
              )}

              <button 
                className={styles.modal_submit_btn}
                onClick={handleUpdateSkillLevel}
                disabled={updating}
              >
                {updating ? "Updating..." : "Update Skill Level"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Recommended Skill Modal */}
      {showAddModal && (
        <div className={styles.modal_overlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal_card} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modal_close} onClick={() => setShowAddModal(false)}>
              <CloseIcon />
            </button>
            
            <div className={styles.modal_header}>
              <div className={styles.modal_icon_wrapper} style={{ background: '#d1fae5' }}>
                <AddIcon style={{ color: '#10b981' }} />
              </div>
              <div>
                <h3 className={styles.modal_title}>Add Recommended Skill</h3>
                <p className={styles.modal_subtitle}>Add <strong>{addSkillName}</strong> to your skill set</p>
              </div>
            </div>

            <div className={styles.modal_body}>
              <div className={styles.modal_input_group}>
                <label>Skill Level: {getLevelLabel(addSkillLevel)}</label>
                <select
                  value={addSkillLevel}
                  onChange={(e) => setAddSkillLevel(parseInt(e.target.value))}
                  disabled={adding}
                  className={styles.modal_select}
                >
                  <option value={1}>1 - Beginner</option>
                  <option value={2}>2 - Intermediate</option>
                  <option value={3}>3 - Advanced</option>
                </select>
              </div>

              {addSkillError && (
                <div className={styles.modal_error}>
                  <ErrorIcon />
                  <span>{addSkillError}</span>
                </div>
              )}

              {addSkillSuccess && (
                <div className={styles.modal_success}>
                  <CheckCircleIcon />
                  <span>{addSkillSuccess}</span>
                </div>
              )}

              <button 
                className={styles.modal_submit_btn}
                onClick={handleAddRecommendedSkill}
                disabled={adding}
              >
                {adding ? "Adding..." : "Add Skill"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default SkillsPage;