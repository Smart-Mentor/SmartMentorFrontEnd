import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Alert, Avatar, Chip, IconButton } from "@mui/material";
import { getCurrentUser } from "../../api/authenticationService";
import TimelineIcon from "@mui/icons-material/Timeline";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

// Import AI Agent assets
import AnalyzeSkills from "../../assets/AnalyzeSkills.png";
import CareerAdvice from "../../assets/CareerAdvice.png";
import GenerateRoadmap from "../../assets/GenerateRoadmap.png";
import ReviewCV from "../../assets/ReviewCV.png";
import LampLight from "../../assets/Lamp_light2.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for Gap Analysis and Learning Progress
  const [gapData, setGapData] = useState(null);
  const [learningData, setLearningData] = useState(null);
  
  // State for Community Posts
  const [communityPosts, setCommunityPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const API_URL_GAP = "https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/gapanalysis/gap-analysis";
  const COMMUNITY_BASE_URL = "https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/community";

  // AI Models data
  const aiModels = [
    { 
      id: "recommendation", 
      name: "Course Navigator", 
      img: AnalyzeSkills, 
      icon: "📚", 
      color: "#0A5ADB",
      gradient: "linear-gradient(135deg, rgb(22, 73, 129), rgb(50 75 118))",
      description: "Discover personalized courses tailored to your career goals",
      features: [
        "Smart course matching",
        "Skill-based recommendations",
        "Learning path optimization"
      ],
      route: "/aimentor/recommendation",
      tag: "Most Popular"
    },
    { 
      id: "roadmap", 
      name: "Path Weaver", 
      img: GenerateRoadmap, 
      icon: "🗺️", 
      color: "#58A7B5",
      gradient: "linear-gradient(135deg, rgb(74, 29, 109), rgb(40 24 69))",
      description: "Create your personalized journey to career success",
      features: [
        "Step-by-step roadmap",
        "Timeline visualization",
        "Resource curation"
      ],
      route: "/aimentor/roadmap",
      tag: "New"
    },
    { 
      id: "cv-analysis", 
      name: "Profile Optimizer", 
      img: ReviewCV, 
      icon: "⚡", 
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, rgb(45, 43, 107), rgb(29 29 92))",
      description: "AI-powered CV analysis and job matching",
      features: [
        "CV optimization tips",
        "Job market matching",
        "Skill gap analysis"
      ],
      route: "/aimentor/cv-analysis",
      tag: "AI Enhanced"
    }
  ];

  useEffect(() => {
    setAnimate(true);
    fetchUserData();
    fetchGapAnalysisData();
    fetchLearningData();
    fetchCommunityPosts();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError(err.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const fetchGapAnalysisData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No auth token found for gap analysis");
      return;
    }
    
    try {
      const response = await fetch(API_URL_GAP, {
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
    } catch (err) {
      console.error("Error fetching gap analysis data:", err);
    }
  };

  const fetchLearningData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No auth token found for learning data");
      return;
    }

    try {
      const profileResponse = await fetch('https://smartmentor-hbhba0cjf3fbgaeg.germanywestcentral-01.azurewebsites.net/api/User/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const profileResult = await profileResponse.json();
      
      if (profileResult.success && profileResult.data?.careerGoalName) {
        const gapResponse = await fetch(API_URL_GAP, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (gapResponse.ok) {
          const gapResult = await gapResponse.json();
          setLearningData(gapResult);
        }
      }
    } catch (err) {
      console.error("Error fetching learning data:", err);
    }
  };

  const fetchCommunityPosts = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No auth token found for community posts");
      return;
    }

    setPostsLoading(true);
    try {
      const careerGoalIds = [
      ...Array.from({ length: 9 }, (_, i) => i + 1), // 1 to 9
      11, 18, 19,
      ...Array.from({ length: 10 }, (_, i) => i + 26) // 26 to 35
    ];

      
      const fetchPromises = careerGoalIds.map(async (careerGoalId) => {
        try {
          const response = await fetch(`${COMMUNITY_BASE_URL}/career-goals/${careerGoalId}/posts`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success && Array.isArray(result.data)) {
              return result.data;
            }
          }
          return [];
        } catch (err) {
          console.error(`Error fetching posts for career goal ${careerGoalId}:`, err);
          return [];
        }
      });

      const allPostsArrays = await Promise.all(fetchPromises);
      const allPosts = allPostsArrays.flat();
      
      const uniquePosts = Array.from(
        new Map(allPosts.map(post => [post.postId, post])).values()
      );
      
      const sortedPosts = uniquePosts.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setCommunityPosts(sortedPosts);
    } catch (err) {
      console.error("Error fetching community posts:", err);
    } finally {
      setPostsLoading(false);
    }
  };

  const formatPostDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const utcDate = new Date(dateString);
      if (isNaN(utcDate.getTime())) return 'Invalid date';
      
      const egyptDate = new Date(utcDate.getTime() + (3 * 60 * 60 * 1000));
      
      const now = new Date();
      const diffMs = now - egyptDate;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      return egyptDate.toLocaleDateString('en-EG');
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Invalid date';
    }
  };

  const getAvatarColor = (name) => {
    const colors = ['#0A5ADB', '#58A7B5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const index = (name?.length || 0) % colors.length;
    return colors[index];
  };

  const getInitials = (firstName, lastName) => {
    if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase();
    if (firstName) return firstName[0]?.toUpperCase() || 'U';
    return 'U';
  };

  const getRecentActivities = () => {
    const activities = communityPosts.slice(0, 3).map(post => ({
      postId: post.postId,
      title: post.title,
      contentPreview: post.contentPreview || post.content || "No content",
      createdAt: post.createdAt,
      author: {
        name: post.author?.firstName && post.author?.lastName 
          ? `${post.author.firstName} ${post.author.lastName}`
          : "Community Member",
        firstName: post.author?.firstName,
        lastName: post.author?.lastName,
        userId: post.author?.userId
      },
      likeCount: post.likeCount || 0,
      commentCount: post.commentCount || 0,
      primaryCareerGoal: post.primaryCareerGoal,
      tags: post.tags || []
    }));
    
    if (activities.length === 0) {
      return [
        { action: "Join the Community", description: "Be the first to share your learning journey", date: "Start now", type: "info" },
        { action: "Complete Gap Analysis", description: "Identify skills for your career goal", date: "Recommended", type: "warning" },
        { action: "Explore Job Trends", description: "See what's in demand", date: "Trending", type: "success" },
      ];
    }
    
    return activities;
  };

  const getOverallLearningProgress = () => {
    if (!learningData && !gapData) return 0;
    const data = learningData || gapData;
    return Math.round(data?.statusOfTheGapAnalysis?.completionPercentage || 0);
  };

  const getMatchScore = () => {
    if (!gapData) return 0;
    return Math.round(gapData.statusOfTheGapAnalysis?.completionPercentage || 0);
  };

  const getReadinessLevel = () => {
    if (!gapData) return "Not Ready";
    return gapData.statusOfTheGapAnalysis?.readinessLevel || "Not Ready";
  };

  const getCareerGoal = () => {
    if (gapData?.careerGoalName) return gapData.careerGoalName;
    if (learningData?.careerGoalName) return learningData.careerGoalName;
    return user?.careerGoalName || "Your Career Goal";
  };

  const getMasteredCount = () => {
    if (!gapData) return 0;
    return gapData.statusOfTheGapAnalysis?.readyCount || 0;
  };

  const getTotalSkills = () => {
    if (!gapData) return 0;
    const ready = gapData.statusOfTheGapAnalysis?.readyCount || 0;
    const weak = gapData.statusOfTheGapAnalysis?.weakcount || 0;
    const missing = gapData.statusOfTheGapAnalysis?.missingcount || 0;
    return ready + weak + missing;
  };

  const overallProgress = getOverallLearningProgress();
  const matchScore = getMatchScore();
  const readinessLevel = getReadinessLevel();
  const careerGoal = getCareerGoal();
  const masteredCount = getMasteredCount();
  const totalSkills = getTotalSkills();
  const recentActivities = getRecentActivities();

  const nextSteps = [
    { 
      title: "Complete Gap Analysis", 
      desc: "Identify missing skills for your target career",
      icon: "📊",
      button: "Start Analysis",
      link: "/gapanalysis"
    },
    { 
      title: "Update Your Skills", 
      desc: "Add your latest accomplishments to your profile",
      icon: "⭐",
      button: "Update Now",
      link: "/profile"
    },
    { 
      title: "Explore Job Trends", 
      desc: "See what's in demand in Egyptian tech market",
      icon: "📈",
      button: "Explore Trends",
      link: "/jobtrends"
    },
  ];

  const getDisplayName = () => {
    if (!user) return "Learner";
    return user.firstName || user.fullName || user.username || user.email?.split('@')[0] || "Learner";
  };

  const handleViewAllActivity = () => {
    navigate("/community");
  };

  const handlePostClick = (postId) => {
    navigate('/community', { state: { openPostId: String(postId) } });
  };

  const handleAIModelSelect = (route) => {
    navigate(route);
  };

  if (loading) {
    return (
      <Box className={styles.dashboard_container}>
        <Box className={styles.loading_container}>
          <CircularProgress sx={{ color: "#0A5ADB" }} />
          <p className={styles.loading_text}>Loading your dashboard...</p>
        </Box>
      </Box>
    );
  }

  if (error && !user) {
    return (
      <Box className={styles.dashboard_container}>
        <Box className={styles.error_container}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <button onClick={fetchUserData} className={styles.retry_button}>
            Try Again
          </button>
        </Box>
      </Box>
    );
  }

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
              Welcome back, {getDisplayName()}! <span className={styles.wave}>👋</span>
            </h1>
            <p className={styles.welcome_subtitle}>
              {user?.tagline || "Here's your learning progress overview"}
            </p>
          </div>
          <div className={styles.header_stats}>
            {user?.role && (
              <div className={styles.stat_badge}>
                <span className={styles.stat_badge_icon}>👔</span>
                <span className={styles.stat_badge_text}>{user.role}</span>
              </div>
            )}
          </div>
        </div>

        {/* PROGRESS OVERVIEW ROW - Learning Progress + Match Score */}
        <div className={styles.progress_overview_row}>
          <div className={`${styles.overall_progress_card} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.overall_progress_header}>
              <div className={styles.overall_progress_title_wrapper}>
                <TimelineIcon className={styles.overall_progress_icon} />
                <div>
                  <h3 className={styles.overall_progress_title}>Learning Progress</h3>
                  <p className={styles.overall_progress_subtitle}>{careerGoal}</p>
                </div>
              </div>
              <div className={styles.overall_progress_percentage}>
                <span className={styles.progress_percentage_value}>{overallProgress}%</span>
                <span className={styles.progress_percentage_label}>Complete</span>
              </div>
            </div>
            
            <div className={styles.progress_bar_container_large}>
              <div 
                className={styles.progress_bar_large}
                style={{ width: `${overallProgress}%` }}
              >
                <span className={styles.progress_percentage_small}>{overallProgress}%</span>
              </div>
            </div>
            
            <div className={styles.overall_progress_footer}>
              <span className={styles.milestone_text}>
                🎯 {overallProgress < 30 ? "Next milestone: 30%" : overallProgress < 60 ? "Next milestone: 60%" : overallProgress < 100 ? "Next milestone: 100%" : "🏆 Fully completed!"}
              </span>
              <span className={styles.skills_remaining}>
                📚 {totalSkills - masteredCount} skills remaining
              </span>
            </div>
          </div>

          <div className={`${styles.match_score_card} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.match_score_header}>
              <div className={styles.match_score_title_wrapper}>
                <AnalyticsIcon className={styles.match_score_icon} />
                <div>
                  <h3 className={styles.match_score_title}>Skills Match Score</h3>
                  <p className={styles.match_score_subtitle}>vs {careerGoal}</p>
                </div>
              </div>
              <div className={styles.readiness_badge} style={{ 
                background: readinessLevel === "Job Ready" ? "#10b98120" : readinessLevel === "Almost Ready" ? "#f59e0b20" : "#6b728020",
                color: readinessLevel === "Job Ready" ? "#10b981" : readinessLevel === "Almost Ready" ? "#f59e0b" : "#6b7280"
              }}>
                {readinessLevel}
              </div>
            </div>

            <div className={styles.match_score_circle_container}>
              <div className={styles.match_circle_wrapper}>
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
                    stroke="url(#gradient)"
                    strokeDasharray={`${(matchScore / 100) * 339.292}, 339.292`}
                  />
                </svg>
                <div className={styles.match_score_text}>
                  <span className={styles.match_percentage}>{matchScore}%</span>
                  <span className={styles.match_label}>Match Score</span>
                </div>
              </div>
              
              <div className={styles.match_stats}>
                <div className={styles.match_stat}>
                  <span className={styles.match_stat_value}>{masteredCount}</span>
                  <span className={styles.match_stat_label}>Mastered</span>
                </div>
                <div className={styles.match_stat_divider}></div>
                <div className={styles.match_stat}>
                  <span className={styles.match_stat_value}>{totalSkills - masteredCount}</span>
                  <span className={styles.match_stat_label}>To Learn</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TWO COLUMN LAYOUT - AI Agents (LEFT) + Community Feed (RIGHT) - SWAPPED */}
        <div className={styles.two_column_layout}>
          {/* AI AGENTS SECTION - LEFT column */}
          <div className={`${styles.ai_agents_section} ${animate ? styles.fade_in : ""}`}>
            <div className={styles.section_header}>
              <div className={styles.section_title_wrapper}>
                <span className={styles.section_icon}>🤖</span>
                <h2 className={styles.section_title}>AI Career Assistants</h2>
              </div>
              <p className={styles.section_subtitle}>Powered by advanced AI to guide your career journey</p>
            </div>

            <div className={styles.ai_agents_list}>
              {aiModels.map((model, index) => (
                <div
                  key={model.id}
                  className={`${styles.ai_agent_card} ${hoveredCard === index ? styles.ai_card_hovered : ""}`}
                  onClick={() => handleAIModelSelect(model.route)}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={styles.ai_card_badge} style={{ background: model.gradient }}>
                    {model.tag}
                  </div>
                  
                  <div className={styles.ai_card_icon_wrapper}>
                    <div className={styles.ai_card_icon_background} style={{ background: `${model.color}15` }}>
                      <span className={styles.ai_card_icon}>{model.icon}</span>
                    </div>
                  </div>
                  
                  <h3 className={styles.ai_card_title}>{model.name}</h3>
                  <p className={styles.ai_card_description}>{model.description}</p>
                  
                  <div className={styles.ai_card_features}>
                    {model.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className={styles.ai_feature_item}>
                        <svg className={styles.ai_feature_check} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={styles.ai_card_button} style={{ background: model.gradient }}>
                    <span>Launch</span>
                    <svg className={styles.ai_button_arrow} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.ai_agents_footer}>
              <button 
                onClick={() => handleAIModelSelect("/aimentor")} 
                className={styles.view_all_ai_button}
              >
                Explore All AI Assistants →
              </button>
            </div>
          </div>

          {/* Community Feed - RIGHT column */}
          <div className={`${styles.activity_section} ${animate ? styles.fade_in : ""}`}>
            <div className={styles.section_header}>
              <div className={styles.section_title_wrapper}>
                <span className={styles.section_icon}>💬</span>
                <h2 className={styles.section_title}>Community Feed</h2>
              </div>
              <p className={styles.section_subtitle}>
                {postsLoading ? "Loading discussions..." : `Latest discussions from the community`}
              </p>
            </div>

            <div className={styles.activity_list}>
              {postsLoading ? (
                <div className={styles.loading_posts}>
                  <CircularProgress size={32} sx={{ color: "#0A5ADB" }} />
                  <p>Loading community posts...</p>
                </div>
              ) : recentActivities.length > 0 && recentActivities[0].postId ? (
                recentActivities.map((post, i) => (
                  <div 
                    key={post.postId || i} 
                    className={styles.modern_post_card}
                    onClick={() => handlePostClick(post.postId)}
                  >
                    <div className={styles.post_header}>
                      <div className={styles.post_avatar_wrapper}>
                        <div 
                          className={styles.post_avatar}
                          style={{ backgroundColor: getAvatarColor(post.author?.name) }}
                        >
                          {getInitials(post.author?.firstName, post.author?.lastName)}
                        </div>
                      </div>
                      <div className={styles.post_author_info}>
                        <span className={styles.post_author_name}>{post.author?.name}</span>
                        <span className={styles.post_date}>{formatPostDate(post.createdAt)}</span>
                      </div>
                      <IconButton size="small" className={styles.post_menu_btn}>
                        <MoreHorizIcon sx={{ fontSize: 20, color: '#999' }} />
                      </IconButton>
                    </div>

                    <div className={styles.post_content}>
                      <h4 className={styles.post_title}>{post.title}</h4>
                      <p className={styles.post_preview}>{post.contentPreview}</p>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className={styles.post_tags}>
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <Chip
                            key={idx}
                            label={tag.careerGoalName}
                            size="small"
                            className={styles.post_tag}
                            sx={{
                              backgroundColor: 'rgba(10, 90, 219, 0.08)',
                              color: '#0A5ADB',
                              fontSize: '11px',
                              height: '24px',
                              '& .MuiChip-label': { px: 1 }
                            }}
                          />
                        ))}
                        {post.primaryCareerGoal && !post.tags?.length && (
                          <Chip
                            label={post.primaryCareerGoal.careerGoalName}
                            size="small"
                            className={styles.post_tag}
                            sx={{
                              backgroundColor: 'rgba(10, 90, 219, 0.08)',
                              color: '#0A5ADB',
                              fontSize: '11px',
                              height: '24px'
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <>
                  <div className={styles.empty_posts_state}>
                    <div className={styles.empty_icon}>💬</div>
                    <h4>No community posts yet</h4>
                    <p>Be the first to share your learning journey!</p>
                  </div>
                  <div className={styles.activity_item}>
                    <div className={`${styles.activity_dot} ${styles.info}`}></div>
                    <div className={styles.activity_content}>
                      <p className={styles.activity_action}>Join the Community</p>
                      <p className={styles.activity_description}>Be the first to share your learning journey</p>
                      <span className={styles.activity_date}>Start now</span>
                    </div>
                  </div>
                  <div className={styles.activity_item}>
                    <div className={`${styles.activity_dot} ${styles.warning}`}></div>
                    <div className={styles.activity_content}>
                      <p className={styles.activity_action}>Complete Gap Analysis</p>
                      <p className={styles.activity_description}>Identify skills for your career goal</p>
                      <span className={styles.activity_date}>Recommended</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={styles.activity_footer}>
              <button 
                onClick={handleViewAllActivity} 
                className={styles.view_all_button}
              >
                Browse All Discussions →
              </button>
            </div>
          </div>
        </div>

        {/* RECOMMENDED NEXT STEPS - Full width section at bottom */}
        <div className={`${styles.recommended_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.section_header}>
            <div className={styles.section_title_wrapper}>
              <span className={styles.section_icon}>🎯</span>
              <h2 className={styles.section_title}>Recommended Next Steps</h2>
            </div>
            <p className={styles.section_subtitle}>Continue your learning journey</p>
          </div>

          <div className={styles.recommended_steps_grid}>
            {nextSteps.map((step, i) => (
              <div key={i} className={styles.recommended_step_card} onClick={() => window.location.href = step.link}>
                <div className={styles.recommended_step_icon_wrapper}>
                  <span className={styles.recommended_step_icon}>{step.icon}</span>
                </div>
                <div className={styles.recommended_step_content}>
                  <h3 className={styles.recommended_step_title}>{step.title}</h3>
                  <p className={styles.recommended_step_description}>{step.desc}</p>
                  <button className={styles.recommended_step_button}>
                    {step.button} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Gradient Definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A5ADB" />
            <stop offset="100%" stopColor="#58A7B5" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
};

export default Dashboard;