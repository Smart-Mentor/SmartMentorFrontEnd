import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import TimelineIcon from "@mui/icons-material/Timeline";
import styles from "./LearningPath.module.css";

import { 
  getUserProfile, 
  getGapAnalysis 
} from "../../api/authenticationService";

export default function LearningPath() {
  const [animate, setAnimate] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [overallProgress, setOverallProgress] = useState(0);
  const [gapAnalysisData, setGapAnalysisData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionProgress, setSectionProgress] = useState({});

  useEffect(() => {
    setAnimate(true);
    fetchUserProfileAndGapAnalysis();
  }, []);

  // Calculate overall progress 
  useEffect(() => {
    if (gapAnalysisData) {
      updateAllProgress();
    }
  }, [gapAnalysisData]);

  const fetchUserProfileAndGapAnalysis = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      // Fetch user profile
      const profileResult = await getUserProfile();
      
      if (!profileResult.success) {
        throw new Error(profileResult.message || 'Failed to load user profile');
      }

      setUserProfile(profileResult.data);
      
      // Fetch gap analysis data
      const gapData = await getGapAnalysis();
      setGapAnalysisData(gapData);
      setLoading(false);
      
    } catch (err) {
      setError(err.message || 'Failed to load data. Please try again.');
      setLoading(false);
    }
  };

  // Update all progress calculations based on user levels
  const updateAllProgress = () => {
    const sections = organizeSkillsIntoSections();
    const progress = {};
    let totalSkills = 0;
    let completedTotal = 0;
    
    sections.forEach(section => {
      let sectionCompleted = 0;
      section.skills.forEach(skill => {
        const isCompleted = skill.currentLevel && skill.currentLevel >= skill.requiredLevel;
        
        if (isCompleted) {
          sectionCompleted++;
          completedTotal++;
        }
        totalSkills++;
      });
      
      const percentage = section.skills.length > 0 
        ? Math.round((sectionCompleted / section.skills.length) * 100) 
        : 0;
      progress[section.id] = percentage;
    });
    
    setSectionProgress(progress);
    const overall = totalSkills > 0 ? Math.round((completedTotal / totalSkills) * 100) : 0;
    setOverallProgress(overall);
  };

  // Get color based on required level
  const getRequiredLevelColor = (requiredLevel) => {
    switch(requiredLevel) {
      case 1: return "#4caf50";
      case 2: return "#2196f3";
      case 3: return "#ff9800";
      default: return "#9e9e9e";
    }
  };

  // Get badge text based on required level
  const getLevelBadge = (requiredLevel) => {
    switch(requiredLevel) {
      case 1: return "Beginner";
      case 2: return "Intermediate";
      case 3: return "Advanced";
      default: return "Not Set";
    }
  };

  // Get skill level description
  const getSkillLevelDescription = (level) => {
    if (!level || level === 0) return "Not Started";
    switch(level) {
      case 1: return "Beginner";
      case 2: return "Intermediate";
      case 3: return "Advanced";
      default: return "Not Started";
    }
  };

  // Get current level color
  const getCurrentLevelColor = (currentLevel, requiredLevel) => {
    if (!currentLevel || currentLevel === 0) return "#9e9e9e";
    if (currentLevel >= requiredLevel) return "#10b981";
    switch(currentLevel) {
      case 1: return "#4caf50";
      case 2: return "#2196f3";
      case 3: return "#ff9800";
      default: return "#9e9e9e";
    }
  };

  // Get progress percentage 
  const getLevelProgress = (currentLevel, requiredLevel) => {
    if (!currentLevel || currentLevel === 0) return 0;
    return Math.min(100, (currentLevel / requiredLevel) * 100);
  };

  // Check if user can upgrade to a higher level
  const canUpgradeLevel = (currentLevel, requiredLevel) => {
    if (currentLevel >= requiredLevel) return false;
    if (currentLevel + 1 > requiredLevel) return false;
    return true;
  };

  // Get the maximum level allowed 
  const getMaxAllowedLevel = (requiredLevel) => {
    return requiredLevel;
  };

  // Get the maximum level to display 
  const getMaxLevelToShow = (requiredLevel) => {
    return requiredLevel; 
  };

  // Organize skills into categories and sections
  const organizeSkillsIntoSections = () => {
    if (!gapAnalysisData) return [];

    const sections = [];
    const fundamentalsSkills = [];
    const coreSkills = [];
    const advancedSkills = [];

    // Process missing skills
    if (gapAnalysisData.missingSkills) {
      gapAnalysisData.missingSkills.forEach(skill => {
        const isCompleted = skill.currentLevel && skill.currentLevel >= skill.requiredLevel;
        const skillData = {
          ...skill,
          type: 'missing',
          completed: isCompleted,
          currentLevel: skill.currentLevel || 0
        };
        
        if (skill.requiredLevel === 1) fundamentalsSkills.push(skillData);
        else if (skill.requiredLevel === 2) coreSkills.push(skillData);
        else if (skill.requiredLevel === 3) advancedSkills.push(skillData);
      });
    }

    // Process weak skills
    if (gapAnalysisData.weakSkills) {
      gapAnalysisData.weakSkills.forEach(skill => {
        const isCompleted = skill.currentLevel && skill.currentLevel >= skill.requiredLevel;
        const skillData = {
          ...skill,
          type: 'weak',
          completed: isCompleted,
          currentLevel: skill.currentLevel || 0
        };
        
        if (skill.requiredLevel === 1) fundamentalsSkills.push(skillData);
        else if (skill.requiredLevel === 2) coreSkills.push(skillData);
        else if (skill.requiredLevel === 3) advancedSkills.push(skillData);
      });
    }

    // Process ready skills 
    if (gapAnalysisData.readySkills) {
      gapAnalysisData.readySkills.forEach(skill => {
        const skillData = {
          ...skill,
          type: 'ready',
          completed: true,
          currentLevel: skill.currentLevel || skill.requiredLevel
        };
        
        if (skill.requiredLevel === 1) fundamentalsSkills.push(skillData);
        else if (skill.requiredLevel === 2) coreSkills.push(skillData);
        else if (skill.requiredLevel === 3) advancedSkills.push(skillData);
      });
    }

    if (fundamentalsSkills.length > 0) {
      sections.push({
        id: "fundamentals",
        title: "Fundamentals",
        icon: "🎯",
        color: "#0A5ADB",
        description: "Master the essential building blocks of development",
        skills: fundamentalsSkills,
        pointsPerSkill: 100,
        progress: sectionProgress.fundamentals || 0
      });
    }

    if (coreSkills.length > 0) {
      sections.push({
        id: "core",
        title: "Core Skills",
        icon: "⚛️",
        color: "#58A7B5",
        description: "Build modern applications with industry-standard tools",
        skills: coreSkills,
        pointsPerSkill: 150,
        progress: sectionProgress.core || 0
      });
    }

    if (advancedSkills.length > 0) {
      sections.push({
        id: "advanced",
        title: "Advanced Topics",
        icon: "🚀",
        color: "#667eea",
        description: "Take your skills to the next level",
        skills: advancedSkills,
        pointsPerSkill: 200,
        progress: sectionProgress.advanced || 0
      });
    }

    return sections;
  };

  // Calculate section percentage
  const calculateSectionPercentage = (section) => {
    return section.progress || 0;
  };

  // Calculate total points earned
  const calculateTotalPoints = () => {
    const sections = organizeSkillsIntoSections();
    let totalPoints = 0;
    let earnedPoints = 0;
    
    sections.forEach(section => {
      section.skills.forEach(skill => {
        totalPoints += section.pointsPerSkill;
        if (skill.completed) {
          earnedPoints += section.pointsPerSkill;
        }
      });
    });
    
    return { earnedPoints, totalPoints };
  };

  // Calculate section points
  const calculateSectionPoints = (section) => {
    let totalPoints = 0;
    let earnedPoints = 0;
    
    section.skills.forEach(skill => {
      totalPoints += section.pointsPerSkill;
      if (skill.completed) {
        earnedPoints += section.pointsPerSkill;
      }
    });
    
    return { earnedPoints, totalPoints };
  };

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getCompletedCount = (section) => {
    return section.skills.filter(skill => skill.completed).length;
  };

  if (loading) {
    return (
      <Box className={styles.loading_container}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={styles.error_container}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
        <Box mt={2}>
          <Alert severity="info">
            Please make sure you're logged in and have completed a skills assessment.
          </Alert>
        </Box>
      </Box>
    );
  }

  if (!gapAnalysisData || !gapAnalysisData.careerGoalName) {
    return (
      <Box className={styles.error_container}>
        <Alert severity="info">
          No gap analysis data available for {userProfile?.careerGoalName || 'your career goal'}. 
          Please complete a skills assessment first.
        </Alert>
      </Box>
    );
  }

  const titles = organizeSkillsIntoSections();
  const { earnedPoints, totalPoints } = calculateTotalPoints();
  const pointsPercentage = Math.round((earnedPoints / totalPoints) * 100) || 0;
  const apiProgress = Math.round(gapAnalysisData?.statusOfTheGapAnalysis?.completionPercentage || overallProgress);

  const achievements = [
    { icon: "⭐", title: "Points", value: `${earnedPoints}/${totalPoints}`, color: "#10b981" },
    { icon: "📚", title: "Skills Completed", value: `${titles.reduce((acc, section) => acc + getCompletedCount(section), 0)}/${titles.reduce((acc, section) => acc + section.skills.length, 0)}`, color: "#0A5ADB" },
  ];

  return (
    <Box component="main" className={styles.learning_path_container}>
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.learning_path_content}>
        {/* Header Section */}
        <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.header_left}>
            <div className={styles.header_icon_wrapper}>
              <SchoolIcon className={styles.header_icon} />
            </div>
            <div>
              <h1 className={styles.header_title}>Your Learning Path</h1>
              <p className={styles.header_subtitle}>{gapAnalysisData.careerGoalName}</p>
            </div>
          </div>
        </div>

        {/* User Interests Section */}
        {userProfile?.interests && userProfile.interests.length > 0 && (
          <div className={styles.interests_section}>
            <div className={styles.interests_content}>
              <span className={styles.interests_icon}>🎯</span>
              <div className={styles.interests_info}>
                <span className={styles.interests_label}>Your Interests:</span>
                <div className={styles.interests_tags}>
                  {userProfile.interests.map(interest => (
                    <span key={interest.interestId} className={styles.interest_tag}>
                      {interest.interestName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Row */}
        <div className={styles.achievements_row}>
          {achievements.map((ach, idx) => (
            <div key={idx} className={styles.achievement_card} style={{ borderBottomColor: ach.color }}>
              <span className={styles.achievement_emoji}>{ach.icon}</span>
              <div className={styles.achievement_info}>
                <span className={styles.achievement_value}>{ach.value}</span>
                <span className={styles.achievement_title}>{ach.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Progress Card */}
        <div className={`${styles.overall_card} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.overall_header}>
            <div className={styles.overall_title_wrapper}>
              <TimelineIcon className={styles.overall_icon} />
              <div>
                <h2 className={styles.overall_title}>Overall Progress</h2>
                <p className={styles.overall_message}>
                  {apiProgress === 100 ? "🎉 Congratulations! You've completed everything!" : "Keep going! You're making great progress!"}
                </p>
              </div>
            </div>
            <div className={styles.overall_percentage}>
              <span className={styles.percentage_value}>{apiProgress}%</span>
              <span className={styles.percentage_label}>Complete</span>
            </div>
          </div>
          
          <div className={styles.progress_bar_container}>
            <div 
              className={styles.progress_bar}
              style={{ width: `${apiProgress}%` }}
            >
              <span className={styles.progress_percentage}>{apiProgress}%</span>
            </div>
          </div>
          
          <div className={styles.overall_footer}>
            <span className={styles.milestone_text}>
              🎯 {apiProgress < 30 ? "Next milestone: 30%" : apiProgress < 60 ? "Next milestone: 60%" : apiProgress < 100 ? "Next milestone: 100%" : "🏆 Fully completed!"}
            </span>
            <span className={styles.courses_left}>
              📚 {titles.reduce((acc, section) => acc + (section.skills.length - getCompletedCount(section)), 0)} skills remaining
            </span>
          </div>
        </div>

        {/* Learning Sections */}
        {titles.map((section, index) => {
          const sectionPercentage = calculateSectionPercentage(section);
          const { earnedPoints: sectionEarned, totalPoints: sectionTotal } = calculateSectionPoints(section);
          const completedCount = getCompletedCount(section);
          
          return (
            <div 
              key={index} 
              className={`${styles.learning_section} ${animate ? styles.slide_up : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.section_header} onClick={() => toggleSection(section.id)}>
                <div className={styles.section_title_wrapper}>
                  <div className={styles.section_icon} style={{ background: `${section.color}15` }}>
                    <span>{section.icon}</span>
                  </div>
                  <div className={styles.section_info}>
                    <div className={styles.section_title_row}>
                      <h3 className={styles.section_title}>{section.title}</h3>
                      <span className={styles.section_percentage}>{sectionPercentage}%</span>
                    </div>
                    <p className={styles.section_description}>{section.description}</p>
                  </div>
                </div>
                <div className={styles.section_actions}>
                  <div className={styles.progress_circle}>
                    <svg className={styles.circular_progress} viewBox="0 0 36 36">
                      <path
                        className={styles.circular_bg}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={styles.circular_fill}
                        stroke={section.color}
                        strokeDasharray={`${sectionPercentage}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.5" className={styles.circular_text}>
                        {sectionPercentage}%
                      </text>
                    </svg>
                  </div>
                  {expandedSections[section.id] ? (
                    <ExpandLessIcon className={styles.expand_icon} />
                  ) : (
                    <ExpandMoreIcon className={styles.expand_icon} />
                  )}
                </div>
              </div>

              <div className={`${styles.progress_bar_section} ${expandedSections[section.id] ? styles.expanded : ""}`}>
                <div className={styles.progress_bar_container}>
                  <div 
                    className={styles.progress_bar}
                    style={{ 
                      width: `${sectionPercentage}%`,
                      background: `linear-gradient(90deg, ${section.color}, ${section.color === "#0A5ADB" ? "#58A7B5" : section.color === "#58A7B5" ? "#0A5ADB" : "#764ba2"})`
                    }}
                  >
                    <span className={styles.progress_percentage_small}>{sectionPercentage}%</span>
                  </div>
                </div>
                <div className={styles.points_info}>
                  <span>📊 {sectionEarned}/{sectionTotal} points earned</span>
                </div>
              </div>

              <div className={`${styles.checks_container} ${expandedSections[section.id] ? styles.expanded : ""}`}>
                {section.skills.map((skill) => {
                  const isCompleted = skill.completed;
                  const levelProgress = getLevelProgress(skill.currentLevel, skill.requiredLevel);
                  const requiredLevelColor = getRequiredLevelColor(skill.requiredLevel);
                  const currentLevelColor = getCurrentLevelColor(skill.currentLevel, skill.requiredLevel);
                  const levelBadge = getLevelBadge(skill.requiredLevel);
                  const maxLevelToShow = getMaxLevelToShow(skill.requiredLevel);
                  const maxAllowedLevel = getMaxAllowedLevel(skill.requiredLevel);
                  const canUpgrade = canUpgradeLevel(skill.currentLevel, skill.requiredLevel);
                  
                  return (
                    <div key={skill.skillId} className={`${styles.check_item} ${isCompleted ? styles.completed : ""}`}>
                      <div className={styles.check_content}>
                        <div className={styles.skill_header}>
                          <span className={styles.skill_name}>{skill.skillName}</span>
                          {!canUpgrade && skill.currentLevel >= skill.requiredLevel && (
                            <div className={styles.level_limit_badge}>
                              <span>✓ Max Level Reached</span>
                            </div>
                          )}
                        </div>
                        
                        <div className={styles.levels_container}>
                          <div className={styles.level_section}>
                            <div className={styles.level_label}>Required Level:</div>
                            <div className={styles.level_dots}>
                              {[...Array(maxLevelToShow)].map((_, index) => {
                                const level = index + 1;
                                return (
                                  <div
                                    key={level}
                                    className={`${styles.level_dot} ${skill.requiredLevel >= level ? styles.active_dot : ''}`}
                                    style={{ 
                                      background: skill.requiredLevel >= level ? requiredLevelColor : '#e0e0e0'
                                    }}
                                  >
                                    {level}
                                  </div>
                                );
                              })}
                            </div>
                            <div className={styles.level_badge} style={{ color: requiredLevelColor }}>
                              {levelBadge}
                            </div>
                          </div>
                          
                          <div className={styles.level_section}>
                            <div className={styles.level_label}>Your Level:</div>
                            <div className={styles.level_dots}>
                              {[...Array(maxLevelToShow)].map((_, index) => {
                                const level = index + 1;
                                const isActive = skill.currentLevel >= level;
                                const isDisabled = level > maxAllowedLevel;
                                return (
                                  <div
                                    key={level}
                                    className={`${styles.level_dot} ${isActive ? styles.active_dot : ''} ${isDisabled ? styles.disabled_dot : ''}`}
                                    style={{ 
                                      background: isActive ? currentLevelColor : '#e0e0e0',
                                      cursor: !isDisabled && canUpgrade ? 'pointer' : 'default',
                                      opacity: isDisabled ? 0.5 : 1
                                    }}
                                    onClick={() => {
                                      if (!isDisabled && canUpgrade && level === skill.currentLevel + 1) {
                                        console.log(`Upgrading ${skill.skillName} to level ${level}`);
                                      }
                                    }}
                                  >
                                    {level}
                                  </div>
                                );
                              })}
                            </div>
                            <div className={styles.level_badge} style={{ color: currentLevelColor }}>
                              {getSkillLevelDescription(skill.currentLevel)}
                              {canUpgrade && skill.currentLevel < skill.requiredLevel && (
                                <span className={styles.upgrade_hint}></span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className={styles.progress_section}>
                          <div className={styles.progress_label}>
                            <span>Progress to Required Level:</span>
                            <span className={styles.progress_percentage_text}>{Math.round(levelProgress)}%</span>
                          </div>
                          <div className={styles.level_progress_bar_bg}>
                            <div 
                              className={styles.level_progress_bar_fill}
                              style={{ 
                                width: `${levelProgress}%`,
                                background: `linear-gradient(90deg, ${currentLevelColor}, ${requiredLevelColor})`
                              }}
                            />
                          </div>
                        </div>
                        
                        {!isCompleted && skill.currentLevel < skill.requiredLevel && (
                          <div className={styles.improvement_needed}>
                            <span>⚠️ Need to improve to {getSkillLevelDescription(skill.requiredLevel)} level</span>
                          </div>
                        )}
                        
                        {skill.currentLevel >= skill.requiredLevel && (
                          <div className={styles.mastered_message}>
                            <span>🎉 You have mastered this skill!</span>
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.check_right}>
                        <div className={styles.points_section}>
                          <span className={styles.check_points}>+{section.pointsPerSkill} pts</span>
                        </div>
                        <div className={styles.status_badge}>
                          {isCompleted ? (
                            <span className={styles.mastered_status}>✓ Mastered</span>
                          ) : (
                            <span className={styles.pending_status}>In Progress</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.section_footer}>
                <div className={styles.footer_stats}>
                  <span>✅ {completedCount}/{section.skills.length} mastered</span>
                  <span>⏱️ Estimated: {(section.skills.length - completedCount) * 4} hours to complete</span>
                  <span>🎯 {sectionPercentage}% complete</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Motivation Message */}
        {apiProgress > 0 && apiProgress < 100 && (
          <div className={styles.motivation_section}>
            <div className={styles.motivation_content}>
              <span className={styles.motivation_icon}>💪</span>
              <p className={styles.motivation_text}>
                You're {apiProgress}% of the way there! Keep improving your skills!
              </p>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}