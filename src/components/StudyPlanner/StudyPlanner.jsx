import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TodayIcon from "@mui/icons-material/Today";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import { CAREER_STUDY_PLANS, getCareerData, getCurrentWeekTasks, getTotalWeeks } from "./careerData";
import styles from "./StudyPlanner.module.css";

const StudyPlanner = () => {
  const [animate, setAnimate] = useState(false);
  const [expandedDays, setExpandedDays] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [careerGoal, setCareerGoal] = useState("");
  const [careerData, setCareerData] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [totalWeeks, setTotalWeeksState] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Order of days
  const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // API configuration
  const API_URL = "https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/gapanalysis/gap-analysis";
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    setAnimate(true);
    fetchCareerFromGapAnalysis();
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchCareerFromGapAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching gap analysis from:", API_URL);
      
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
      console.log("Gap analysis data received:", data);
      
      let careerFromAPI = data.careerGoalName || data.careerGoal || data.targetCareer;
      
      if (!careerFromAPI && data.missingSkills && data.missingSkills.length > 0) {
        careerFromAPI = determineCareerFromSkills(data.missingSkills);
      }
      
      if (!careerFromAPI) {
        careerFromAPI = "Software Engineer";
      }
      
      console.log("Career detected from API:", careerFromAPI);
      setCareerGoal(careerFromAPI);
      
      const staticCareerData = getCareerData(careerFromAPI);
      setCareerData(staticCareerData);
      
      const totalWeeksCount = getTotalWeeks(careerFromAPI);
      setTotalWeeksState(totalWeeksCount);
      
      const savedWeek = localStorage.getItem(`studyPlanner_${careerFromAPI.replace(/\s/g, '')}_currentWeek`);
      const initialWeek = savedWeek ? parseInt(savedWeek) : 1;
      setCurrentWeek(initialWeek);
      
      generateScheduleForWeek(staticCareerData, initialWeek);
      
    } catch (err) {
      console.error("Error fetching gap analysis data:", err);
      setError(err.message);
      
      const defaultCareer = "Software Engineer";
      setCareerGoal(defaultCareer);
      const defaultData = getCareerData(defaultCareer);
      setCareerData(defaultData);
      setTotalWeeksState(getTotalWeeks(defaultCareer));
      
      const savedWeek = localStorage.getItem(`studyPlanner_${defaultCareer.replace(/\s/g, '')}_currentWeek`);
      const initialWeek = savedWeek ? parseInt(savedWeek) : 1;
      setCurrentWeek(initialWeek);
      
      generateScheduleForWeek(defaultData, initialWeek);
    } finally {
      setLoading(false);
    }
  };

  const determineCareerFromSkills = (skills) => {
    const skillList = skills.map(s => s.skillName?.toLowerCase() || "");
    
    if (skillList.some(s => ["react", "angular", "vue", "html", "css", "javascript", "typescript"].includes(s))) {
      return "Frontend Developer";
    }
    if (skillList.some(s => ["node.js", "python", "java", "c#", "php", "ruby", "express"].includes(s))) {
      return "Backend Developer";
    }
    if (skillList.some(s => ["docker", "kubernetes", "aws", "jenkins", "terraform", "linux"].includes(s))) {
      return "DevOps Engineer";
    }
    if (skillList.some(s => ["pandas", "numpy", "tensorflow", "machine learning", "statistics"].includes(s))) {
      return "Data Scientist";
    }
    if (skillList.some(s => ["react native", "flutter", "swift", "kotlin", "android", "ios"].includes(s))) {
      return "Mobile Developer";
    }
    return "Software Engineer";
  };

  const getWeekStartDate = (weekNumber) => {
    const today = new Date(currentDate);
    const currentDayOfWeek = today.getDay();
    const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - daysToMonday);
    
    const weekOffset = weekNumber - 1;
    const targetWeekStart = new Date(currentWeekStart);
    targetWeekStart.setDate(currentWeekStart.getDate() + (weekOffset * 7));
    
    return targetWeekStart;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatFullDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const generateScheduleForWeek = (career, weekNumber) => {
    const weekStart = getWeekStartDate(weekNumber);
    const weekPlan = getCurrentWeekTasks(career.title, weekNumber);
    
    if (!weekPlan || !weekPlan.days) {
      console.error("No week plan found for week:", weekNumber);
      return;
    }
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      weekDates.push(date);
    }
    
    const todayDate = new Date(currentDate);
    todayDate.setHours(0, 0, 0, 0);
    
    const schedule = WEEK_DAYS.map((day, index) => {
      const dayPlan = weekPlan.days[day];
      const date = weekDates[index];
      const isToday = date.toDateString() === todayDate.toDateString();
      const isPast = date < todayDate && !isToday;
      const isFuture = date > todayDate;
      
      let tasks = [];
      if (dayPlan && dayPlan.tasks) {
        tasks = dayPlan.tasks.map((task, taskIndex) => ({
          id: `${career.title.replace(/\s/g, '')}-week${weekNumber}-${day}-${taskIndex}-${task.name.replace(/\s/g, '')}`,
          name: task.name,
          time: task.time,
          duration: task.duration,
          type: task.type,
          priority: task.priority,
          notes: task.notes,
          resources: task.resources || [],
          completed: false,
          career: career.title,
          weekNumber: weekNumber,
          dayOfWeek: day,
          category: getTaskCategory(task.name),
          date: date.toISOString(),
          dateDisplay: formatFullDate(date),
          isToday: isToday,
          isPast: isPast,
          isFuture: isFuture
        }));
      }
      
      return {
        day: day,
        date: date,
        dateString: formatDate(date),
        fullDateString: formatFullDate(date),
        tasks: tasks,
        totalHours: tasks.reduce((acc, t) => acc + parseInt(t.duration), 0),
        focusArea: weekPlan.focus,
        hasTasks: tasks.length > 0,
        isToday: isToday,
        isPast: isPast,
        isFuture: isFuture,
        dayIndex: index
      };
    });
    
    const uniqueSchedule = schedule.filter((day, index, self) => 
      index === self.findIndex(d => d.day === day.day)
    );
    setWeeklySchedule(uniqueSchedule);
  };

  const getTaskCategory = (taskName) => {
    const name = taskName.toLowerCase();
    if (name.includes("html") || name.includes("css") || name.includes("react") || name.includes("javascript") || name.includes("typescript") || name.includes("next")) {
      return "Frontend";
    }
    if (name.includes("python") || name.includes("node") || name.includes("api") || name.includes("sql") || name.includes("database") || name.includes("express")) {
      return "Backend";
    }
    if (name.includes("docker") || name.includes("kubernetes") || name.includes("aws") || name.includes("linux") || name.includes("jenkins") || name.includes("terraform")) {
      return "DevOps";
    }
    if (name.includes("pandas") || name.includes("numpy") || name.includes("machine") || name.includes("tensorflow") || name.includes("statistics")) {
      return "Data Science";
    }
    if (name.includes("unity") || name.includes("game") || name.includes("3d")) {
      return "Game Development";
    }
    if (name.includes("security") || name.includes("network") || name.includes("firewall")) {
      return "Security";
    }
    return "Development";
  };

  useEffect(() => {
    if (weeklySchedule.length > 0 && careerGoal) {
      const savedKey = `studyPlanner_${careerGoal.replace(/\s/g, '')}_week${currentWeek}`;
      const savedTasks = localStorage.getItem(savedKey);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        setCompletedTasks(parsedTasks);
      }
    }
  }, [weeklySchedule, careerGoal, currentWeek]);

  useEffect(() => {
    if (weeklySchedule.length > 0 && careerGoal && Object.keys(completedTasks).length > 0) {
      const saveKey = `studyPlanner_${careerGoal.replace(/\s/g, '')}_week${currentWeek}`;
      localStorage.setItem(saveKey, JSON.stringify(completedTasks));
      localStorage.setItem(`studyPlanner_${careerGoal.replace(/\s/g, '')}_currentWeek`, currentWeek.toString());
    }
  }, [completedTasks, careerGoal, currentWeek]);

  useEffect(() => {
    if (weeklySchedule.length === 0) return;
    
    let total = 0;
    let completed = 0;
    
    weeklySchedule.forEach(day => {
      day.tasks.forEach(task => {
        total++;
        if (completedTasks[task.id]) {
          completed++;
        }
      });
    });
    
    setWeeklyProgress(total > 0 ? Math.round((completed / total) * 100) : 0);
  }, [completedTasks, weeklySchedule]);

  const toggleDay = (dayId) => {
    setExpandedDays(prev => ({ ...prev, [dayId]: !prev[dayId] }));
  };

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const goToNextWeek = () => {
    if (currentWeek < totalWeeks) {
      const newWeek = currentWeek + 1;
      setCurrentWeek(newWeek);
      if (careerData) {
        generateScheduleForWeek(careerData, newWeek);
        setExpandedDays({});
      }
    }
  };

  const goToPreviousWeek = () => {
    if (currentWeek > 1) {
      const newWeek = currentWeek - 1;
      setCurrentWeek(newWeek);
      if (careerData) {
        generateScheduleForWeek(careerData, newWeek);
        setExpandedDays({});
      }
    }
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(1);
    if (careerData) {
      generateScheduleForWeek(careerData, 1);
      setExpandedDays({});
    }
  };

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
      case 'review': return '🔄';
      case 'planning': return '📅';
      default: return '✅';
    }
  };

  const getTodayTasks = () => {
    if (weeklySchedule.length === 0) return [];
    return weeklySchedule.find(day => day.isToday)?.tasks || [];
  };

  const getWeekRange = () => {
    if (weeklySchedule.length === 0) return "";
    const firstDay = weeklySchedule[0];
    const lastDay = weeklySchedule[6];
    if (firstDay && lastDay) {
      return `${firstDay.dateString} - ${lastDay.dateString}`;
    }
    return "";
  };

  const todayTasks = getTodayTasks();
  const totalTasks = weeklySchedule.reduce((acc, day) => acc + day.tasks.length, 0);
  const completedCount = Object.values(completedTasks).filter(v => v === true).length;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 2 }}>
        <CircularProgress size={60} />
        <p style={{ color: '#666', marginTop: 16 }}>Loading your personalized study plan...</p>
        <p style={{ color: '#999', fontSize: 14 }}>Based on today's date: {new Date().toLocaleDateString()}</p>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 2 }}>
        <p style={{ color: '#dc2626' }}>Error loading study plan: {error}</p>
        <button onClick={fetchCareerFromGapAnalysis} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '8px', border: 'none', background: '#0A5ADB', color: 'white' }}>
          Retry
        </button>
      </Box>
    );
  }

  return (
    <Box component="main" className={styles.study_planner_container}>
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
              <p className={styles.header_subtitle}>
                Personalized learning path for <strong>{careerGoal}</strong>
              </p>
              <p className={styles.header_date}>
                Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          <div className={styles.header_right}>
            <div className={styles.week_badge}>
              <span className={styles.week_icon}>📅</span>
              <span>Week {currentWeek} of {totalWeeks}</span>
            </div>
            <div className={styles.week_range}>
              <span>{getWeekRange()}</span>
            </div>
            <div className={styles.week_navigation}>
              <button onClick={goToPreviousWeek} disabled={currentWeek === 1} className={styles.nav_button}>
                ← Previous
              </button>
              <button onClick={goToCurrentWeek} className={styles.nav_button_current}>
                📍 Current Week
              </button>
              <button onClick={goToNextWeek} disabled={currentWeek === totalWeeks} className={styles.nav_button}>
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Career Info Card */}
        {careerData && (
          <div className={`${styles.career_info_card} ${animate ? styles.slide_up : ""}`} style={{ background: `linear-gradient(135deg, ${careerData.color} 0%, ${careerData.color}CC 100%)` }}>
            <div className={styles.career_info_content}>
              <div className={styles.career_icon}>{careerData.icon}</div>
              <div className={styles.career_details}>
                <h3>{careerData.title}</h3>
                <p>{careerData.description}</p>
                <div className={styles.career_stats}>
                  <div className={styles.career_stat}>
                    <span className={styles.stat_value}>{careerData.skills?.length || 0}</span>
                    <span className={styles.stat_label}>Skills to Master</span>
                  </div>
                  <div className={styles.career_stat}>
                    <span className={styles.stat_value}>{totalWeeks}</span>
                    <span className={styles.stat_label}>Total Weeks</span>
                  </div>
                  <div className={styles.career_stat}>
                    <span className={styles.stat_value}>{weeklyProgress}%</span>
                    <span className={styles.stat_label}>Week Progress</span>
                  </div>
                </div>
                <div className={styles.career_skills_tags}>
                  {careerData.skills?.slice(0, 6).map(skill => (
                    <span key={skill} className={styles.career_skill_tag}>{skill}</span>
                  ))}
                  {careerData.skills?.length > 6 && (
                    <span className={styles.career_skill_tag}>+{careerData.skills.length - 6} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Focus */}
        {weeklySchedule[0]?.focusArea && (
          <div className={`${styles.weekly_focus_card} ${animate ? styles.slide_up : ""}`}>
            <span className={styles.focus_icon}>🎯</span>
            <div>
              <span className={styles.focus_label}>This Week's Focus</span>
              <span className={styles.focus_area}>{weeklySchedule[0].focusArea}</span>
            </div>
          </div>
        )}

        {/* Weekly Progress Card */}
        <div className={`${styles.progress_card} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.progress_header}>
            <div className={styles.progress_title_wrapper}>
              <div className={styles.progress_icon}>📊</div>
              <div>
                <h2 className={styles.progress_title}>Weekly Progress</h2>
                <p className={styles.progress_subtitle}>Track your learning journey</p>
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
            <div className={styles.progress_bar} style={{ width: `${weeklyProgress}%` }}>
              <span className={styles.progress_bar_text}>{weeklyProgress}%</span>
            </div>
          </div>
          
          <div className={styles.progress_footer}>
            <span className={styles.motivation_message}>
              {weeklyProgress === 100 ? "🎉 Amazing! Week complete! Ready for next week!" : 
               weeklyProgress >= 70 ? "🔥 Incredible progress! You're on fire!" :
               weeklyProgress >= 40 ? "💪 Keep up the great work!" : "🌟 Start your journey today!"}
            </span>
          </div>
        </div>

        {/* Today's Focus Section */}
        {todayTasks.length > 0 && (
          <div className={`${styles.today_section} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.section_header}>
              <div className={styles.section_title_wrapper}>
                <TodayIcon className={styles.section_icon} />
                <div>
                  <h2 className={styles.section_title}>Today's Tasks</h2>
                  <p className={styles.section_subtitle}>What to focus on today - {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>

            <div className={styles.today_tasks_grid}>
              {todayTasks.map((task, idx) => (
                <div 
                  key={task.id || idx} 
                  className={`${styles.today_task_card} ${completedTasks[task.id] ? styles.completed : ""}`} 
                  style={{ borderLeftColor: getPriorityColor(task.priority) }}
                >
                  <div className={styles.task_checkbox}>
                    <input
                      type="checkbox"
                      checked={completedTasks[task.id] || false}
                      onChange={() => toggleTask(task.id)}
                      className={styles.checkbox}
                      id={`today-${task.id || idx}`}
                    />
                    <label htmlFor={`today-${task.id || idx}`} className={styles.custom_checkbox}>
                      {completedTasks[task.id] ? "✓" : ""}
                    </label>
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
                      <span className={styles.task_duration}>⏱️ {task.duration}</span>
                      <span className={styles.task_type}>{getTaskTypeIcon(task.type)} {task.type}</span>
                    </div>
                    {task.notes && (
                      <div className={styles.task_notes}>
                        <small>💡 {task.notes}</small>
                      </div>
                    )}
                    {task.resources && task.resources.length > 0 && (
                      <div className={styles.task_resources}>
                        <span>📚 Resources: </span>
                        {task.resources.map(res => (
                          <span key={res} className={styles.resource_tag}>{res}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Schedule Section - All 7 Days */}
        <div className={`${styles.schedule_section} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.section_header}>
            <div className={styles.section_title_wrapper}>
              <CalendarTodayIcon className={styles.section_icon} />
              <div>
                <h2 className={styles.section_title}>Weekly Schedule</h2>
                <p className={styles.section_subtitle}>{getWeekRange()} - Week {currentWeek} of {totalWeeks}</p>
              </div>
            </div>
          </div>

          <div className={styles.weekly_grid}>
            {weeklySchedule.map((day, dayIdx) => {
              const dayCompletedCount = day.tasks.filter(task => completedTasks[task.id]).length;
              const dayProgress = day.tasks.length > 0 ? (dayCompletedCount / day.tasks.length) * 100 : 0;
              
              return (
                <div key={day.day} className={`${styles.day_card} ${day.isToday ? styles.today_card : ""} ${day.isPast ? styles.past_card : ""}`}>
                  <div className={styles.day_header} onClick={() => toggleDay(day.day)}>
                    <div className={styles.day_info}>
                      <div className={styles.day_name_wrapper}>
                        <span className={styles.day_name}>{day.day}</span>
                        {day.isToday && <span className={styles.today_badge}>TODAY</span>}
                        {day.isPast && day.hasTasks && <span className={styles.past_badge}>PAST</span>}
                      </div>
                      <span className={styles.day_date}>{day.dateString}</span>
                      <span className={styles.day_full_date}>{day.fullDateString.split(',')[1]?.trim() || ''}</span>
                      {day.totalHours > 0 && (
                        <div className={styles.day_hours_badge}>{day.totalHours}h</div>
                      )}
                      {!day.hasTasks && (
                        <div className={styles.day_rest_badge}>Rest Day</div>
                      )}
                    </div>
                    <div className={styles.day_stats}>
                      {day.hasTasks && (
                        <div className={styles.day_progress_circle}>
                          <svg className={styles.small_progress} viewBox="0 0 36 36">
                            <path className={styles.progress_bg} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className={styles.progress_fill} stroke="#0A5ADB" strokeDasharray={`${dayProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <text x="18" y="20.5" className={styles.progress_text}>{Math.round(dayProgress)}%</text>
                          </svg>
                        </div>
                      )}
                      {expandedDays[day.day] ? <ExpandLessIcon className={styles.expand_icon} /> : <ExpandMoreIcon className={styles.expand_icon} />}
                    </div>
                  </div>

                  {/* Day Tasks with smooth transition wrapper */}
                  <div className={`${styles.day_tasks} ${expandedDays[day.day] ? styles.expanded : ""}`}>
                    <div>
                      {day.tasks.length > 0 ? (
                        day.tasks.map((task, taskIdx) => (
                          <div key={task.id || taskIdx} className={`${styles.schedule_task} ${completedTasks[task.id] ? styles.completed : ""} ${task.isPast && !completedTasks[task.id] ? styles.missed_task : ""}`}>
                            <label className={styles.task_label}>
                              <input
                                type="checkbox"
                                checked={completedTasks[task.id] || false}
                                onChange={() => toggleTask(task.id)}
                                className={styles.checkbox}
                                disabled={task.isPast && !completedTasks[task.id]}
                              />
                              <span className={styles.task_check}>
                                {completedTasks[task.id] ? 
                                  <CheckCircleIcon className={styles.checked_icon} /> : 
                                  <RadioButtonUncheckedIcon className={styles.unchecked_icon} />
                                }
                              </span>
                              <div className={styles.task_details}>
                                <div className={styles.task_title_row}>
                                  <span className={styles.task_title}>{task.name}</span>
                                  <span className={styles.task_type_badge_small}>{task.type}</span>
                                </div>
                                <div className={styles.task_meta_small}>
                                  <span>🕐 {task.time}</span>
                                  <span>⏱️ {task.duration}</span>
                                  <span>📚 {task.category}</span>
                                </div>
                                {task.notes && (
                                  <div className={styles.task_notes_small}>
                                    <small>💡 {task.notes}</small>
                                  </div>
                                )}
                              </div>
                            </label>
                            <div className={styles.task_badges}>
                              <span className={styles.priority_dot} style={{ background: getPriorityColor(task.priority) }} />
                              <span className={styles.task_type_badge}>{getTaskTypeIcon(task.type)}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className={styles.no_tasks_message}>
                          🎉 No tasks scheduled - Enjoy your day off!
                        </div>
                      )}
                    </div>
                  </div>

                  {day.hasTasks && (
                    <div className={styles.day_footer}>
                      <span>✅ {dayCompletedCount}/{day.tasks.length} completed</span>
                      <span>⏰ {day.totalHours || 0}h total</span>
                    </div>
                  )}
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
              <h3 className={styles.tip_title}>Smart Learning Tips</h3>
              <p className={styles.tip_text}>
                📚 Use active recall: After each session, test yourself on what you learned • 
                ⏱️ Take a 5-10 minute break every 90 minutes • 
                🔄 Review previous day's material for 15 minutes before starting new topics • 
                💪 Complete high-difficulty tasks in the morning when your focus is sharpest
              </p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default StudyPlanner;