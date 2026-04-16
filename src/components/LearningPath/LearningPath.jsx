import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import TimelineIcon from "@mui/icons-material/Timeline";
import styles from "./LearningPath.module.css";

export default function LearningPath() {
  const [animate, setAnimate] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [completedItems, setCompletedItems] = useState({});
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Calculate overall progress whenever completed items change
  useEffect(() => {
    calculateOverallProgress();
  }, [completedItems]);

  const titles = [
    {
      id: "fundamentals",
      title: "Fundamentals",
      icon: "🎯",
      color: "#0A5ADB",
      description: "Master the essential building blocks of development",
      checks: [
        { name: "JavaScript Basics", completed: false, resource: "Beginner-friendly guide", points: 100 },
        { name: "HTML & CSS", completed: false, resource: "Interactive tutorials", points: 100 },
        { name: "Git & GitHub", completed: false, resource: "Version control mastery", points: 100 },
        { name: "Command Line", completed: false, resource: "Terminal basics", points: 100 },
      ],
    },
    {
      id: "core",
      title: "Core Skills",
      icon: "⚛️",
      color: "#58A7B5",
      description: "Build modern applications with industry-standard tools",
      checks: [
        { name: "React Fundamentals", completed: false, resource: "Component-based architecture", points: 150 },
        { name: "TypeScript", completed: false, resource: "Type-safe development", points: 150 },
        { name: "State Management", completed: false, resource: "Redux, Context API", points: 150 },
        { name: "REST APIs", completed: false, resource: "API integration", points: 150 },
      ],
    },
    {
      id: "advanced",
      title: "Advanced Topics",
      icon: "🚀",
      color: "#667eea",
      description: "Take your skills to the next level",
      checks: [
        { name: "Next.js", completed: false, resource: "React framework", points: 200 },
        { name: "GraphQL", completed: false, resource: "Modern API query language", points: 200 },
        { name: "Testing", completed: false, resource: "Jest, React Testing Library", points: 200 },
        { name: "Performance Optimization", completed: false, resource: "Web Vitals", points: 200 },
      ],
    },
  ];

  // Calculate section percentage
  const calculateSectionPercentage = (section) => {
    if (!section.checks.length) return 0;
    const completedCount = section.checks.filter((_, idx) => 
      completedItems[`${section.id}-${idx}`]
    ).length;
    return Math.round((completedCount / section.checks.length) * 100);
  };

  // Calculate overall percentage across all sections
  const calculateOverallProgress = () => {
    let totalItems = 0;
    let completedTotal = 0;
    
    titles.forEach(section => {
      totalItems += section.checks.length;
      section.checks.forEach((_, idx) => {
        if (completedItems[`${section.id}-${idx}`]) {
          completedTotal++;
        }
      });
    });
    
    const percentage = totalItems === 0 ? 0 : Math.round((completedTotal / totalItems) * 100);
    setOverallProgress(percentage);
    return percentage;
  };

  // Calculate total points earned
  const calculateTotalPoints = () => {
    let totalPoints = 0;
    let earnedPoints = 0;
    
    titles.forEach(section => {
      section.checks.forEach((check, idx) => {
        totalPoints += check.points;
        if (completedItems[`${section.id}-${idx}`]) {
          earnedPoints += check.points;
        }
      });
    });
    
    return { earnedPoints, totalPoints };
  };

  // Calculate section points
  const calculateSectionPoints = (section) => {
    let totalPoints = 0;
    let earnedPoints = 0;
    
    section.checks.forEach((check, idx) => {
      totalPoints += check.points;
      if (completedItems[`${section.id}-${idx}`]) {
        earnedPoints += check.points;
      }
    });
    
    return { earnedPoints, totalPoints };
  };

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCheckbox = (sectionId, checkIndex) => {
    const key = `${sectionId}-${checkIndex}`;
    setCompletedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getCompletedCount = (section) => {
    return section.checks.filter((_, idx) => completedItems[`${section.id}-${idx}`]).length;
  };

  const { earnedPoints, totalPoints } = calculateTotalPoints();
  const pointsPercentage = Math.round((earnedPoints / totalPoints) * 100) || 0;

  const achievements = [
    { icon: "🏆", title: "Streak", value: "15 days", color: "#f59e0b" },
    { icon: "⭐", title: "Points", value: `${earnedPoints}/${totalPoints}`, color: "#10b981" },
    { icon: "📚", title: "Courses", value: `${Math.floor(earnedPoints / 100)}/${Math.floor(totalPoints / 100)}`, color: "#0A5ADB" },
  ];

  return (
    <Box component="main" className={styles.learning_path_container}>
      {/* Background decorative elements */}
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
              <p className={styles.header_subtitle}>Backend Developer Roadmap</p>
            </div>
          </div>
          <div className={styles.header_right}>
            <div className={styles.achievement_badge}>
              <EmojiEventsIcon className={styles.achievement_icon} />
              <span>Level {Math.floor(pointsPercentage / 20) + 1} Learner</span>
            </div>
          </div>
        </div>

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
                  {overallProgress === 100 ? "🎉 Congratulations! You've completed everything!" : "Keep going! You're making great progress!"}
                </p>
              </div>
            </div>
            <div className={styles.overall_percentage}>
              <span className={styles.percentage_value}>{overallProgress}%</span>
              <span className={styles.percentage_label}>Complete</span>
            </div>
          </div>
          
          <div className={styles.progress_bar_container}>
            <div 
              className={styles.progress_bar}
              style={{ width: `${overallProgress}%` }}
            >
              <span className={styles.progress_percentage}>{overallProgress}%</span>
            </div>
          </div>
          
          <div className={styles.overall_footer}>
            <span className={styles.milestone_text}>
              🎯 {overallProgress < 30 ? "Next milestone: 30%" : overallProgress < 60 ? "Next milestone: 60%" : overallProgress < 100 ? "Next milestone: 100%" : "🏆 Fully completed!"}
            </span>
            <span className={styles.courses_left}>
              📚 {titles.reduce((acc, section) => acc + (section.checks.length - getCompletedCount(section)), 0)} tasks remaining
            </span>
          </div>
        </div>

        {/* Learning Sections */}
        {titles.map((section, index) => {
          const sectionPercentage = calculateSectionPercentage(section);
          const { earnedPoints: sectionEarned, totalPoints: sectionTotal } = calculateSectionPoints(section);
          
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
                {section.checks.map((check, idx) => {
                  const isCompleted = completedItems[`${section.id}-${idx}`];
                  return (
                    <div key={idx} className={`${styles.check_item} ${isCompleted ? styles.completed : ""}`}>
                      <label className={styles.checkbox_label}>
                        <input
                          type="checkbox"
                          checked={isCompleted || false}
                          onChange={() => toggleCheckbox(section.id, idx)}
                          className={styles.custom_checkbox}
                        />
                        <span className={styles.checkbox_custom}>
                          {isCompleted ? (
                            <CheckCircleIcon className={styles.checkbox_checked} />
                          ) : (
                            <RadioButtonUncheckedIcon className={styles.checkbox_unchecked} />
                          )}
                        </span>
                        <div className={styles.check_content}>
                          <span className={styles.check_name}>{check.name}</span>
                          <span className={styles.check_resource}>{check.resource}</span>
                        </div>
                      </label>
                      <div className={styles.check_right}>
                        <span className={styles.check_points}>+{check.points} pts</span>
                        <button className={styles.start_btn}>
                          {isCompleted ? "Completed ✓" : "Start →"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.section_footer}>
                <div className={styles.footer_stats}>
                  <span>✅ {getCompletedCount(section)}/{section.checks.length} completed</span>
                  <span>⏱️ Estimated: {(section.checks.length - getCompletedCount(section)) * 4} hours left</span>
                  <span>🎯 {sectionPercentage}% mastered</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Certificate Section */}
        <div className={styles.certificate_section}>
          <div className={styles.certificate_content}>
            <div className={styles.certificate_icon}>🎓</div>
            <div className={styles.certificate_info}>
              <h3 className={styles.certificate_title}>Earn Your Certificate</h3>
              <p className={styles.certificate_text}>
                Complete all sections to receive your Backend Developer certificate
              </p>
            </div>
            <button 
              className={styles.certificate_btn} 
              disabled={overallProgress < 100}
              style={{
                background: overallProgress === 100 
                  ? "linear-gradient(135deg, #10b981, #059669)" 
                  : "linear-gradient(135deg, #0A5ADB, #58A7B5)"
              }}
            >
              {overallProgress === 100 ? "🎉 Download Certificate" : `${overallProgress}% Complete`}
            </button>
          </div>
        </div>

        {/* Motivation Message */}
        {overallProgress > 0 && overallProgress < 100 && (
          <div className={styles.motivation_section}>
            <div className={styles.motivation_content}>
              <span className={styles.motivation_icon}>💪</span>
              <p className={styles.motivation_text}>
                You're {overallProgress}% of the way there! Keep up the amazing work!
              </p>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}