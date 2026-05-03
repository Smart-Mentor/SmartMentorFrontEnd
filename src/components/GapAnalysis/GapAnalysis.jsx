import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
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

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Radar chart data
  const radarData = {
    labels: ["Frontend", "Backend", "Database", "DevOps", "Testing", "AI"],
    current: [65, 60, 50, 40, 35, 70],
    required: [50, 85, 75, 80, 75, 65]
  };

  // Skills data
  const missingSkills = [
    { name: "Docker", current: 40, required: 80, gap: 40, priority: "High", timeEstimate: "2 months", category: "DevOps" },
    { name: "Testing", current: 35, required: 75, gap: 40, priority: "High", timeEstimate: "1.5 months", category: "Testing" },
    { name: "System Design", current: 30, required: 70, gap: 40, priority: "High", timeEstimate: "4 months", category: "Architecture" },
    { name: "AWS", current: 25, required: 65, gap: 40, priority: "High", timeEstimate: "3 months", category: "Cloud" },
    { name: "GraphQL", current: 20, required: 50, gap: 30, priority: "Medium", timeEstimate: "1 month", category: "API" },
    { name: "Redis", current: 15, required: 40, gap: 25, priority: "Medium", timeEstimate: "2 weeks", category: "Database" }
  ];

  const needsImprovement = [
    { name: "Node.js", current: 60, required: 85, gap: 25, priority: "High", timeEstimate: "3 months" },
    { name: "Database Design", current: 50, required: 75, gap: 25, priority: "High", timeEstimate: "2 months" }
  ];

  const strongSkills = [
    { name: "React", level: 80, category: "Frontend" },
    { name: "JavaScript", level: 85, category: "Language" },
    { name: "Git", level: 90, category: "Tools" }
  ];

  // Top Skills Comparison data - horizontal bar chart style
  const topSkillsComparison = [
    { name: "React", current: 80, required: 80, gap: 0, status: "success", message: "On Track" },
    { name: "Node.js", current: 60, required: 85, gap: 25, status: "warning", message: "25% gap" },
    { name: "Docker", current: 40, required: 80, gap: 40, status: "error", message: "40% gap" },
    { name: "AWS", current: 25, required: 65, gap: 40, status: "error", message: "40% gap" },
    { name: "Testing", current: 35, required: 75, gap: 40, status: "error", message: "40% gap" }
  ];

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
                Compare your current skills with your target career requirements
              </p>
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
                    strokeDasharray={`${(65 / 100) * 339.292}, 339.292`}
                  />
                </svg>
                <div className={styles.match_score_text}>
                  <span className={styles.match_percentage}>65%</span>
                  <span className={styles.match_label}>Match Score</span>
                </div>
              </div>
            </div>
            <div className={styles.match_score_right}>
              <h3 className={styles.match_title}>You're on the right track!</h3>
              <p className={styles.match_description}>
                Focus on the gaps below to reach 100% match for your target role
              </p>
              <div className={styles.match_footer}>
                <span className={styles.match_badge}>🎯 8 skills to improve</span>
                <span className={styles.match_badge}>⏱️ ~6 months estimated</span>
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
              {topSkillsComparison.map((skill, idx) => (
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
              ))}
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
              {missingSkills.slice(0, 4).map((skill, idx) => (
                <div 
                  key={idx} 
                  className={styles.skill_item}
                >
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
              ))}
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
              {needsImprovement.map((skill, idx) => (
                <div key={idx} className={styles.skill_item}>
                  <div className={styles.skill_info}>
                    <span className={styles.skill_name}>{skill.name}</span>
                    <div className={styles.skill_stats}>
                      <span className={styles.skill_current}>{skill.current}%</span>
                      <span className={styles.skill_required}>{skill.required}%</span>
                    </div>
                  </div>
                  <div className={styles.skill_meta}>
                    <span className={styles.skill_gap} style={{ color: '#f59e0b' }}>
                      {skill.gap}% gap
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
              ))}
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
              {strongSkills.map((skill, idx) => (
                <div key={idx} className={styles.skill_item_strong}>
                  <div className={styles.skill_info}>
                    <span className={styles.skill_name}>{skill.name}</span>
                    <span className={styles.skill_category_badge}>{skill.category}</span>
                  </div>
                  <div className={styles.strong_level}>
                    <span className={styles.strong_percentage}>{skill.level}%</span>
                    <div className={styles.strong_bar}>
                      <div 
                        className={styles.strong_bar_fill}
                        style={{ width: `${skill.level}%`, background: '#10b981' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default GapAnalysis;