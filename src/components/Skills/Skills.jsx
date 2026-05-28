import React, { useState, useEffect } from "react";
import { Box, Skeleton, Alert, Button } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SchoolIcon from "@mui/icons-material/School";
import SpeedIcon from "@mui/icons-material/Speed";
import StarIcon from "@mui/icons-material/Star";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getUserProfile, getGapAnalysis } from "../../api/authenticationService";
import styles from "./Skills.module.css";

const SkillsPage = () => {
  const [animate, setAnimate] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New states for gap analysis
  const [recommendedSkills, setRecommendedSkills] = useState([]);
  const [weakSkills, setWeakSkills] = useState([]);
  const [gapAnalysisLoading, setGapAnalysisLoading] = useState(false);
  const [gapAnalysisError, setGapAnalysisError] = useState(null);

  // Consistent level colors matching Profile page
  const getLevelColor = (level) => {
    switch(level) {
      case 1: return "#10b981";  // Beginner - Green
      case 2: return "#f59e0b";  // Intermediate - Orange
      case 3: return "#0A5ADB";  // Advanced - Blue
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
          // Get skill level (1-3) from API
          const skillLevel = skill.skillLevel || 1;
          // Convert to percentage for display (1=33%, 2=66%, 3=100%)
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
      // Set default skills on error to still show something
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
      if (gapData.missingSkills && Array.isArray(gapData.missingSkills)) {
        const formattedRecommended = gapData.missingSkills.map((skill, index) => ({
          name: skill.skillName || skill.name || `Skill ${skill.skillId}`,
          demand: skill.demand || `+${Math.floor(Math.random() * 30) + 30}%`,
          color: getSkillColor(skill.skillName || skill.name),
          skillId: skill.skillId,
          priority: skill.priority || index + 1
        }));
        setRecommendedSkills(formattedRecommended);
      } else {
        // Default recommended skills if none from API
        setRecommendedSkills([
          { name: "GraphQL", demand: "+45%", color: "#E10098" },
          { name: "Next.js", demand: "+52%", color: "#000000" },
          { name: "Redis", demand: "+38%", color: "#DC382D" },
          { name: "PostgreSQL", demand: "+41%", color: "#336791" },
          { name: "AWS", demand: "+55%", color: "#FF9900" },
          { name: "Docker", demand: "+48%", color: "#2496ED" },
        ]);
      }
      
      // Process weakSkills for Areas to Improve
      if (gapData.weakSkills && Array.isArray(gapData.weakSkills)) {
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
        // Default weak skills if none from API
        setWeakSkills([
          { name: "System Design", level: "high", impact: "Critical", priority: 1 },
          { name: "Testing", level: "medium", impact: "High", priority: 2 },
          { name: "CI/CD", level: "medium", impact: "High", priority: 3 },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch gap analysis:", error);
      setGapAnalysisError(error.message || "Failed to load skill recommendations");
      // Set default data on error
      setRecommendedSkills([
        { name: "GraphQL", demand: "+45%", color: "#E10098" },
        { name: "Next.js", demand: "+52%", color: "#000000" },
        { name: "Redis", demand: "+38%", color: "#DC382D" },
        { name: "PostgreSQL", demand: "+41%", color: "#336791" },
        { name: "AWS", demand: "+55%", color: "#FF9900" },
        { name: "Docker", demand: "+48%", color: "#2496ED" },
      ]);
      setWeakSkills([
        { name: "System Design", level: "high", impact: "Critical", priority: 1 },
        { name: "Testing", level: "medium", impact: "High", priority: 2 },
        { name: "CI/CD", level: "medium", impact: "High", priority: 3 },
      ]);
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
    return 25; // Default gap
  };

  const totalSkills = skills.length;
  const averageProficiency = skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + s.level, 0) / totalSkills) : 0;
  const expertLevel = skills.filter(s => s.skillLevel >= 3).length;

  // Loading component
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
          <div className={styles.bottom_grid}>
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
            <div className={styles.improve_section}>
              <Skeleton variant="text" width={180} height={28} />
              <Skeleton variant="text" width={140} height={20} />
              <div className={styles.improve_list}>
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className={styles.improve_item}>
                    <div>
                      <Skeleton variant="text" width={120} height={20} />
                      <Skeleton variant="text" width={100} height={16} />
                    </div>
                    <Skeleton variant="rounded" width={120} height={36} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Box>
    );
  }

  // Error component
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
                      <div className={styles.skill_meta}>
                        <span className={styles.skill_projects}>📁 {skill.projects} projects</span>
                        <span className={styles.skill_experience}>⏱️ {skill.experience}</span>
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

        {/* Bottom Section */}
        <div className={styles.bottom_grid}>
          {/* Recommended Skills - from missingSkills */}
          <div className={`${styles.recommended_section} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.section_header}>
              <div>
                <h2 className={styles.section_title}>Recommended Skills</h2>
                <p className={styles.section_subtitle}>
                  {gapAnalysisLoading ? "Loading recommendations..." : "Skills that complement your profile"}
                </p>
              </div>
              <span className={styles.trending_badge}>🔥 Trending</span>
            </div>

            <div className={styles.tags_container}>
              {recommendedSkills.map((item, i) => (
                <div key={i} className={styles.tag_item}>
                  <div className={styles.tag_content}>
                    <span className={styles.tag_name}>{item.name}</span>
                    <span className={styles.tag_demand}>{item.demand}</span>
                  </div>
                </div>
              ))}
            </div>
            {gapAnalysisLoading && (
              <div className={styles.loading_indicator}>
                <span>Updating recommendations...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SkillsPage;