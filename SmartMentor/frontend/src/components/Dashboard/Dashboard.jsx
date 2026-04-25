import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const progressCards = [
    { title: "Profile Completion", percent: 75, icon: "👤", color: "#0A5ADB" },
    { title: "Career Readiness", percent: 62, icon: "🎯", color: "#58A7B5" },
    { title: "Learning Progress", percent: 45, icon: "📚", color: "#667eea" },
  ];

  const nextSteps = [
    { 
      title: "Complete Gap Analysis", 
      desc: "Identify missing skills for your target career",
      icon: "📊",
      button: "Start Analysis"
    },
    { 
      title: "Update Your Skills", 
      desc: "Add your latest accomplishments",
      icon: "⭐",
      button: "Update Now"
    },
    { 
      title: "Explore Job Trends", 
      desc: "See what's in demand in Egyptian tech market",
      icon: "📈",
      button: "Explore Trends"
    },
  ];

  const trendingSkills = [
    { name: "React", demand: "+45%", color: "#61DAFB" },
    { name: "Node.js", demand: "+38%", color: "#68A063" },
    { name: "Python", demand: "+52%", color: "#3776AB" },
    { name: "TypeScript", demand: "+41%", color: "#3178C6" },
    { name: "AWS", demand: "+35%", color: "#FF9900" },
    { name: "Docker", demand: "+30%", color: "#2496ED" },
  ];

  const recentActivities = [
    { action: "Completed React Basics", date: "2 hours ago", type: "success" },
    { action: "Updated career profile", date: "Yesterday", type: "info" },
    { action: "Started Python course", date: "3 days ago", type: "warning" },
  ];

  return (
    <Box component="main" className={styles.dashboard_container}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      
      <div className={styles.dashboard_content}>
        {/* HEADER */}
        <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.header_welcome}>
            <h1 className={styles.welcome_title}>
              Welcome back, Fathy! <span className={styles.wave}>👋</span>
            </h1>
            <p className={styles.welcome_subtitle}>
              Here's your learning progress overview
            </p>
          </div>
          <div className={styles.header_stats}>
            <div className={styles.stat_badge}>
              <span className={styles.stat_badge_icon}>🔥</span>
              <span className={styles.stat_badge_text}>15 Day Streak</span>
            </div>
            <div className={styles.stat_badge}>
              <span className={styles.stat_badge_icon}>⭐</span>
              <span className={styles.stat_badge_text}>Level 3 Learner</span>
            </div>
          </div>
        </div>

        {/* PROGRESS CARDS */}
        <div className={styles.cards_section}>
          {progressCards.map((card, index) => (
            <div 
              key={index} 
              className={`${styles.progress_card} ${animate ? styles.slide_up : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.card_header}>
                <span className={styles.card_icon}>{card.icon}</span>
                <span className={styles.card_title}>{card.title}</span>
              </div>
              <div className={styles.card_percentage}>
                <h2 className={styles.percentage_value}>{card.percent}%</h2>
              </div>
              <div className={styles.progress_bar_container}>
                <div 
                  className={styles.progress_bar}
                  style={{ 
                    width: `${card.percent}%`,
                    background: `linear-gradient(90deg, ${card.color}, ${card.color === "#0A5ADB" ? "#58A7B5" : card.color === "#58A7B5" ? "#0A5ADB" : "#764ba2"})`
                  }}
                ></div>
              </div>
              <div className={styles.card_footer}>
                <span className={styles.card_status}>
                  {card.percent < 50 ? "Keep going!" : card.percent < 80 ? "Good progress!" : "Excellent!"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* NEXT STEPS & ACTIVITIES */}
        <div className={styles.two_column_layout}>
          {/* Recommended Next Steps */}
          <div className={`${styles.next_steps_section} ${animate ? styles.fade_in : ""}`}>
            <div className={styles.section_header}>
              <div className={styles.section_title_wrapper}>
                <span className={styles.section_icon}>🎯</span>
                <h2 className={styles.section_title}>Recommended Next Steps</h2>
              </div>
              <p className={styles.section_subtitle}>Continue your learning journey</p>
            </div>

            <div className={styles.steps_list}>
              {nextSteps.map((step, i) => (
                <div key={i} className={styles.step_card}>
                  <div className={styles.step_icon_wrapper}>
                    <span className={styles.step_icon}>{step.icon}</span>
                  </div>
                  <div className={styles.step_content}>
                    <h3 className={styles.step_title}>{step.title}</h3>
                    <p className={styles.step_description}>{step.desc}</p>
                    <button className={styles.step_button}>
                      {step.button} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`${styles.activity_section} ${animate ? styles.fade_in : ""}`}>
            <div className={styles.section_header}>
              <div className={styles.section_title_wrapper}>
                <span className={styles.section_icon}>📝</span>
                <h2 className={styles.section_title}>Recent Activity</h2>
              </div>
              <p className={styles.section_subtitle}>Your latest achievements</p>
            </div>

            <div className={styles.activity_list}>
              {recentActivities.map((activity, i) => (
                <div key={i} className={styles.activity_item}>
                  <div className={`${styles.activity_dot} ${styles[activity.type]}`}></div>
                  <div className={styles.activity_content}>
                    <p className={styles.activity_action}>{activity.action}</p>
                    <span className={styles.activity_date}>{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.activity_footer}>
              <button className={styles.view_all_button}>View All Activity →</button>
            </div>
          </div>
        </div>

        {/* JOB MARKET TRENDS */}
        <div className={`${styles.trends_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.trends_header}>
            <div>
              <div className={styles.section_title_wrapper}>
                <span className={styles.section_icon}>📈</span>
                <h2 className={styles.section_title}>Job Market Snapshot</h2>
              </div>
              <p className={styles.section_subtitle}>Top trending skills in Egypt this month</p>
            </div>
            <button className={styles.view_trends_button}>View Full Trends →</button>
          </div>

          <div className={styles.skills_grid}>
            {trendingSkills.map((skill, index) => (
              <div key={index} className={styles.skill_card}>
                <div className={styles.skill_header}>
                  <span className={styles.skill_name}>{skill.name}</span>
                  <span className={styles.skill_demand}>{skill.demand}</span>
                </div>
                <div className={styles.skill_bar}>
                  <div 
                    className={styles.skill_bar_fill}
                    style={{ 
                      width: skill.demand,
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.trends_footer}>
            <div className={styles.trends_stats}>
              <div className={styles.trend_stat}>
                <span className={styles.trend_stat_value}>500+</span>
                <span className={styles.trend_stat_label}>New Jobs</span>
              </div>
              <div className={styles.trend_divider}></div>
              <div className={styles.trend_stat}>
                <span className={styles.trend_stat_value}>45+</span>
                <span className={styles.trend_stat_label}>Companies Hiring</span>
              </div>
              <div className={styles.trend_divider}></div>
              <div className={styles.trend_stat}>
                <span className={styles.trend_stat_value}>32%</span>
                <span className={styles.trend_stat_label}>Salary Growth</span>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className={styles.quote_section}>
          <div className={styles.quote_icon}>💡</div>
          <p className={styles.quote_text}>
            "The future depends on what you do today. Keep learning, keep growing!"
          </p>
          <div className={styles.quote_author}>- SmartMentor AI</div>
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;