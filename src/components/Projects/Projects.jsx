import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CodeIcon from "@mui/icons-material/Code";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import WebIcon from "@mui/icons-material/Web";
import StorageIcon from "@mui/icons-material/Storage";
import SecurityIcon from "@mui/icons-material/Security";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CloudIcon from "@mui/icons-material/Cloud";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GamepadIcon from "@mui/icons-material/Gamepad";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import styles from "./Projects.module.css";
import { getProjectsByCareer, getProjectsByCareerAndLevel } from "./projectData";

const Projects = () => {
  const [animate, setAnimate] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [activeLevel, setActiveLevel] = useState("Beginner");
  const [savedProjects, setSavedProjects] = useState({});
  const [hoveredProject, setHoveredProject] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
    const saved = localStorage.getItem("savedProjects");
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedProjects", JSON.stringify(savedProjects));
  }, [savedProjects]);

  // Complete career paths
  const careerGoals = [
    {
      id: "frontend",
      label: "Frontend Developer",
      icon: <WebIcon />,
      description: "Build beautiful and responsive user interfaces",
      longDescription: "Frontend developers create the visual elements that users interact with. You'll work with HTML, CSS, JavaScript, and modern frameworks like React to build engaging web applications.",
      color: "#6366f1",
      hoverColor: "#4f46e5",
      lightColor: "#eef2ff",
      gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      salary: "$75,000 - $130,000",
      demand: "Very High",
      skills: ["React", "JavaScript", "HTML/CSS", "TypeScript", "Next.js"]
    },
    {
      id: "backend",
      label: "Backend Developer",
      icon: <StorageIcon />,
      description: "Create robust server-side applications",
      longDescription: "Backend developers build the logic, databases, and APIs that power web applications. You'll work with server-side languages, databases, and cloud infrastructure.",
      color: "#10b981",
      hoverColor: "#059669",
      lightColor: "#ecfdf5",
      gradient: "linear-gradient(135deg, #10b981, #34d399)",
      salary: "$80,000 - $140,000",
      demand: "Very High",
      skills: ["Node.js", "Python", "SQL", "APIs", "Cloud"]
    },
    {
      id: "fullstack",
      label: "Full Stack Developer",
      icon: <DeveloperModeIcon />,
      description: "Master both frontend and backend",
      longDescription: "Full stack developers work on both the frontend and backend of applications. You'll have a broad skill set and understand how the entire web application works together.",
      color: "#f59e0b",
      hoverColor: "#d97706",
      lightColor: "#fffbeb",
      gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
      salary: "$85,000 - $150,000",
      demand: "Highest",
      skills: ["React", "Node.js", "MongoDB", "Express", "GraphQL"]
    },
    {
      id: "mobile",
      label: "Mobile Developer",
      icon: <PhoneAndroidIcon />,
      description: "Create amazing mobile experiences",
      longDescription: "Mobile developers build applications for iOS and Android devices. You'll create native or cross-platform apps that millions of users use every day.",
      color: "#ef4444",
      hoverColor: "#dc2626",
      lightColor: "#fef2f2",
      gradient: "linear-gradient(135deg, #ef4444, #f87171)",
      salary: "$85,000 - $145,000",
      demand: "High",
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"]
    },
    {
      id: "devops",
      label: "DevOps Engineer",
      icon: <CloudIcon />,
      description: "Master deployment and infrastructure",
      longDescription: "DevOps engineers bridge the gap between development and operations. You'll automate deployments, manage cloud infrastructure, and ensure applications run smoothly.",
      color: "#06b6d4",
      hoverColor: "#0891b2",
      lightColor: "#ecfeff",
      gradient: "linear-gradient(135deg, #06b6d4, #22d3ee)",
      salary: "$90,000 - $160,000",
      demand: "High",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"]
    },
    {
      id: "security",
      label: "Security Engineer",
      icon: <SecurityIcon />,
      description: "Protect systems and data",
      longDescription: "Security engineers protect applications and infrastructure from cyber threats. You'll identify vulnerabilities, implement security measures, and respond to incidents.",
      color: "#8b5cf6",
      hoverColor: "#7c3aed",
      lightColor: "#f5f3ff",
      gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
      salary: "$95,000 - $165,000",
      demand: "Growing",
      skills: ["Python", "Penetration Testing", "Compliance"]
    },
    {
      id: "data",
      label: "Data Scientist",
      icon: <DataUsageIcon />,
      description: "Extract insights from data",
      longDescription: "Data scientists analyze complex data to help companies make better decisions. You'll use statistics, machine learning, and data visualization to find patterns and insights.",
      color: "#ec4899",
      hoverColor: "#db2777",
      lightColor: "#fdf2f8",
      gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
      salary: "$90,000 - $155,000",
      demand: "High",
      skills: ["Python", "SQL", "Machine Learning", "Statistics", "Pandas"]
    },
    {
      id: "ai",
      label: "AI/ML Engineer",
      icon: <PsychologyIcon />,
      description: "Build intelligent systems",
      longDescription: "AI/ML engineers build and deploy machine learning models that power intelligent applications. You'll work with neural networks, natural language processing, and computer vision.",
      color: "#14b8a6",
      hoverColor: "#0d9488",
      lightColor: "#f0fdfa",
      gradient: "linear-gradient(135deg, #14b8a6, #5eead4)",
      salary: "$100,000 - $180,000",
      demand: "Very High",
      skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Deep Learning"]
    },
    {
      id: "game",
      label: "Game Developer",
      icon: <GamepadIcon />,
      description: "Create immersive gaming experiences",
      longDescription: "Game developers design and build video games for consoles, PCs, and mobile devices. You'll work with game engines, 3D graphics, and physics to create engaging gameplay.",
      color: "#f97316",
      hoverColor: "#ea580c",
      lightColor: "#fff7ed",
      gradient: "linear-gradient(135deg, #f97316, #fb923c)",
      salary: "$70,000 - $140,000",
      demand: "Moderate",
      skills: ["Unity", "C#", "Unreal Engine", "C++", "3D Modeling"]
    },
    {
      id: "uiux",
      label: "UI/UX Designer",
      icon: <DesignServicesIcon />,
      description: "Design beautiful user experiences",
      longDescription: "UI/UX designers create intuitive and visually appealing interfaces. You'll research user needs, design wireframes, and create prototypes for web and mobile applications.",
      color: "#a855f7",
      hoverColor: "#9333ea",
      lightColor: "#faf5ff",
      gradient: "linear-gradient(135deg, #a855f7, #c084fc)",
      salary: "$70,000 - $125,000",
      demand: "High",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing"]
    }
  ];

  const levelSteps = [
    {
      id: "Beginner",
      label: "Beginner",
      icon: <SchoolIcon />,
      description: "Perfect for starting your journey",
      color: "#10b981"
    },
    {
      id: "Intermediate",
      label: "Intermediate",
      icon: <TrendingUpIcon />,
      description: "Level up your skills",
      color: "#f59e0b"
    },
    {
      id: "Advanced",
      label: "Advanced",
      icon: <RocketLaunchIcon />,
      description: "Master complex projects",
      color: "#dc2626"
    }
  ];

  const getProjectCountForCareer = (careerId) => {
    const projects = getProjectsByCareer(careerId);
    return projects.length;
  };

  const getCurrentProjects = () => {
    if (!selectedCareer) return [];
    return getProjectsByCareerAndLevel(selectedCareer.id, activeLevel);
  };

  const handleCareerSelect = (career) => {
    setSelectedCareer(career);
    setActiveLevel("Beginner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToCareers = () => {
    setSelectedCareer(null);
    setActiveLevel("Beginner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveProject = (projectId, e) => {
    e.stopPropagation();
    setSavedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`, { state: { project } });
  };

  const getTechIcon = (tech) => {
    const icons = {
      // Frontend
      "React": "⚛️",
      "React Native": "📱",
      "HTML5": "🌐",
      "CSS3": "🎨",
      "JavaScript": "💛",
      "TypeScript": "📘",
      "Next.js": "▲",
      "Tailwind CSS": "🎨",
      "Redux Toolkit": "🔄",
      "DnD Kit": "🖱️",
      "Monaco Editor": "📝",
      "Chart.js": "📊",

      // Backend
      "Node.js": "🚀",
      "Express": "🚂",
      "MongoDB": "🍃",
      "PostgreSQL": "🐘",
      "Redis": "📀",
      "JWT": "🔐",
      "Bcrypt": "🔒",
      "Joi": "✅",
      "Bull": "🐂",
      "BullMQ": "🐂",
      "RabbitMQ": "🐰",

      // APIs & Integration
      "Axios": "📡",
      "Socket.io": "🔌",
      "WebRTC": "📹",
      "GraphQL": "📡",
      "OpenWeatherMap API": "🌤️",
      "NewsAPI": "📰",
      "Stripe": "💳",
      "Google Maps": "🗺️",

      // DevOps & Cloud
      "Docker": "🐳",
      "Kubernetes": "☸️",
      "AWS": "☁️",
      "AWS EC2": "☁️",
      "AWS ECR": "📦",
      "GCP": "☁️",
      "Azure": "☁️",
      "Terraform": "🏗️",
      "Istio": "🔗",
      "Vault": "🔐",
      "GitHub Actions": "⚡",
      "Nginx": "🌐",
      "Prometheus": "📈",
      "Grafana": "📊",
      "Helm": "⛑️",
      "Git": "📝",

      // Data Science & ML
      "Python": "🐍",
      "Pandas": "🐼",
      "NumPy": "🔢",
      "Matplotlib": "📈",
      "Seaborn": "🌊",
      "Scikit-learn": "📊",
      "Scikit-learn": "🤖",
      "TensorFlow": "🧠",
      "Keras": "🔧",
      "PyTorch": "🔥",
      "Transformers": "🤗",
      "HuggingFace": "🤗",
      "LangChain": "⛓️",
      "OpenAI API": "🤖",
      "YOLO": "👁️",
      "OpenCV": "📷",
      "Streamlit": "🌊",
      "Plotly": "📈",
      "FastAPI": "⚡",
      "Jupyter": "📓",
      "DVC": "📦",
      "MLflow": "📋",
      "Airflow": "🌀",
      "Statsmodels": "📊",
      "Prophet": "📅",
      "Surprise": "🎁",
      "Chroma": "🎨",
      "FAISS": "🔍",
      "OpenAI Gym": "🎮",
      "Stable-Baselines3": "🤖",
      "Ray RLlib": "⚡",
      "TensorBoard": "📊",

      // Mobile
      "Expo": "📱",
      "SQLite": "🗄️",
      "AsyncStorage": "💾",
      "React Navigation": "🧭",

      // Game Development
      "C#": "🎮",
      "Unity": "🎮",
      "Unity Netcode": "🌐",
      "Photon": "📡",
      "ProBuilder": "🔨",
      "Shader Graph": "🎨",
      "Addressables": "📦",
      "FMOD": "🎵",
      "Procedural Generation": "🎲",
      "Unity Ads": "📺",
      "Wheel Colliders": "🛞",
      "Blender": "🧊",
      "ECS/DOTS": "⚡",

      // UI/UX & Design
      "Figma": "🎨",
      "Adobe XD": "🎨",
      "Miro": "📋",
      "Auto Layout": "📐",
      "Variants": "🔄",
      "Design Tokens": "🏷️",
      "Chromatic": "🎨",
      "User Research": "🔍",
      "Usability Testing": "✅",

      // Security
      "Requests": "📨",
      "BeautifulSoup": "🍜",
      "Scapy": "📡",
      "Elasticsearch": "🔍",
      "Kibana": "📊",
      "Logstash": "📝",
      "Kafka": "📨",
      "NLTK": "📚",
      "zxcvbn": "🔐",
      "OTP": "📱",
      "TOTP": "⏰",
      "OAuth2": "🔑",
      "Rate Limiting": "🚦",
      "Albumentations": "🖼️",
      "MITRE ATT&CK": "🎯",

      // General
      "Code": "💻",
      "API": "🔌",
      "REST": "🌐",
      "CLI": "💻",
      "YAML": "📄",
      "Photoshop": "🎨",
      "ASEprite": "🎨"
    };

    // Handle partial matches for technologies
    const exactMatch = icons[tech];
    if (exactMatch) return exactMatch;

    // Check for partial matches
    if (tech.includes("Scikit-learn")) return "📊";
    if (tech.includes("TensorFlow")) return "🧠";
    if (tech.includes("PyTorch")) return "🔥";
    if (tech.includes("OpenCV")) return "📷";
    if (tech.includes("Storybook")) return "📖";
    if (tech.includes("Chromatic")) return "🎨";

    return "💻";
  };

  const getLevelColor = (level) => {
    switch(level) {
      case "Beginner": return "#10b981";
      case "Intermediate": return "#f59e0b";
      case "Advanced": return "#dc2626";
      default: return "#6366f1";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Easy": return { bg: "#10b98120", color: "#10b981", hover: "#10b98130" };
      case "Moderate": return { bg: "#f59e0b20", color: "#f59e0b", hover: "#f59e0b30" };
      case "Challenging": return { bg: "#f9731620", color: "#f97316", hover: "#f9731630" };
      case "Expert": return { bg: "#dc262620", color: "#dc2626", hover: "#dc262630" };
      default: return { bg: "#6366f120", color: "#6366f1", hover: "#6366f130" };
    }
  };

  // Career Selection Screen
  if (!selectedCareer) {
    return (
      <Box component="main" className={styles.projects_container}>
        <div className={styles.bg_blur_1}></div>
        <div className={styles.bg_blur_2}></div>
        <div className={styles.bg_blur_3}></div>
        <div className={styles.bg_blur_4}></div>

        <div className={styles.projects_content}>
          <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
            <div className={styles.header_left}>
              <div className={styles.header_icon_wrapper}>
                <CodeIcon className={styles.header_icon} />
              </div>
              <div>
                <h1 className={styles.header_title}>Choose Your Career Path</h1>
                <p className={styles.header_subtitle}>
                  Select a career goal to see personalized projects that will help you build the right skills
                </p>
              </div>
            </div>
          </div>

          <div className={styles.career_grid}>
            {careerGoals.map((career, index) => (
              <div
                key={career.id}
                className={`${styles.career_card} ${animate ? styles.slide_up : ""}`}
                style={{ 
                  animationDelay: `${index * 0.05}s`,
                  '--career-color': career.color,
                  '--career-hover': career.hoverColor,
                  '--career-light': career.lightColor
                }}
                onClick={() => handleCareerSelect(career)}
              >
                <div className={styles.career_card_icon} style={{ background: `${career.color}15`, color: career.color }}>
                  {career.icon}
                </div>
                <h3 className={styles.career_card_title}>{career.label}</h3>
                <p className={styles.career_card_description}>{career.description}</p>
                <div className={styles.career_card_stats}>
                  <div className={styles.career_stat}>
                    <span className={styles.career_stat_label}>Projects</span>
                    <span className={styles.career_stat_value}>{getProjectCountForCareer(career.id)}+</span>
                  </div>
                  <div className={styles.career_stat}>
                    <span className={styles.career_stat_label}>Demand</span>
                    <span className={styles.career_stat_value} style={{ color: career.color }}>{career.demand}</span>
                  </div>
                </div>
                <div className={styles.career_card_skills}>
                  {career.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className={styles.career_skill_tag}>{skill}</span>
                  ))}
                  {career.skills.length > 3 && (
                    <span className={styles.career_skill_tag}>+{career.skills.length - 3}</span>
                  )}
                </div>
                <button 
                  className={styles.career_select_btn} 
                  style={{ background: career.gradient }}
                >
                  View Projects ({getProjectCountForCareer(career.id)})
                </button>
              </div>
            ))}
          </div>

          <div className={styles.motivation_section}>
            <div className={styles.motivation_content}>
              <span className={styles.motivation_icon}>💡</span>
              <p className={styles.motivation_text}>
                Not sure which path to choose? Each career path includes beginner-friendly projects that will help you discover your interests. 
                Start with any path and switch anytime! All projects include step-by-step guides, learning outcomes, and practical exercises.
              </p>
            </div>
          </div>
        </div>
      </Box>
    );
  }

  // Projects View for Selected Career
  const currentProjects = getCurrentProjects();
  const currentCareer = selectedCareer;

  return (
    <Box component="main" className={styles.projects_container}>
      <div className={styles.bg_blur_1} style={{ background: `radial-gradient(circle, ${currentCareer.color}15, transparent)` }}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3} style={{ background: `radial-gradient(circle, ${currentCareer.color}10, transparent)` }}></div>
      <div className={styles.bg_blur_4}></div>

      <div className={styles.projects_content}>
        {/* Career Header */}
        <div className={`${styles.career_header} ${animate ? styles.fade_in : ""}`}>
          <button 
            className={styles.back_to_careers} 
            onClick={handleBackToCareers}
            style={{ '--career-color': currentCareer.color }}
          >
            ← All Career Paths
          </button>
          <div className={styles.career_header_content} style={{ borderColor: `${currentCareer.color}20` }}>
            <div className={styles.career_header_icon} style={{ background: `${currentCareer.color}15`, color: currentCareer.color }}>
              {currentCareer.icon}
            </div>
            <div className={styles.career_header_info}>
              <h1 className={styles.career_header_title}>{currentCareer.label}</h1>
              <p className={styles.career_header_description}>{currentCareer.longDescription}</p>
            </div>
          </div>
        </div>

        {/* Level Steps */}
        <div className={`${styles.level_section} ${animate ? styles.slide_up : ""}`}>
          <div className={styles.level_container}>
            {levelSteps.map((level) => {
              const projectCount = getProjectsByCareerAndLevel(currentCareer.id, level.id).length;
              return (
                <button
                  key={level.id}
                  className={`${styles.level_item} ${activeLevel === level.id ? styles.active : ""}`}
                  onClick={() => setActiveLevel(level.id)}
                  style={{
                    '--level-color': level.color,
                    '--career-color': currentCareer.color
                  }}
                >
                  <div className={styles.level_icon} style={{ color: activeLevel === level.id ? currentCareer.color : "#9ca3af" }}>
                    {level.icon}
                  </div>
                  <div className={styles.level_content}>
                    <span className={styles.level_label}>{level.label}</span>
                    <span className={styles.level_description}>
                      {projectCount} project{projectCount !== 1 ? 's' : ''} available
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className={styles.projects_grid}>
          {currentProjects.length > 0 ? (
            currentProjects.map((project, index) => {
              const difficultyStyle = getDifficultyColor(project.difficulty);
              const isSaved = savedProjects[project.id];
              const isHovered = hoveredProject === project.id;
              
              return (
                <div
                  key={project.id}
                  className={`${styles.project_card} ${animate ? styles.slide_up : ""}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    '--career-color': currentCareer.color,
                    '--career-hover': currentCareer.hoverColor,
                    '--career-light': currentCareer.lightColor
                  }}
                  onClick={() => handleProjectClick(project)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className={styles.card_header}>
                    <div className={styles.project_icon} style={{ background: `${currentCareer.color}15` }}>
                      <span>{project.toolsIcon}</span>
                    </div>
                    <div className={styles.level_badge} style={{ background: getLevelColor(project.level) }}>
                      {project.level}
                    </div>
                  </div>

                  <h3 className={styles.project_title}>{project.title}</h3>
                  <p className={styles.project_description}>{project.shortDescription || project.description}</p>

                  <div className={styles.tools_section}>
                    <div className={styles.tools_header}>
                      <span className={styles.tools_icon} style={{ background: `${currentCareer.color}15`, color: currentCareer.color }}>&lt; &gt;</span>
                      <span className={styles.tools_label}>Tech Stack</span>
                    </div>
                    <div className={styles.tech_stack}>
                      {project.tech.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className={styles.tech_badge}>
                          <span className={styles.tech_icon}>{getTechIcon(tech)}</span>
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className={styles.tech_badge}>+{project.tech.length - 4}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.features_section}>
                    <h4 className={styles.features_title}>Key Features</h4>
                    <ul className={styles.features_list}>
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>
                          <CheckCircleIcon className={styles.feature_icon} style={{ color: currentCareer.color }} />
                          {feature}
                        </li>
                      ))}
                      {project.features.length > 3 && (
                        <li className={styles.more_features}>+{project.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>

                  <div className={styles.card_footer}>
                    <div className={styles.duration}>
                      <AccessTimeIcon className={styles.duration_icon} />
                      <span>{project.duration}</span>
                    </div>
                    <div className={styles.difficulty_badge} style={{ 
                      background: difficultyStyle.bg,
                      color: difficultyStyle.color
                    }}>
                      {project.difficulty}
                    </div>
                    <button 
                      className={styles.view_project_btn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}
                      style={{ 
                        borderColor: isHovered ? currentCareer.hoverColor : currentCareer.color,
                        color: currentCareer.color
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = currentCareer.color;
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = currentCareer.color;
                      }}
                    >
                      View Project →
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.empty_state}>
              <p>No {activeLevel} level projects available for {currentCareer.label} yet.</p>
              <p className={styles.empty_state_sub}>
                Check back soon for more projects or try a different skill level.
                {activeLevel === "Beginner" ? " Start with beginner projects from other career paths!" : 
                 activeLevel === "Intermediate" ? " Complete beginner projects first to advance!" : 
                 " Master intermediate projects before tackling advanced ones!"}
              </p>
            </div>
          )}
        </div>

        {/* Level Recommendation */}
        {currentProjects.length === 0 && (
          <div className={styles.recommendation_section}>
            <h3>📚 Recommended Learning Path</h3>
            <p>
              {activeLevel === "Advanced" && getProjectsByCareerAndLevel(currentCareer.id, "Intermediate").length > 0 &&
                "Complete all intermediate projects before starting advanced ones."}
              {activeLevel === "Intermediate" && getProjectsByCareerAndLevel(currentCareer.id, "Beginner").length > 0 &&
                "Start with the beginner projects to build foundational skills first."}
              {activeLevel === "Beginner" && 
                "Beginner projects are coming soon! Meanwhile, explore other career paths."}
            </p>
          </div>
        )}

        <div className={styles.motivation_section}>
          <div className={styles.motivation_content}>
            <span className={styles.motivation_icon}>💡</span>
            <p className={styles.motivation_text}>
              Start with beginner projects to build foundational skills, then progress to intermediate and advanced projects. 
              Each project includes detailed guides, learning outcomes, prerequisites, and step-by-step instructions to help you succeed!
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default Projects;