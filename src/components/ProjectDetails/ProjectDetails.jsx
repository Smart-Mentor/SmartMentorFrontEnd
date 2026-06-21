import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import YouTubeIcon from "@mui/icons-material/YouTube";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FlagIcon from "@mui/icons-material/Flag";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { getProjectById } from "../Projects/projectData";
import styles from "./ProjectDetails.module.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [project, setProject] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    let currentProject = location.state?.project;
    
    if (!currentProject && id) {
      currentProject = getProjectById(id);
    }
    
    setProject(currentProject);
  }, [id, location.state]);

  useEffect(() => {
    if (!project) return;
    const savedProjects = localStorage.getItem("savedProjects");
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      setSaved(parsed[project.id] || false);
    }
  }, [project]);

  const handleSaveProject = () => {
    if (!project) return;
    const savedProjects = localStorage.getItem("savedProjects");
    const parsed = savedProjects ? JSON.parse(savedProjects) : {};
    const newSaved = { ...parsed, [project.id]: !saved };
    localStorage.setItem("savedProjects", JSON.stringify(newSaved));
    setSaved(!saved);
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const patterns = [
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/embed\/([^?]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }
    return null;
  };

  const getLevelIcon = (level) => {
    switch(level) {
      case "Beginner": return <SchoolIcon />;
      case "Intermediate": return <TrendingUpIcon />;
      case "Advanced": return <RocketLaunchIcon />;
      default: return <SchoolIcon />;
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case "Beginner": return "#10b981";
      case "Intermediate": return "#f59e0b";
      case "Advanced": return "#dc2626";
      default: return "#3b82f6";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Easy": return "#10b981";
      case "Moderate": return "#f59e0b";
      case "Challenging": return "#f97316";
      case "Expert": return "#dc2626";
      default: return "#3b82f6";
    }
  };

  const getTechIcon = (tech) => {
    const icons = {
      "React": "⚛️",
      "HTML5": "🌐",
      "CSS3": "🎨",
      "JavaScript": "💛",
      "Node.js": "🚀",
      "Python": "🐍",
      "Unity": "🎮",
      "Figma": "🎨",
    };
    return icons[tech] || "💻";
  };

  // Check if there are any links to display
  const hasAnyLinks = project?.videoTutorial || project?.liveDemo;
  
  // Check if there are any tips or mistakes
  const hasTipsOrMistakes = (project?.tips && project.tips.length > 0) || (project?.commonMistakes && project.commonMistakes.length > 0);
  
  // Safe check for resources
  const hasResources = project?.resources && Array.isArray(project.resources) && project.resources.length > 0;

  if (!project) {
    return (
      <Box component="main" className={styles.details_container}>
        <div className={styles.bg_blur_1}></div>
        <div className={styles.bg_blur_2}></div>
        <div className={styles.bg_blur_3}></div>
        <div className={styles.details_content}>
          <div className={styles.notFoundContainer}>
            <h2 className={styles.notFound}>Project Not Found</h2>
            <p className={styles.notFoundText}>The project you're looking for doesn't exist or has been moved.</p>
            <button className={styles.backButton} onClick={() => navigate("/projects")}>
              ← Back to Projects
            </button>
          </div>
        </div>
      </Box>
    );
  }

  return (
    <Box component="main" className={styles.details_container}>
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      {/* Video Modal */}
      {showVideoModal && project.videoTutorial && (
        <div className={styles.modal_overlay} onClick={() => setShowVideoModal(false)}>
          <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modal_close} onClick={() => setShowVideoModal(false)}>×</button>
            <iframe
              className={styles.video_iframe}
              src={getYouTubeEmbedUrl(project.videoTutorial)}
              title="Project Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className={styles.details_content}>
        {/* Header Actions */}
        <div className={styles.header_actions}>
          <button className={styles.backButton} onClick={() => navigate("/projects")}>
            <ArrowBackIcon className={styles.backIcon} />
            Back to Projects
          </button>
        </div>

        {/* Project Header */}
        <div className={styles.project_header}>
          <div className={styles.project_icon_large} style={{ background: `${project.careerColor}20` }}>
            <span>{project.toolsIcon}</span>
          </div>
          <div className={styles.project_info}>
            <h1 className={styles.project_title}>{project.title}</h1>
            <p className={styles.project_description}>{project.shortDescription || project.description}</p>
            <div className={styles.project_badges}>
              <span className={styles.badge} style={{ background: getLevelColor(project.level), color: "white" }}>
                {getLevelIcon(project.level)} {project.level}
              </span>
              <span className={styles.badge} style={{ background: getDifficultyColor(project.difficulty), color: "white" }}>
                <FlagIcon /> {project.difficulty}
              </span>
              <span className={styles.badge}>
                <AccessTimeIcon /> {project.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Video Tutorial Banner */}
        {project.videoTutorial && (
          <div className={styles.video_banner} onClick={() => setShowVideoModal(true)}>
            <div className={styles.video_banner_content}>
              <YouTubeIcon className={styles.video_youtube_icon} />
              <div>
                <div className={styles.video_banner_title}>📺 Watch Step-by-Step Tutorial</div>
                <div className={styles.video_banner_subtitle}>Follow along with our complete video guide</div>
              </div>
              <button className={styles.watch_button_red}>
                <PlayCircleIcon /> Watch Now →
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className={styles.stats_grid}>
          <div className={styles.stat_card}>
            <div className={styles.stat_icon}>📚</div>
            <div className={styles.stat_info}>
              <div className={styles.stat_label}>Prerequisites</div>
              <div className={styles.stat_value}>{project.prerequisites?.join(", ") || "Basic knowledge of relevant technologies"}</div>
            </div>
          </div>
          <div className={styles.stat_card}>
            <div className={styles.stat_icon}>⏰</div>
            <div className={styles.stat_info}>
              <div className={styles.stat_label}>Estimated Time</div>
              <div className={styles.stat_value}>{project.estimatedHours || 40} hours</div>
            </div>
          </div>
          <div className={styles.stat_card}>
            <div className={styles.stat_icon}>✅</div>
            <div className={styles.stat_info}>
              <div className={styles.stat_label}>Tasks</div>
              <div className={styles.stat_value}>{project.totalTasks || project.steps?.length || 10} steps</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={styles.tabs_container}>
          <button 
            className={`${styles.tab} ${activeTab === "overview" ? styles.active_tab : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <MenuBookIcon /> Overview
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "learning" ? styles.active_tab : ""}`}
            onClick={() => setActiveTab("learning")}
          >
            <SchoolIcon /> Learning Outcomes
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "steps" ? styles.active_tab : ""}`}
            onClick={() => setActiveTab("steps")}
          >
            <ChecklistIcon /> Steps
          </button>
          <button 
            className={`${styles.tab} ${activeTab === "resources" ? styles.active_tab : ""}`}
            onClick={() => setActiveTab("resources")}
          >
            <ListAltIcon /> Resources
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tab_content}>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className={styles.overview_tab}>
              {/* Tech Stack */}
              <div className={styles.section_card}>
                <h3 className={styles.section_title}>
                  <CodeIcon /> Tech Stack
                </h3>
                <div className={styles.tech_stack}>
                  {project.tech?.map((tech, idx) => (
                    <span key={idx} className={styles.tech_badge_large}>
                      <span className={styles.tech_icon_large}>{getTechIcon(tech)}</span>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className={styles.section_card}>
                <h3 className={styles.section_title}>
                  <CheckCircleIcon /> Key Features
                </h3>
                <div className={styles.features_grid}>
                  {project.features?.map((feature, idx) => (
                    <div key={idx} className={styles.feature_item_large}>
                      <CheckCircleIcon className={styles.feature_check} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips & Common Mistakes */}
              {hasTipsOrMistakes && (
                <div className={styles.tips_mistakes_grid}>
                  {project.tips && project.tips.length > 0 && (
                    <div className={styles.section_card}>
                      <h3 className={styles.section_title}>💡 Pro Tips</h3>
                      <ul className={styles.tips_list}>
                        {project.tips.map((tip, idx) => (
                          <li key={idx}>
                            <span className={styles.tip_bullet}>✨</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.commonMistakes && project.commonMistakes.length > 0 && (
                    <div className={styles.section_card}>
                      <h3 className={styles.section_title}>⚠️ Common Mistakes</h3>
                      <ul className={styles.mistakes_list}>
                        {project.commonMistakes.map((mistake, idx) => (
                          <li key={idx}>
                            <span className={styles.mistake_bullet}>❗</span>
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Links Card */}
              {hasAnyLinks && (
                <div className={styles.links_card}>
                  <h3 className={styles.section_title}>🔗 Project Links</h3>
                  <div className={styles.links_grid}>
                    {/* YouTube Button */}
                    {project.videoTutorial && (
                      <button 
                        onClick={() => setShowVideoModal(true)} 
                        className={styles.youtube_link_btn}
                      >
                        <YouTubeIcon /> Watch Tutorial
                        <PlayCircleIcon className={styles.link_icon} />
                      </button>
                    )}
                    {/* Demo Button  */}
                    {project.liveDemo && (
                      <a 
                        href={project.liveDemo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.demo_link_btn}
                      >
                        <OpenInNewIcon /> Live Demo
                        <OpenInNewIcon className={styles.link_icon} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Learning Outcomes Tab */}
          {activeTab === "learning" && (
            <div className={styles.learning_tab}>
              <div className={styles.section_card}>
                <h3 className={styles.section_title}>
                  <SchoolIcon /> What You'll Learn
                </h3>
                <div className={styles.learning_grid}>
                  {project.learningOutcomes?.map((outcome, idx) => (
                    <div key={idx} className={styles.learning_item}>
                      <div className={styles.learning_number}>{idx + 1}</div>
                      <div className={styles.learning_text}>{outcome}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section_card}>
                <h3 className={styles.section_title}>
                  <AssignmentIcon /> Prerequisites
                </h3>
                <div className={styles.prerequisites_list}>
                  {project.prerequisites?.map((preq, idx) => (
                    <span key={idx} className={styles.prerequisite_badge}>
                      {preq}
                    </span>
                  ))}
                </div>
                <p className={styles.prerequisite_note}>
                  Don't worry if you don't know all prerequisites yet! You can learn them as you build the project.
                </p>
              </div>
            </div>
          )}

          {/* Steps Tab */}
          {activeTab === "steps" && (
            <div className={styles.steps_tab}>
              <div className={styles.section_card}>
                <h3 className={styles.section_title}>
                  <ChecklistIcon /> Step-by-Step Implementation
                </h3>
                <div className={styles.steps_list}>
                  {project.steps?.map((step, idx) => (
                    <div key={idx} className={styles.step_item}>
                      <div className={styles.step_number}>{idx + 1}</div>
                      <div className={styles.step_content}>
                        <div className={styles.step_title}>Step {idx + 1}</div>
                        <div className={styles.step_description}>{step}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div className={styles.resources_tab}>
              {/* Learning Resources */}
              {hasResources && (
                <div className={styles.section_card}>
                  <h3 className={styles.section_title}>
                    <ListAltIcon /> Learning Resources
                  </h3>
                  <div className={styles.resources_list}>
                    {project.resources.map((resource, idx) => (
                      <a 
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.resource_item}
                      >
                        <div className={styles.resource_icon}>
                          {resource.url && resource.url.includes('youtube') ? '📺' : '📖'}
                        </div>
                        <div className={styles.resource_info}>
                          <div className={styles.resource_name}>{resource.name}</div>
                          <div className={styles.resource_url}>{resource.url}</div>
                        </div>
                        <OpenInNewIcon className={styles.resource_link_icon} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Get Started Card */}
              {(project.videoTutorial || project.liveDemo) && (
                <div className={styles.get_started_card}>
                  <h3>🎯 Ready to Start?</h3>
                  <p>
                    Watch the video tutorial, follow the step-by-step guide, and build this project!
                    Don't forget to practice along with the video.
                  </p>
                  <div className={styles.get_started_buttons}>
                    {/* YouTube Button */}
                    {project.videoTutorial && (
                      <button 
                        onClick={() => setShowVideoModal(true)} 
                        className={styles.get_started_youtube_btn}
                      >
                        <YouTubeIcon /> Watch Full Tutorial
                      </button>
                    )}
                    {/* Demo Button */}
                    {project.liveDemo && (
                      <a 
                        href={project.liveDemo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.get_started_demo_btn}
                      >
                        <OpenInNewIcon /> View Live Demo
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Message when no resources and no links */}
              {!hasResources && !project.videoTutorial && !project.liveDemo && (
                <div className={styles.noResourcesMessage}>
                  <p>📚 No additional resources available for this project yet.</p>
                  <p>Check back later for video tutorials and learning materials!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default ProjectDetails;