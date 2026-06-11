import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import styles from "./GapAnalysis.module.css";

const GapAnalysis = () => {
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gapData, setGapData] = useState(null);

  // API endpoint
  const API_URL = "https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/gapanalysis/gap-analysis";
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    setAnimate(true);
    fetchGapAnalysisData();
  }, []);

  const fetchGapAnalysisData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGapData(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching gap analysis data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine skill category
  const getSkillCategory = (skillName) => {
    const categories = {
      "React": "Frontend",
      "Angular": "Frontend",
      "Vue": "Frontend",
      "JavaScript": "Frontend",
      "TypeScript": "Frontend",
      "HTML": "Frontend",
      "CSS": "Frontend",
      "Node.js": "Backend",
      "Python": "Backend",
      "Java": "Backend",
      "C#": "Backend",
      "PHP": "Backend",
      "Ruby": "Backend",
      "SQL": "Database",
      "PostgreSQL": "Database",
      "MongoDB": "Database",
      "MySQL": "Database",
      "Redis": "Database",
      "Docker": "DevOps",
      "Kubernetes": "DevOps",
      "AWS": "DevOps",
      "Azure": "DevOps",
      "Jenkins": "DevOps",
      "Git": "DevOps",
      "Jest": "Testing",
      "Mocha": "Testing",
      "Cypress": "Testing",
      "Selenium": "Testing",
      "TensorFlow": "AI",
      "PyTorch": "AI",
      "scikit-learn": "AI"
    };
    return categories[skillName] || "Backend";
  };

  // Helper function to determine priority based on percentage
  const getPriority = (percentage) => {
    if (percentage < 30) return "High";
    if (percentage < 70) return "Medium";
    return "Low";
  };

  // Helper function to estimate time based on skill
  const getTimeEstimate = (skillName) => {
    const estimates = {
      "Docker": "2 months",
      "Kubernetes": "3 months",
      "AWS": "3 months",
      "Python": "1 month",
      "Node.js": "2 months",
      "React": "2 months",
      "SQL": "1 month",
      "Testing": "1.5 months",
      "System Design": "4 months",
      "GraphQL": "1 month",
      "Redis": "2 weeks"
    };
    return estimates[skillName] || "2 months";
  };

  // Transform API data to match UI requirements
  const transformSkillsData = () => {
    if (!gapData) {
      return {
        missingSkills: [],
        needsImprovement: [],
        strongSkills: [],
        topSkillsComparison: [],
        matchScore: 0,
        radarData: {
          labels: [],
          current: [],
          required: []
        }
      };
    }

    // Map ready skills (skills you already have)
    const strongSkills = gapData.readySkills?.map(skill => ({
      name: skill.skillName,
      level: (skill.currentLevel / ((skill.currentLevel > skill.requiredLevel) ? skill.currentLevel : skill.requiredLevel)) * 100,
      category: getSkillCategory(skill.skillName),
      currentLevel: skill.currentLevel,
      requiredLevel: (skill.currentLevel > skill.requiredLevel) ? skill.currentLevel : skill.requiredLevel
    })) || [];

    // Map weak skills (need improvement)
    const needsImprovement = gapData.weakSkills?.map(skill => ({
      name: skill.skillName,
      current: (skill.currentLevel / skill.requiredLevel) * 100,
      required: 100,
      gap: 100 - ((skill.currentLevel / skill.requiredLevel) * 100),
      priority: getPriority((skill.currentLevel / skill.requiredLevel) * 100),
      timeEstimate: getTimeEstimate(skill.skillName),
      category: getSkillCategory(skill.skillName),
      currentLevel: skill.currentLevel,
      requiredLevel: skill.requiredLevel
    })) || [];

    // Map missing skills
    const missingSkills = gapData.missingSkills?.map(skill => ({
      name: skill.skillName,
      current: 0,
      required: 100,
      gap: 100,
      priority: "High",
      timeEstimate: getTimeEstimate(skill.skillName),
      category: getSkillCategory(skill.skillName),
      currentLevel: 0,
      requiredLevel: skill.requiredLevel
    })) || [];

    // Prepare top skills comparison
    const topSkillsComparison = [
      ...strongSkills.map(skill => ({
        name: skill.name,
        current: Math.round(skill.level),
        required: 100,
        gap: Math.round(100 - skill.level),
        status: skill.level >= 80 ? "success" : skill.level >= 60 ? "warning" : "error",
        message: skill.level >= 80 ? "On Track" : skill.level >= 60 ? "Needs Improvement" : "Critical Gap"
      })),
      ...needsImprovement.map(skill => ({
        name: skill.name,
        current: Math.round(skill.current),
        required: 100,
        gap: Math.round(skill.gap),
        status: "warning",
        message: `${Math.round(skill.gap)}% gap`
      }))
    ];

    // ====== DYNAMIC RADAR DATA CALCULATION ======
    // Combine all skills from API
    const allSkills = [
      ...strongSkills.map(s => ({
        name: s.name,
        category: s.category,
        currentLevel: s.currentLevel,
        requiredLevel: s.requiredLevel
      })),
      ...needsImprovement.map(s => ({
        name: s.name,
        category: s.category,
        currentLevel: s.currentLevel,
        requiredLevel: s.requiredLevel
      })),
      ...missingSkills.map(s => ({
        name: s.name,
        category: s.category,
        currentLevel: s.currentLevel,
        requiredLevel: s.requiredLevel
      }))
    ];

    // Create skill-based radar data (instead of category-based)
    // Get unique skill names for radar chart labels
    const skillMap = {};
    allSkills.forEach(skill => {
      if (!skillMap[skill.name]) {
        skillMap[skill.name] = {
          currentLevel: skill.currentLevel,
          requiredLevel: skill.requiredLevel
        };
      }
    });

    // Sort skills by importance (missing skills first, then by required level)
    const sortedSkills = Object.entries(skillMap)
      .sort((a, b) => {
        const aIsMissing = a[1].currentLevel === 0;
        const bIsMissing = b[1].currentLevel === 0;
        if (aIsMissing && !bIsMissing) return -1;
        if (!aIsMissing && bIsMissing) return 1;
        return b[1].requiredLevel - a[1].requiredLevel;
      });

    // Calculate radar data based on skills
    const radarLabels = sortedSkills.map(([skillName]) => skillName);
    const radarCurrent = sortedSkills.map(([_, skill]) => {
      const percentage = (skill.currentLevel / skill.requiredLevel) * 100;
      return Math.round(Math.min(percentage, 100)); // Cap at 100%
    });
    
    const radarRequired = sortedSkills.map(() => 100); // Required is always 100%

    // If no skills exist, show empty radar
    if (radarLabels.length === 0) {
      return {
        missingSkills,
        needsImprovement,
        strongSkills,
        topSkillsComparison: topSkillsComparison,
        matchScore: gapData.statusOfTheGapAnalysis?.completionPercentage || 0,
        readinessLevel: gapData.statusOfTheGapAnalysis?.readinessLevel || "Not Ready",
        careerGoalName: gapData.careerGoalName || "Backend Developer",
        radarData: {
          labels: [],
          current: [],
          required: []
        }
      };
    }

    return {
      missingSkills,
      needsImprovement,
      strongSkills,
      topSkillsComparison: topSkillsComparison,
      matchScore: Math.round(gapData.statusOfTheGapAnalysis?.completionPercentage || 0),
      readinessLevel: gapData.statusOfTheGapAnalysis?.readinessLevel || "Not Ready",
      careerGoalName: gapData.careerGoalName || "Backend Developer",
      radarData: {
        labels: radarLabels,
        current: radarCurrent,
        required: radarRequired
      }
    };
  };

  const transformedData = transformSkillsData();
  const {
    missingSkills,
    needsImprovement,
    strongSkills,
    topSkillsComparison,
    matchScore,
    readinessLevel,
    careerGoalName,
    radarData
  } = transformedData;

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#dc2626';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityBg = (priority) => {
    switch(priority) {
      case 'High': return '#fee2e2';
      case 'Medium': return '#fff3e3';
      case 'Low': return '#d1fae5';
      default: return '#f3f4f6';
    }
  };

  const getReadinessColor = () => {
    switch(readinessLevel) {
      case 'job Ready': return '#10b981';
      case 'Almost Ready': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error" action={
          <button onClick={fetchGapAnalysisData} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            Retry
          </button>
        }>
          Failed to load gap analysis data: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box component="main" className={styles.gap_analysis_container}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.gap_analysis_content}>
        {/* Header Section */}
        <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.header_left}>
            <div className={styles.header_icon_wrapper}>
              <AnalyticsIcon className={styles.header_icon} />
            </div>
            <div>
              <h1 className={styles.header_title}>Skills Gap Analysis</h1>
              <p className={styles.header_subtitle}>
                Compare your current skills with requirements for <strong>{careerGoalName}</strong>
              </p>
            </div>
          </div>
          <div className={styles.header_right}>
            <div className={styles.readiness_badge} style={{ background: `${getReadinessColor()}20`, color: getReadinessColor() }}>
              {readinessLevel}
            </div>
          </div>
        </div>

        {/* Overall Match Score */}
        <div className={`${styles.match_score_card} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.match_score_content}>
            <div className={styles.match_score_left}>
              <div className={styles.match_score_circle}>
                <svg viewBox="0 0 120 120" className={styles.match_svg}>
                  <circle
                    className={styles.match_bg}
                    cx="60"
                    cy="60"
                    r="54"
                  />
                  <circle
                    className={styles.match_progress}
                    cx="60"
                    cy="60"
                    r="54"
                    strokeDasharray={`${(matchScore / 100) * 339.292}, 339.292`}
                  />
                </svg>
                <div className={styles.match_score_text}>
                  <span className={styles.match_percentage}>{matchScore}%</span>
                  <span className={styles.match_label}>Match Score</span>
                </div>
              </div>
            </div>
            <div className={styles.match_score_right}>
              <h3 className={styles.match_title}>
                {matchScore >= 80 ? "Excellent! You're almost there!" : 
                 matchScore >= 60 ? "You're on the right track!" : 
                 "Keep working on your skills!"}
              </h3>
              <p className={styles.match_description}>
                {gapData?.statusOfTheGapAnalysis?.readyCount || 0} skills mastered, 
                {gapData?.statusOfTheGapAnalysis?.weakcount || 0} need improvement, 
                {gapData?.statusOfTheGapAnalysis?.missingcount || 0} missing
              </p>
              <div className={styles.match_footer}>
                <span className={styles.match_badge}>🎯 {missingSkills.length + needsImprovement.length} skills to improve</span>
                <span className={styles.match_badge}>⭐ Readiness: {readinessLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT: Skills Radar + Top Skills Comparison - Same Height */}
        <div className={styles.two_column_row}>
          {/* Skills Radar Section */}
          <div className={`${styles.radar_section} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.section_header}>
              <div className={styles.section_title_wrapper}>
                <TrendingUpIcon className={styles.section_icon} />
                <div>
                  <h2 className={styles.section_title}>Skills Radar</h2>
                  <p className={styles.section_subtitle}>Visual comparison across key areas</p>
                </div>
              </div>
              <div className={styles.legend}>
                <div className={styles.legend_item}>
                  <div className={styles.legend_color_current}></div>
                  <span>Current</span>
                </div>
                <div className={styles.legend_item}>
                  <div className={styles.legend_color_required}></div>
                  <span>Required</span>
                </div>
              </div>
            </div>

            <div className={styles.radar_container}>
              {radarData.labels.length > 0 ? (
                <svg viewBox="0 0 220 220" className={styles.radar_svg}>
                  {/* Background grid */}
                  {[20, 40, 60, 80, 100].map((level, idx) => {
                    const radius = (level / 100) * 90;
                    return (
                      <polygon
                        key={idx}
                        points={radarData.labels.map((_, i) => {
                          const angle = (-Math.PI / 2) + (i * 2 * Math.PI / radarData.labels.length);
                          const x = 110 + radius * Math.cos(angle);
                          const y = 110 + radius * Math.sin(angle);
                          return `${x},${y}`;
                        }).join(' ')}
                        className={styles.radar_grid}
                        fill="none"
                        stroke="#e0e0e0"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                  
                  {/* Axis lines */}
                  {radarData.labels.map((_, i) => {
                    const angle = (-Math.PI / 2) + (i * 2 * Math.PI / radarData.labels.length);
                    const x = 110 + 95 * Math.cos(angle);
                    const y = 110 + 95 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1="110"
                        y1="110"
                        x2={x}
                        y2={y}
                        className={styles.radar_axis}
                        stroke="#e0e0e0"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                  
                  {/* Current skills polygon */}
                  <polygon
                    points={radarData.current.map((value, i) => {
                      const radius = (value / 100) * 90;
                      const angle = (-Math.PI / 2) + (i * 2 * Math.PI / radarData.labels.length);
                      const x = 110 + radius * Math.cos(angle);
                      const y = 110 + radius * Math.sin(angle);
                      return `${x},${y}`;
                    }).join(' ')}
                    className={styles.radar_current}
                    fill="rgba(10, 90, 219, 0.2)"
                    stroke="#0A5ADB"
                    strokeWidth="2"
                  />
                  
                  {/* Required skills polygon */}
                  <polygon
                    points={radarData.required.map((value, i) => {
                      const radius = (value / 100) * 90;
                      const angle = (-Math.PI / 2) + (i * 2 * Math.PI / radarData.labels.length);
                      const x = 110 + radius * Math.cos(angle);
                      const y = 110 + radius * Math.sin(angle);
                      return `${x},${y}`;
                    }).join(' ')}
                    className={styles.radar_required}
                    fill="rgba(88, 167, 181, 0.2)"
                    stroke="#58A7B5"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                  
                  {/* Labels */}
                  {radarData.labels.map((label, i) => {
                    const angle = (-Math.PI / 2) + (i * 2 * Math.PI / radarData.labels.length);
                    const x = 110 + 105 * Math.cos(angle);
                    const y = 110 + 105 * Math.sin(angle);
                    return (
                      <text
                        key={i}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={styles.radar_label}
                      >
                        {label}
                      </text>
                    );
                  })}
                </svg>
              ) : (
                <div className={styles.no_skills_message}>
                  <p>No skills data available for radar chart</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Skills Comparison Section - Chart Style */}
          <div className={`${styles.top_skills_section} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.section_header}>
              <div className={styles.section_title_wrapper}>
                <AssessmentIcon className={styles.section_icon} />
                <div>
                  <h2 className={styles.section_title}>Top Skills Comparison</h2>
                  <p className={styles.section_subtitle}>Current vs required skill levels</p>
                </div>
              </div>
            </div>

            <div className={styles.top_skills_container}>
              {topSkillsComparison.length > 0 ? (
                topSkillsComparison.map((skill, idx) => (
                  <div key={idx} className={styles.skill_comparison_item}>
                    <div className={styles.skill_comparison_header}>
                      <span className={styles.skill_compare_name}>{skill.name}</span>
                      <div className={`${styles.skill_status_badge} ${styles[skill.status]}`}>
                        {skill.message}
                      </div>
                    </div>
                    <div className={styles.comparison_bars_wrapper}>
                      <div className={styles.bar_row}>
                        <div className={styles.bar_label_current}>Current</div>
                        <div className={styles.bar_wrapper}>
                          <div 
                            className={styles.current_bar}
                            style={{ width: `${skill.current}%`, background: '#0A5ADB' }}
                          >
                            <span className={styles.bar_percentage}>{skill.current}%</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.bar_row}>
                        <div className={styles.bar_label_required}>Required</div>
                        <div className={styles.bar_wrapper}>
                          <div 
                            className={styles.required_bar}
                            style={{ width: `${skill.required}%`, background: '#58A7B5' }}
                          >
                            <span className={styles.bar_percentage}>{skill.required}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.no_skills_message}>
                  <p>No skills data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* THREE COLUMN LAYOUT: Missing Skills, Needs Improvement, Strong Skills */}
        <div className={styles.three_column_row}>
          {/* Missing Skills */}
          <div className={`${styles.skill_category_card} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.category_header}>
              <div className={styles.category_icon_wrapper} style={{ background: '#fee2e2' }}>
                <ErrorIcon style={{ color: '#dc2626' }} />
              </div>
              <div>
                <h3 className={styles.category_title}>Missing Skills</h3>
                <p className={styles.category_subtitle}>Skills you need to acquire</p>
              </div>
            </div>
            <div className={styles.skills_list}>
              {missingSkills.length > 0 ? (
                missingSkills.map((skill, idx) => (
                  <div key={idx} className={styles.skill_item}>
                    <div className={styles.skill_info}>
                      <span className={styles.skill_name}>{skill.name}</span>
                      <div className={styles.skill_stats}>
                        <span className={styles.skill_current}>{skill.current}%</span>
                        <span className={styles.skill_required}>{skill.required}%</span>
                      </div>
                    </div>
                    <div className={styles.skill_meta}>
                      <span className={styles.skill_gap} style={{ color: getPriorityColor(skill.priority) }}>
                        {skill.gap}% gap
                      </span>
                      <span 
                        className={styles.skill_priority}
                        style={{ background: getPriorityBg(skill.priority), color: getPriorityColor(skill.priority) }}
                      >
                        {skill.priority}
                      </span>
                      <span className={styles.skill_time}>{skill.timeEstimate}</span>
                    </div>
                    <div className={styles.skill_bar_simple}>
                      <div 
                        className={styles.skill_bar_fill_simple}
                        style={{ width: `${skill.current}%`, background: '#dc2626' }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.no_skills_message}>
                  <CheckCircleIcon style={{ color: '#10b981', fontSize: 48 }} />
                  <p>Great job! No missing skills!</p>
                </div>
              )}
            </div>
          </div>

          {/* Needs Improvement */}
          <div className={`${styles.skill_category_card} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.category_header}>
              <div className={styles.category_icon_wrapper} style={{ background: '#fff3e3' }}>
                <WarningIcon style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <h3 className={styles.category_title}>Needs Improvement</h3>
                <p className={styles.category_subtitle}>Skills requiring more practice</p>
              </div>
            </div>
            <div className={styles.skills_list}>
              {needsImprovement.length > 0 ? (
                needsImprovement.map((skill, idx) => (
                  <div key={idx} className={styles.skill_item}>
                    <div className={styles.skill_info}>
                      <span className={styles.skill_name}>{skill.name}</span>
                      <div className={styles.skill_stats}>
                        <span className={styles.skill_current}>{Math.round(skill.current)}%</span>
                        <span className={styles.skill_required}>{skill.required}%</span>
                      </div>
                    </div>
                    <div className={styles.skill_meta}>
                      <span className={styles.skill_gap} style={{ color: '#f59e0b' }}>
                        {Math.round(skill.gap)}% gap
                      </span>
                      <span 
                        className={styles.skill_priority}
                        style={{ background: '#fff3e3', color: '#f59e0b' }}
                      >
                        {skill.priority}
                      </span>
                      <span className={styles.skill_time}>{skill.timeEstimate}</span>
                    </div>
                    <div className={styles.skill_bar_simple}>
                      <div 
                        className={styles.skill_bar_fill_simple}
                        style={{ width: `${skill.current}%`, background: '#f59e0b' }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.no_skills_message}>
                  {/* <CheckCircleIcon style={{ color: '#10b981', fontSize: 48 }} /> */}
                  <p>No skills to improve!</p>
                </div>
              )}
            </div>
          </div>

          {/* Strong Skills */}
          <div className={`${styles.skill_category_card} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.category_header}>
              <div className={styles.category_icon_wrapper} style={{ background: '#d1fae5' }}>
                <CheckCircleIcon style={{ color: '#10b981' }} />
              </div>
              <div>
                <h3 className={styles.category_title}>Strong Skills</h3>
                <p className={styles.category_subtitle}>Your strongest areas</p>
              </div>
            </div>
            <div className={styles.skills_list}>
              {strongSkills.length > 0 ? (
                strongSkills.map((skill, idx) => (
                  <div key={idx} className={styles.skill_item_strong}>
                    <div className={styles.skill_info}>
                      <span className={styles.skill_name}>{skill.name}</span>
                      <span className={styles.skill_category_badge}>{skill.category}</span>
                    </div>
                    <div className={styles.strong_level}>
                      <span className={styles.strong_percentage}>{Math.round(skill.level)}%</span>
                      <div className={styles.strong_bar}>
                        <div 
                          className={styles.strong_bar_fill}
                          style={{ width: `${skill.level}%`, background: '#10b981' }}
                        />
                      </div>
                    </div>
                    <div className={styles.skill_level_info}>
                      Level: {skill.currentLevel}/{skill.requiredLevel}
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.no_skills_message}>
                  <p>No strong skills yet. Keep learning!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default GapAnalysis;