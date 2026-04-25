import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import styles from "./Projects.module.css";

const Projects = () => {
  const [animate, setAnimate] = useState(false);
  const [activeLevel, setActiveLevel] = useState("beginner");
  const [savedProjects, setSavedProjects] = useState({});

  useEffect(() => {
    setAnimate(true);
  }, []);

  const stepperSteps = [
    {
      id: "beginner",
      label: "Beginner",
      icon: <SchoolIcon />,
      description: "Perfect for starting your journey",
      color: "#10b981"
    },
    {
      id: "intermediate",
      label: "Intermediate",
      icon: <TrendingUpIcon />,
      description: "Level up your skills",
      color: "#f59e0b"
    },
    {
      id: "advanced",
      label: "Advanced",
      icon: <RocketLaunchIcon />,
      description: "Master complex projects",
      color: "#dc2626"
    }
  ];

  const projectsData = {
    beginner: [
      {
        id: 1,
        title: "Todo List App",
        description: "Build a simple task management application",
        tech: ["React", "CSS"],
        toolsIcon: "⚛️",
        features: [
          "Add/Delete tasks",
          "Mark complete",
          "Filter options"
        ],
        duration: "1-2 weeks",
        level: "Beginner",
        mainTech: "React",
        saved: false
      },
      {
        id: 2,
        title: "Weather Dashboard",
        description: "Display weather data using a public API",
        tech: ["HTML", "CSS", "JavaScript"],
        toolsIcon: "🌤️",
        features: [
          "Current weather",
          "5-day forecast",
          "Search cities"
        ],
        duration: "1 week",
        level: "Beginner",
        mainTech: "JavaScript",
        saved: false
      },
      {
        id: 3,
        title: "Portfolio Website",
        description: "Create your personal portfolio",
        tech: ["HTML", "CSS", "JavaScript"],
        toolsIcon: "🎨",
        features: [
          "About section",
          "Projects showcase",
          "Contact form"
        ],
        duration: "1 week",
        level: "Beginner",
        mainTech: "JavaScript",
        saved: false
      }
    ],
    intermediate: [
      {
        id: 4,
        title: "E-commerce Store",
        description: "Full-featured online shopping platform",
        tech: ["Node.js", "React", "MongoDB"],
        toolsIcon: "🛒",
        features: [
          "Shopping cart",
          "Payment integration",
          "User auth"
        ],
        duration: "4-6 weeks",
        level: "Intermediate",
        mainTech: "React",
        saved: false
      },
      {
        id: 5,
        title: "Social Media Dashboard",
        description: "Analytics dashboard for social media metrics",
        tech: ["CSS", "HTML", "JavaScript"],
        toolsIcon: "📊",
        features: [
          "Data visualization",
          "Real-time updates",
          "Filter & export"
        ],
        duration: "3 weeks",
        level: "Intermediate",
        mainTech: "JavaScript",
        saved: false
      },
      {
        id: 6,
        title: "Blog Platform",
        description: "Content management system for blogging",
        tech: ["CSS", "HTML", "JavaScript"],
        toolsIcon: "📝",
        features: [
          "Post creation",
          "Comments",
          "Admin panel"
        ],
        duration: "4 weeks",
        level: "Intermediate",
        mainTech: "JavaScript",
        saved: false
      }
    ],
    advanced: [
      {
        id: 7,
        title: "Video Streaming Platform",
        description: "Build a Netflix-like application",
        tech: ["Node.js", "React", "MongoDB"],
        toolsIcon: "🎬",
        features: [
          "Video upload",
          "Streaming",
          "User profiles",
          "Recommendations"
        ],
        duration: "8-10 weeks",
        level: "Advanced",
        mainTech: "React",
        saved: false
      },
      {
        id: 8,
        title: "Real-time Collaboration Tool",
        description: "Slack-like team communication platform",
        tech: ["CSS", "HTML", "Java"],
        toolsIcon: "💬",
        features: [
          "Real-time messaging",
          "Channels",
          "File sharing",
          "Search"
        ],
        duration: "10-12 weeks",
        level: "Advanced",
        mainTech: "Java",
        saved: false
      },
      {
        id: 9,
        title: "AI-Powered Chatbot",
        description: "Intelligent customer support assistant",
        tech: ["CSS", "HTML", "JavaScript"],
        toolsIcon: "🤖",
        features: [
          "Natural language processing",
          "Intent recognition",
          "Learning capability"
        ],
        duration: "8 weeks",
        level: "Advanced",
        mainTech: "JavaScript",
        saved: false
      }
    ]
  };

  const handleSaveProject = (projectId) => {
    setSavedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const getTechIcon = (tech) => {
    const icons = {
      "React": "⚛️",
      "Node.js": "🚀",
      "MongoDB": "🍃",
      "CSS": "🎨",
      "HTML": "🌐",
      "JavaScript": "💛",
      "Java": "☕"
    };
    return icons[tech] || "💻";
  };

  const currentProjects = projectsData[activeLevel];
  const currentStepIndex = stepperSteps.findIndex(step => step.id === activeLevel);

  return (
    <Box component="main" className={styles.projects_container}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.projects_content}>
        {/* Header Section */}
        <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.header_left}>
            <div className={styles.header_icon_wrapper}>
              <CodeIcon className={styles.header_icon} />
            </div>
            <div>
              <h1 className={styles.header_title}>Portfolio Projects</h1>
              <p className={styles.header_subtitle}>
                Hand-picked project ideas to build your portfolio and showcase your skills
              </p>
            </div>
          </div>
        </div>

        {/* Modern Stepper Section */}
        <div className={`${styles.stepper_section} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.stepper_container}>
            {stepperSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  className={`${styles.step_item} ${activeLevel === step.id ? styles.active : ""} ${currentStepIndex > index ? styles.completed : ""}`}
                  onClick={() => setActiveLevel(step.id)}
                >
                  <div className={styles.step_icon_wrapper} style={{ 
                    background: activeLevel === step.id ? step.color : 
                               currentStepIndex > index ? step.color : "#e0e0e0",
                    boxShadow: activeLevel === step.id ? `0 0 0 4px ${step.color}20` : "none"
                  }}>
                    {currentStepIndex > index ? (
                      <CheckCircleIcon className={styles.step_icon_completed} />
                    ) : (
                      <span className={styles.step_icon}>{step.icon}</span>
                    )}
                  </div>
                  <div className={styles.step_content}>
                    <span className={styles.step_label}>{step.label}</span>
                    <span className={styles.step_description}>{step.description}</span>
                  </div>
                  {activeLevel === step.id && <div className={styles.step_glow}></div>}
                </button>
                {index < stepperSteps.length - 1 && (
                  <div className={`${styles.stepper_connector} ${currentStepIndex > index ? styles.connector_active : ""}`}>
                    <div className={styles.connector_line}></div>
                    <div className={styles.connector_dot}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Stepper (Horizontal Scroll) */}
          <div className={styles.mobile_stepper}>
            <div className={styles.mobile_stepper_track}>
              {stepperSteps.map((step, index) => (
                <button
                  key={step.id}
                  className={`${styles.mobile_step} ${activeLevel === step.id ? styles.active : ""}`}
                  onClick={() => setActiveLevel(step.id)}
                  style={{ 
                    borderColor: activeLevel === step.id ? step.color : "#e0e0e0",
                    background: activeLevel === step.id ? `${step.color}10` : "white"
                  }}
                >
                  <div className={styles.mobile_step_icon} style={{ color: activeLevel === step.id ? step.color : "#999" }}>
                    {step.icon}
                  </div>
                  <span className={styles.mobile_step_label}>{step.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={styles.projects_grid}>
          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.project_card} ${animate ? styles.slide_up : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Header */}
              <div className={styles.card_header}>
                <div className={styles.project_icon}>
                  <span>{project.toolsIcon}</span>
                </div>
                <button
                  className={styles.save_btn}
                  onClick={() => handleSaveProject(project.id)}
                >
                  {savedProjects[project.id] ? (
                    <BookmarkIcon className={styles.saved_icon} />
                  ) : (
                    <BookmarkBorderIcon className={styles.save_icon} />
                  )}
                </button>
              </div>

              {/* Project Title */}
              <h3 className={styles.project_title}>{project.title}</h3>
              <p className={styles.project_description}>{project.description}</p>

              {/* Tools & Technologies Section */}
              <div className={styles.tools_section}>
                <div className={styles.tools_header}>
                  <span className={styles.tools_icon}>&lt; &gt;</span>
                  <span className={styles.tools_label}>Tools & Technologies</span>
                </div>
                <div className={styles.tech_stack}>
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className={styles.tech_badge}>
                      <span className={styles.tech_icon}>{getTechIcon(tech)}</span>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className={styles.features_section}>
                <h4 className={styles.features_title}>Key Features</h4>
                <ul className={styles.features_list}>
                  {project.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircleIcon className={styles.feature_icon} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer */}
              <div className={styles.card_footer}>
                <div className={styles.duration}>
                  <AccessTimeIcon className={styles.duration_icon} />
                  <span>{project.duration}</span>
                </div>
                <button className={styles.save_project_btn}>
                  Save Project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Message */}
        <div className={styles.motivation_section}>
          <div className={styles.motivation_content}>
            <span className={styles.motivation_icon}>💡</span>
            <p className={styles.motivation_text}>
              Start with projects that match your current skill level. Each project you complete adds real value to your portfolio!
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Projects;