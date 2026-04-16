import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import SpeedIcon from "@mui/icons-material/Speed";
import StarIcon from "@mui/icons-material/Star";
import styles from "./Skills.module.css";

const SkillsPage = () => {
  const [animate, setAnimate] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const skills = [
    { name: "React", level: 80, color: "#61DAFB", projects: 5, experience: "2 years" },
    { name: "Node.js", level: 70, color: "#68A063", projects: 4, experience: "1.5 years" },
    { name: "TypeScript", level: 60, color: "#3178C6", projects: 3, experience: "1 year" },
    { name: "MongoDB", level: 50, color: "#47A248", projects: 3, experience: "1 year" },
    { name: "Git", level: 80, color: "#F05032", projects: 8, experience: "2 years" },
  ];

  const recommended = [
    { name: "GraphQL", demand: "+45%", color: "#E10098" },
    { name: "Next.js", demand: "+52%", color: "#000000" },
    { name: "Redis", demand: "+38%", color: "#DC382D" },
    { name: "PostgreSQL", demand: "+41%", color: "#336791" },
    { name: "AWS", demand: "+55%", color: "#FF9900" },
    { name: "Docker", demand: "+48%", color: "#2496ED" },
  ];

  const improve = [
    { name: "System Design", level: "high", impact: "Critical", priority: 1 },
    { name: "Testing", level: "medium", impact: "High", priority: 2 },
    { name: "CI/CD", level: "medium", impact: "High", priority: 3 },
  ];

  const totalSkills = skills.length;
  const averageProficiency = Math.round(skills.reduce((acc, s) => acc + s.level, 0) / totalSkills);
  const expertLevel = skills.filter(s => s.level >= 80).length;
  const totalProjects = skills.reduce((acc, s) => acc + s.projects, 0);

  return (
    <Box component="main" className={styles.skills_container}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

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
          <div className={styles.header_right}>
            <div className={styles.level_badge}>
              <EmojiEventsIcon className={styles.level_icon} />
              <span>Skill Level: Advanced</span>
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

          <div className={`${styles.stat_card} ${animate ? styles.slide_up : ""}`} style={{ animationDelay: "0.3s" }}>
            <div className={styles.stat_icon_wrapper} style={{ background: "rgba(16, 185, 129, 0.1)" }}>
              <EmojiEventsIcon className={styles.stat_icon} style={{ color: "#10b981" }} />
            </div>
            <div className={styles.stat_info}>
              <span className={styles.stat_value}>{totalProjects}</span>
              <span className={styles.stat_label}>Projects Done</span>
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
            {skills.map((skill, index) => (
              <div 
                key={index} 
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
                    <span className={styles.percentage_label}>Proficient</span>
                  </div>
                </div>
                <div className={styles.progress_bar_container}>
                  <div 
                    className={styles.progress_bar}
                    style={{ 
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`
                    }}
                  >
                    <span className={styles.progress_percentage}>{skill.level}%</span>
                  </div>
                </div>
                {hoveredSkill === index && (
                  <div className={styles.skill_tooltip}>
                    <span>🏆 Top {Math.round(skill.level / 10) * 10}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.skills_footer}>
            <button className={styles.add_skill_btn}>
              + Add New Skill
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom_grid}>
          {/* Recommended Skills */}
          <div className={`${styles.recommended_section} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.section_header}>
              <div>
                <h2 className={styles.section_title}>Recommended Skills</h2>
                <p className={styles.section_subtitle}>Skills that complement your profile</p>
              </div>
              <span className={styles.trending_badge}>🔥 Trending</span>
            </div>

            <div className={styles.tags_container}>
              {recommended.map((item, i) => (
                <div key={i} className={styles.tag_item}>
                  <div className={styles.tag_content}>
                    <span className={styles.tag_name}>{item.name}</span>
                    <span className={styles.tag_demand}>{item.demand}</span>
                  </div>
                  <button className={styles.tag_add_btn}>+</button>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Improve */}
          <div className={`${styles.improve_section} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.section_header}>
              <div>
                <h2 className={styles.section_title}>Areas to Improve</h2>
                <p className={styles.section_subtitle}>Focus on these for maximum impact</p>
              </div>
            </div>

            <div className={styles.improve_list}>
              {improve.map((item, i) => (
                <div key={i} className={styles.improve_item}>
                  <div className={styles.improve_info}>
                    <span className={styles.improve_name}>{item.name}</span>
                    <div className={styles.improve_tags}>
                      <span className={`${styles.improve_badge} ${styles[item.level]}`}>
                        {item.level} priority
                      </span>
                      <span className={styles.improve_impact}>Impact: {item.impact}</span>
                    </div>
                  </div>
                  <button className={styles.improve_btn}>
                    Start Learning →
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.improve_footer}>
              <div className={styles.improve_stats}>
                <span>📊 Estimated improvement: +25% in 3 months</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Assessment CTA */}
        <div className={`${styles.assessment_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.assessment_content}>
            <div className={styles.assessment_icon}>🎯</div>
            <div className={styles.assessment_info}>
              <h3 className={styles.assessment_title}>Skill Assessment</h3>
              <p className={styles.assessment_text}>
                Take our comprehensive assessment to get detailed insights about your skills
              </p>
            </div>
            <button className={styles.assessment_btn}>
              Take Assessment →
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default SkillsPage;