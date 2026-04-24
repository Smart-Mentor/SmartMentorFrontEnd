import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TodayIcon from "@mui/icons-material/Today";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import styles from "./StudyPlanner.module.css";

const StudyPlanner = () => {
  const [animate, setAnimate] = useState(false);
  const [expandedDays, setExpandedDays] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [weeklyProgress, setWeeklyProgress] = useState(0);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Weekly schedule data
  const weeklySchedule = [
    {
      day: "Monday",
      date: "May 15",
      tasks: [
        { 
          name: "React Fundamentals", 
          time: "09:00 - 11:00", 
          duration: "2h",
          priority: "high",
          completed: false,
          type: "course"
        },
        { 
          name: "Build Todo App", 
          time: "14:00 - 16:00", 
          duration: "2h",
          priority: "high",
          completed: false,
          type: "project"
        },
        { 
          name: "Code Review", 
          time: "19:00 - 20:00", 
          duration: "1h",
          priority: "medium",
          completed: false,
          type: "review"
        },
      ]
    },
    {
      day: "Tuesday",
      date: "May 16",
      tasks: [
        { 
          name: "Database Design", 
          time: "10:00 - 12:00", 
          duration: "2h",
          priority: "high",
          completed: false,
          type: "course"
        },
        { 
          name: "SQL Practice", 
          time: "19:00 - 20:00", 
          duration: "1h",
          priority: "medium",
          completed: false,
          type: "practice"
        },
      ]
    },
    {
      day: "Wednesday",
      date: "May 17",
      tasks: [
        { 
          name: "System Design Study", 
          time: "10:00 - 12:00", 
          duration: "2h",
          priority: "high",
          completed: false,
          type: "study"
        },
        { 
          name: "LeetCode Practice", 
          time: "16:00 - 18:00", 
          duration: "2h",
          priority: "medium",
          completed: false,
          type: "practice"
        },
      ]
    },
    {
      day: "Thursday",
      date: "May 18",
      tasks: [
        { 
          name: "TypeScript Deep Dive", 
          time: "10:00 - 12:00", 
          duration: "2h",
          priority: "high",
          completed: false,
          type: "course"
        },
        { 
          name: "Portfolio Project", 
          time: "14:00 - 17:00", 
          duration: "3h",
          priority: "high",
          completed: false,
          type: "project"
        },
      ]
    },
    {
      day: "Friday",
      date: "May 19",
      tasks: [
        { 
          name: "Weekend Project Planning", 
          time: "10:00 - 11:00", 
          duration: "1h",
          priority: "low",
          completed: false,
          type: "planning"
        },
        { 
          name: "Review Weekly Progress", 
          time: "15:00 - 16:00", 
          duration: "1h",
          priority: "low",
          completed: false,
          type: "review"
        },
      ]
    },
    {
      day: "Saturday",
      date: "May 20",
      tasks: [
        { 
          name: "Weekend Project", 
          time: "14:00 - 18:00", 
          duration: "4h",
          priority: "medium",
          completed: false,
          type: "project"
        },
      ]
    },
    {
      day: "Sunday",
      date: "May 21",
      tasks: [
        { 
          name: "Plan Next Week", 
          time: "18:00 - 19:00", 
          duration: "1h",
          priority: "low",
          completed: false,
          type: "planning"
        },
      ]
    },
  ];

  // Today's focus tasks (derived from today's schedule)
  const getTodayTasks = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todaySchedule = weeklySchedule.find(day => day.day === today);
    return todaySchedule?.tasks || weeklySchedule[0].tasks;
  };

  const todayTasks = getTodayTasks();

  const toggleDay = (dayId) => {
    setExpandedDays(prev => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const toggleTask = (dayIndex, taskIndex) => {
    const key = `${dayIndex}-${taskIndex}`;
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate overall progress
  useEffect(() => {
    let totalTasks = 0;
    let completedCount = 0;
    
    weeklySchedule.forEach((day, dayIdx) => {
      day.tasks.forEach((_, taskIdx) => {
        totalTasks++;
        if (completedTasks[`${dayIdx}-${taskIdx}`]) {
          completedCount++;
        }
      });
    });
    
    setWeeklyProgress(Math.round((completedCount / totalTasks) * 100));
  }, [completedTasks]);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityBg = (priority) => {
    switch(priority) {
      case 'high': return '#fee2e2';
      case 'medium': return '#fff3e3';
      case 'low': return '#d1fae5';
      default: return '#f3f4f6';
    }
  };

  const getTaskTypeIcon = (type) => {
    switch(type) {
      case 'course': return '📚';
      case 'project': return '💻';
      case 'practice': return '⚡';
      case 'review': return '👀';
      case 'study': return '📖';
      case 'planning': return '📅';
      default: return '✅';
    }
  };

  const totalTasks = weeklySchedule.reduce((acc, day) => acc + day.tasks.length, 0);
  const completedCount = Object.values(completedTasks).filter(v => v === true).length;

  return (
    <Box component="main" className={styles.study_planner_container}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.study_planner_content}>
        {/* Header Section */}
        <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.header_left}>
            <div className={styles.header_icon_wrapper}>
              <CalendarTodayIcon className={styles.header_icon} />
            </div>
            <div>
              <h1 className={styles.header_title}>Study Planner</h1>
              <p className={styles.header_subtitle}>Plan and track your weekly learning schedule</p>
            </div>
          </div>
          <div className={styles.header_right}>
            <div className={styles.week_badge}>
              <span className={styles.week_icon}>📅</span>
              <span>Week of May 15 - 21</span>
            </div>
          </div>
        </div>

        {/* Weekly Progress Card */}
        <div className={`${styles.progress_card} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.progress_header}>
            <div className={styles.progress_title_wrapper}>
              <div className={styles.progress_icon}>📊</div>
              <div>
                <h2 className={styles.progress_title}>Weekly Progress</h2>
                <p className={styles.progress_subtitle}>Skills that complement your profile</p>
              </div>
            </div>
            <div className={styles.progress_stats}>
              <span className={styles.progress_percentage}>{weeklyProgress}%</span>
              <span className={styles.progress_complete}>
                {completedCount} of {totalTasks} tasks completed
              </span>
            </div>
          </div>
          
          <div className={styles.progress_bar_container}>
            <div 
              className={styles.progress_bar}
              style={{ width: `${weeklyProgress}%` }}
            >
              <span className={styles.progress_bar_text}>{weeklyProgress}%</span>
            </div>
          </div>
          
          <div className={styles.progress_footer}>
            <span className={styles.motivation_message}>
              {weeklyProgress === 100 ? "🎉 Amazing! You've crushed all your tasks this week!" : 
               weeklyProgress >= 70 ? "🔥 Incredible progress! You're on fire!" :
               weeklyProgress >= 40 ? "💪 Keep up the great work! You're on track." :
               "🌟 Every step counts! Let's make today productive."}
            </span>
            <div className={styles.streak_badge}>
              <span>🔥</span>
              <span>15 day streak</span>
            </div>
          </div>
        </div>

        {/* Today's Focus Section */}
        <div className={`${styles.today_section} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.section_header}>
            <div className={styles.section_title_wrapper}>
              <TodayIcon className={styles.section_icon} />
              <div>
                <h2 className={styles.section_title}>Today's Focus</h2>
                <p className={styles.section_subtitle}>Priority tasks for today</p>
              </div>
            </div>
            <div className={styles.date_badge}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div className={styles.today_tasks_grid}>
            {todayTasks.map((task, idx) => (
              <div 
                key={idx} 
                className={`${styles.today_task_card} ${completedTasks[`today-${idx}`] ? styles.completed : ""}`}
                style={{ borderLeftColor: getPriorityColor(task.priority) }}
              >
                <div className={styles.task_checkbox}>
                  <input
                    type="checkbox"
                    checked={completedTasks[`today-${idx}`] || false}
                    onChange={() => {
                      const key = `today-${idx}`;
                      setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
                    }}
                    className={styles.checkbox}
                  />
                  <span className={styles.custom_checkbox}>
                    {completedTasks[`today-${idx}`] ? "✓" : ""}
                  </span>
                </div>
                <div className={styles.task_content}>
                  <div className={styles.task_header}>
                    <span className={styles.task_name}>{task.name}</span>
                    <span 
                      className={styles.priority_badge}
                      style={{ background: getPriorityBg(task.priority), color: getPriorityColor(task.priority) }}
                    >
                      <FlagIcon className={styles.priority_icon} />
                      {task.priority}
                    </span>
                  </div>
                  <div className={styles.task_meta}>
                    <span className={styles.task_time}>
                      <AccessTimeIcon className={styles.meta_icon} />
                      {task.time}
                    </span>
                    <span className={styles.task_duration}>
                      ⏱️ {task.duration}
                    </span>
                    <span className={styles.task_type}>
                      {getTaskTypeIcon(task.type)} {task.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Schedule Section */}
        <div className={`${styles.schedule_section} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.section_header}>
            <div className={styles.section_title_wrapper}>
              <CalendarTodayIcon className={styles.section_icon} />
              <div>
                <h2 className={styles.section_title}>Weekly Schedule</h2>
                <p className={styles.section_subtitle}>Your auto-generated study plan synced with learning path</p>
              </div>
            </div>
          </div>

          <div className={styles.weekly_grid}>
            {weeklySchedule.map((day, dayIdx) => {
              const dayCompletedCount = day.tasks.filter((_, taskIdx) => 
                completedTasks[`${dayIdx}-${taskIdx}`]
              ).length;
              const dayProgress = (dayCompletedCount / day.tasks.length) * 100;
              
              return (
                <div key={dayIdx} className={styles.day_card}>
                  <div 
                    className={styles.day_header}
                    onClick={() => toggleDay(dayIdx)}
                  >
                    <div className={styles.day_info}>
                      <span className={styles.day_name}>{day.day}</span>
                      <span className={styles.day_date}>{day.date}</span>
                    </div>
                    <div className={styles.day_stats}>
                      <div className={styles.day_progress_circle}>
                        <svg className={styles.small_progress} viewBox="0 0 36 36">
                          <path
                            className={styles.progress_bg}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={styles.progress_fill}
                            stroke="#0A5ADB"
                            strokeDasharray={`${dayProgress}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <text x="18" y="20.5" className={styles.progress_text}>
                            {Math.round(dayProgress)}%
                          </text>
                        </svg>
                      </div>
                      {expandedDays[dayIdx] ? (
                        <ExpandLessIcon className={styles.expand_icon} />
                      ) : (
                        <ExpandMoreIcon className={styles.expand_icon} />
                      )}
                    </div>
                  </div>

                  <div className={`${styles.day_tasks} ${expandedDays[dayIdx] ? styles.expanded : ""}`}>
                    {day.tasks.map((task, taskIdx) => (
                      <div 
                        key={taskIdx} 
                        className={`${styles.schedule_task} ${completedTasks[`${dayIdx}-${taskIdx}`] ? styles.completed : ""}`}
                      >
                        <label className={styles.task_label}>
                          <input
                            type="checkbox"
                            checked={completedTasks[`${dayIdx}-${taskIdx}`] || false}
                            onChange={() => toggleTask(dayIdx, taskIdx)}
                            className={styles.checkbox}
                          />
                          <span className={styles.task_check}>
                            {completedTasks[`${dayIdx}-${taskIdx}`] ? 
                              <CheckCircleIcon className={styles.checked_icon} /> : 
                              <RadioButtonUncheckedIcon className={styles.unchecked_icon} />
                            }
                          </span>
                          <div className={styles.task_details}>
                            <span className={styles.task_title}>{task.name}</span>
                            <div className={styles.task_meta_small}>
                              <span>🕐 {task.time}</span>
                              <span>⏱️ {task.duration}</span>
                            </div>
                          </div>
                        </label>
                        <div className={styles.task_badges}>
                          <span 
                            className={styles.priority_dot}
                            style={{ background: getPriorityColor(task.priority) }}
                          ></span>
                          <span className={styles.task_type_badge}>
                            {getTaskTypeIcon(task.type)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.day_footer}>
                    <span className={styles.day_completed}>
                      ✅ {dayCompletedCount}/{day.tasks.length} completed
                    </span>
                    <span className={styles.day_hours}>
                      ⏰ {day.tasks.reduce((acc, t) => acc + parseInt(t.duration), 0)}h total
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Productivity Tip */}
        <div className={styles.tip_section}>
          <div className={styles.tip_content}>
            <span className={styles.tip_icon}>💡</span>
            <div className={styles.tip_info}>
              <h3 className={styles.tip_title}>Productivity Tip</h3>
              <p className={styles.tip_text}>
                Break down large tasks into smaller chunks and use the Pomodoro technique (25 min work, 5 min break) to maintain focus throughout your study sessions!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default StudyPlanner;