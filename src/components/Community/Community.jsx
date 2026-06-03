import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import { Box, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, TextField, Button, Chip, IconButton } from "@mui/material";
import { Close as CloseIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon, Comment as CommentIcon, Send as SendIcon } from "@mui/icons-material";
import ForumIcon from "@mui/icons-material/Forum";
import PeopleIcon from "@mui/icons-material/People";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Community.module.css";

const Community = () => {
  const [animate, setAnimate] = useState(false);
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postDetailOpen, setPostDetailOpen] = useState(false);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    primaryCareerGoalId: "",
    careerGoalTagIds: []
  });
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [careerGoals, setCareerGoals] = useState([]);
  const [careerGoalsWithPosts, setCareerGoalsWithPosts] = useState([]);
  const [careerGoalPostCounts, setCareerGoalPostCounts] = useState({});
  const [selectedCareerGoalId, setSelectedCareerGoalId] = useState(null);
  const [postDetailLoading, setPostDetailLoading] = useState(false);
  const [userCareerGoalId, setUserCareerGoalId] = useState(null);
  const [userProfileLoading, setUserProfileLoading] = useState(true);
  const [careerGoalsLoading, setCareerGoalsLoading] = useState(true);
  const [inlineCommentText, setInlineCommentText] = useState({});
  const [postComments, setPostComments] = useState({});
  const [inlineSubmitting, setInlineSubmitting] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    userId: ''
  });

  // Get token from localStorage
  const getAuthToken = () => localStorage.getItem('authToken');

  // Fetch user info from /api/auth/me
  const fetchUserInfo = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch('https://smartmentorapi.runasp.net/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          userName: data.userName || '',
          email: data.email || '',
          userId: data.userId || ''
        });
        // Store in localStorage for quick access
        localStorage.setItem('userFirstName', data.firstName || '');
        localStorage.setItem('userLastName', data.lastName || '');
        localStorage.setItem('userFullName', `${data.firstName || ''} ${data.lastName || ''}`.trim());
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  // Fetch user profile to get careerGoalId
  const fetchUserProfile = async () => {
    try {
      setUserProfileLoading(true);
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Please login to view community posts');
      }

      const response = await fetch('https://smartmentorapi.runasp.net/api/User/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        // Get careerGoalId from user profile
        const careerGoalId = data.data.careerGoalId || data.data.careerGoal?.careerGoalId;
        setUserCareerGoalId(careerGoalId);
        
        // AUTO-FILL: Set the user's career goal as the default primaryCareerGoalId for new posts
        if (careerGoalId) {
          setNewPost(prev => ({
            ...prev,
            primaryCareerGoalId: careerGoalId
          }));
        }
        
        return careerGoalId;
      }
      return null;
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      setError(err.message);
      return null;
    } finally {
      setUserProfileLoading(false);
    }
  };

  // Fetch career goals
  const fetchCareerGoals = async () => {
    try {
      setCareerGoalsLoading(true);
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch('https://smartmentorapi.runasp.net/api/CareerGoal/GetAllCareerGoals', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // The API returns an array directly
        if (Array.isArray(data)) {
          // Map the response to match your expected structure
          const mappedCareerGoals = data.map(goal => ({
            careerGoalId: goal.id,
            careerGoalName: goal.name,
            description: goal.description
          }));
          setCareerGoals(mappedCareerGoals);
        }
      }
    } catch (err) {
      console.error("Failed to fetch career goals:", err);
    } finally {
      setCareerGoalsLoading(false);
    }
  };

  // Modify fetchPosts to RETURN data instead of setting state directly
  const fetchPostsData = async (careerGoalId = null) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Please login to view community posts');
      }

      let url = 'https://smartmentorapi.runasp.net/api/Community/posts';
      if (careerGoalId) {
        url = `https://smartmentorapi.runasp.net/api/Community/career-goals/${careerGoalId}/posts`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        return data.data;
      }
      return [];
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  // Fetch comments for a post (for inline display)
  const fetchCommentsForPost = async (postId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`https://smartmentorapi.runasp.net/api/Community/posts/${postId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        cache: 'no-cache'
      });
      if (!response.ok) return;
      const data = await response.json();
      if (data.success && data.data?.comments) {
        // Sort comments by date (newest first)
        const sortedComments = [...data.data.comments].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setPostComments(prev => ({ ...prev, [postId]: sortedComments }));
      }
    } catch (err) {
      console.error('Failed to fetch comments for post', postId, err);
    }
  };

  // Refresh all posts from all career goals
  const refreshAllPosts = async () => {
    // Use all career goal IDs from the API
    const goalIds = careerGoals.map(goal => goal.careerGoalId);
    
    if (goalIds.length === 0) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    try {
      // Fetch all posts in parallel
      const allPostsArrays = await Promise.all(
        goalIds.map(id => fetchPostsData(id))
      );
      
      // Calculate post counts per career goal
      const counts = {};
      goalIds.forEach((id, index) => {
        counts[id] = allPostsArrays[index].length;
      });
      setCareerGoalPostCounts(counts);
      
      // Merge all posts (flatten the array)
      const mergedPosts = allPostsArrays.flat();
      
      // Remove duplicates based on postId
      const uniquePosts = Array.from(
        new Map(mergedPosts.map(post => [post.postId, post])).values()
      );
      
      // Sort posts by date (newest first)
      const sortedPosts = uniquePosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      setPosts(sortedPosts);

      // Fetch comments for each post in background
      sortedPosts.forEach(post => {
        fetchCommentsForPost(post.postId);
      });

      // Filter career goals that have posts
      let goalsWithPosts = careerGoals.filter(goal => counts[goal.careerGoalId] > 0);
      
      // Always include user's primary career goal even if it has no posts
      if (userCareerGoalId && !goalsWithPosts.some(goal => goal.careerGoalId === userCareerGoalId)) {
        const primaryGoal = careerGoals.find(goal => goal.careerGoalId === userCareerGoalId);
        if (primaryGoal) {
          goalsWithPosts = [primaryGoal, ...goalsWithPosts];
        }
      }
      
      setCareerGoalsWithPosts(goalsWithPosts);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Submit inline comment from post card
  const handleInlineComment = async (postId) => {
    const text = (inlineCommentText[postId] || '').trim();
    if (!text) return;
    
    const commentText = text;
    setInlineCommentText(prev => ({ ...prev, [postId]: '' }));
    setInlineSubmitting(prev => ({ ...prev, [postId]: true }));
    
    // Optimistic comment with user info
    const optimisticComment = {
      commentId: Date.now(),
      content: commentText,
      createdAt: new Date().toISOString(),
      author: {
        firstName: userInfo.firstName || localStorage.getItem('userFirstName') || 'You',
        lastName: userInfo.lastName || localStorage.getItem('userLastName') || '',
        email: userInfo.email || ''
      }
    };
    
    // Add optimistic comment to UI and sort (newest first)
    setPostComments(prev => {
      const existingComments = prev[postId] || [];
      const newComments = [...existingComments, optimisticComment];
      // Sort newest first
      const sortedComments = newComments.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return { ...prev, [postId]: sortedComments };
    });
    
    try {
      const token = getAuthToken();
      const response = await fetch(`https://smartmentorapi.runasp.net/api/Community/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText })
      });
      if (response.ok) {
        await fetchCommentsForPost(postId);
        setPosts(prev => prev.map(p => p.postId === postId ? { ...p, commentCount: (p.commentCount || 0) + 1 } : p));
      } else {
        // Revert optimistic comment on error
        setPostComments(prev => ({
          ...prev,
          [postId]: (prev[postId] || []).filter(c => c.commentId !== optimisticComment.commentId)
        }));
        setInlineCommentText(prev => ({ ...prev, [postId]: commentText }));
      }
    } catch (err) {
      // Revert optimistic comment on error
      setPostComments(prev => ({
        ...prev,
        [postId]: (prev[postId] || []).filter(c => c.commentId !== optimisticComment.commentId)
      }));
      setInlineCommentText(prev => ({ ...prev, [postId]: commentText }));
    } finally {
      setInlineSubmitting(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Open post from navigation state (e.g. from Profile activity click)
  useEffect(() => {
    const openPostId = location?.state?.openPostId;
    if (!openPostId || posts.length === 0) return;
    const found = posts.find(p => String(p.postId) === String(openPostId));
    if (found) {
      openPostDetail(found);
      // Clear the state so re-renders don't re-open it
      window.history.replaceState({}, document.title);
    } else {
      // Post not in current list — fetch directly
      fetchPostDetail(openPostId);
      window.history.replaceState({}, document.title);
    }
  }, [location?.state?.openPostId, posts]);

  // Handle like/unlike
  const handleLike = async (postId, isCurrentlyLiked) => {
    try {
      const token = getAuthToken();
      const method = isCurrentlyLiked ? 'DELETE' : 'POST';

      const response = await fetch(`https://smartmentorapi.runasp.net/api/Community/posts/${postId}/like`, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Update local state
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.postId === postId
              ? {
                  ...post,
                  likeCount: isCurrentlyLiked ? post.likeCount - 1 : post.likeCount + 1,
                  isLikedByCurrentUser: !isCurrentlyLiked
                }
              : post
          )
        );

        // Also update selected post if open
        if (selectedPost && selectedPost.postId === postId) {
          setSelectedPost(prev => ({
            ...prev,
            likeCount: isCurrentlyLiked ? prev.likeCount - 1 : prev.likeCount + 1,
            isLikedByCurrentUser: !isCurrentlyLiked
          }));
        }
      }
    } catch (err) {
      console.error("Failed to like/unlike post:", err);
    }
  };

  // Handle create post
  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("Please fill in title and content");
      return;
    }

    try {
      setSubmitting(true);
      const token = getAuthToken();

      const requestBody = {
        title: newPost.title,
        content: newPost.content
      };

      if (newPost.primaryCareerGoalId && newPost.primaryCareerGoalId !== "") {
        requestBody.primaryCareerGoalId = parseInt(newPost.primaryCareerGoalId);
      }

      if (newPost.careerGoalTagIds && newPost.careerGoalTagIds.length > 0) {
        requestBody.careerGoalTagIds = newPost.careerGoalTagIds.map(id => parseInt(id));
      }

      const response = await fetch('https://smartmentorapi.runasp.net/api/Community/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        setCreatePostOpen(false);
        setNewPost({ 
          title: "", 
          content: "", 
          primaryCareerGoalId: userCareerGoalId || "", 
          careerGoalTagIds: [] 
        });
        
        // Refresh all posts
        await refreshAllPosts();
      } else {
        const errorText = await response.text();
        console.error("Create post failed:", response.status, errorText);
        throw new Error(errorText || 'Failed to create post');
      }
    } catch (err) {
      console.error("Failed to create post:", err);
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle add comment (for modal)
  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;

    const commentContent = newComment.trim();
    setNewComment("");
    setSubmitting(true);

    try {
      const token = getAuthToken();

      const response = await fetch(`https://smartmentorapi.runasp.net/api/Community/posts/${selectedPost.postId}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: commentContent })
      });

      if (response.ok) {
        await fetchPostDetail(selectedPost.postId);
        
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.postId === selectedPost.postId
              ? { ...post, commentCount: (post.commentCount || 0) + 1 }
              : post
          )
        );
      } else {
        setNewComment(commentContent);
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to add comment');
      }
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch single post details
  const fetchPostDetail = async (postId) => {
    try {
      setPostDetailLoading(true);
      const token = getAuthToken();
    
      const response = await fetch(`https://smartmentorapi.runasp.net/api/Community/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch post details');
      }
    
      const data = await response.json();
    
      if (data.success && data.data) {
        // Sort comments by date (newest first) when fetching post detail
        if (data.data.comments && Array.isArray(data.data.comments)) {
          data.data.comments.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
        setSelectedPost(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch post detail:", err);
    } finally {
      setPostDetailLoading(false);
    }
  };

  // Open post detail modal
  const openPostDetail = async (post) => {
    await fetchPostDetail(post.postId);
    setPostDetailOpen(true);
  };

  // Filter posts by career goal
  const handleCareerGoalFilter = async (careerGoalId) => {
    setSelectedCareerGoalId(careerGoalId);
    setLoading(true);
    
    try {
      if (careerGoalId === null) {
        await refreshAllPosts();
      } else {
        const postsData = await fetchPostsData(careerGoalId);
        const sortedPosts = postsData.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setPosts(sortedPosts);
        sortedPosts.forEach(post => { fetchCommentsForPost(post.postId); });
      }
    } catch (err) {
      setError('Failed to fetch posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Clear filter
  const handleClearFilter = () => {
    handleCareerGoalFilter(null);
  };

  // Format date
  const formatDate = (dateString) => {
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

  // Get the selected career goal name for display
  const getSelectedCareerGoalName = () => {
    if (!selectedCareerGoalId) return "All Posts";
    const goal = careerGoals.find(g => g.careerGoalId === selectedCareerGoalId);
    return goal ? goal.careerGoalName : "All Posts";
  };

  // Get user's primary career goal name
  const getUserPrimaryCareerGoalName = () => {
    if (!userCareerGoalId) return null;
    const goal = careerGoals.find(g => g.careerGoalId === userCareerGoalId);
    return goal ? goal.careerGoalName : null;
  };

  // Initialize: fetch user profile, user info, and career goals
  useEffect(() => {
    setAnimate(true);
    const initialize = async () => {
      await fetchUserProfile();
      await fetchUserInfo();
      await fetchCareerGoals();
    };
    initialize();
  }, []);

  // Fetch posts after career goals are loaded
  useEffect(() => {
    if (careerGoals.length > 0) {
      refreshAllPosts();
    }
  }, [careerGoals]);

  // Stats
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, post) => sum + (post.likeCount || 0), 0);
  const totalComments = posts.reduce((sum, post) => sum + (post.commentCount || 0), 0);

  // Show loading while fetching user profile
  if (userProfileLoading || careerGoalsLoading || (loading && posts.length === 0)) {
    return (
      <Box component="main" className={styles.community_container}>
        <div className={styles.bg_blur_1}></div>
        <div className={styles.bg_blur_2}></div>
        <div className={styles.bg_blur_3}></div>
        <div className={styles.community_content}>
          <div className={styles.loading_container}>
            <CircularProgress />
            <span>Loading community posts...</span>
          </div>
        </div>
      </Box>
    );
  }

  return (
    <Box component="main" className={styles.community_container}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>
      <div className={styles.particle_1}></div>
      <div className={styles.particle_2}></div>

      <div className={styles.community_content}>
        {/* Header Section */}
        <div className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}>
          <div className={styles.header_left}>
            <div className={styles.header_icon_wrapper}>
              <ForumIcon className={styles.header_icon} />
            </div>
            <div>
              <h1 className={styles.header_title}>Community Hub</h1>
              <p className={styles.header_subtitle}>
                Connect, share, and learn with fellow developers
              </p>
            </div>
          </div>
          <button
            className={styles.create_post_btn}
            onClick={() => setCreatePostOpen(true)}
          >
            <AddIcon className={styles.btn_icon} />
            Create Post
          </button>
        </div>

        {/* User Primary Career Goal Banner */}
        {userCareerGoalId && careerGoals.length > 0 && (
          <div className={`${styles.primary_goal_banner} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.primary_goal_content}>
              <span className={styles.primary_goal_icon}>🎯</span>
              <div className={styles.primary_goal_info}>
                <span className={styles.primary_goal_label}>Your Primary Career Goal :</span>
                <span className={styles.primary_goal_name}>
                  {getUserPrimaryCareerGoalName()}
                </span>
              </div>
              <span className={styles.primary_goal_hint}>
                This will be auto-selected when creating posts
              </span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className={styles.stats_grid}>
          <div className={`${styles.stat_card} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.stat_icon_wrapper} style={{ background: "rgba(10, 90, 219, 0.1)" }}>
              <ForumIcon className={styles.stat_icon} style={{ color: "#0A5ADB" }} />
            </div>
            <div className={styles.stat_info}>
              <span className={styles.stat_value}>{totalPosts}</span>
              <span className={styles.stat_label}>Total Posts</span>
            </div>
          </div>

          <div className={`${styles.stat_card} ${animate ? styles.slide_up : ""}`} style={{ animationDelay: "0.1s" }}>
            <div className={styles.stat_icon_wrapper} style={{ background: "rgba(88, 167, 181, 0.1)" }}>
              <ThumbUpAltIcon className={styles.stat_icon} style={{ color: "#58A7B5" }} />
            </div>
            <div className={styles.stat_info}>
              <span className={styles.stat_value}>{totalLikes}</span>
              <span className={styles.stat_label}>Total Likes</span>
            </div>
          </div>

          <div className={`${styles.stat_card} ${animate ? styles.slide_up : ""}`} style={{ animationDelay: "0.2s" }}>
            <div className={styles.stat_icon_wrapper} style={{ background: "rgba(245, 158, 11, 0.1)" }}>
              <PeopleIcon className={styles.stat_icon} style={{ color: "#f59e0b" }} />
            </div>
            <div className={styles.stat_info}>
              <span className={styles.stat_value}>{totalComments}</span>
              <span className={styles.stat_label}>Total Comments</span>
            </div>
          </div>
        </div>

        {/* Filters Section - Show career goals that have posts AND always show user's primary goal */}
        {(careerGoalsWithPosts.length > 0 || userCareerGoalId) && (
          <div className={`${styles.filters_section} ${animate ? styles.slide_up : ""}`}>
            <div className={styles.filters_header}>
              <span className={styles.filters_label}>Filter by Career Goal:</span>
              <div className={styles.active_filter_info}>
                <span className={styles.active_filter_label}>Currently showing:</span>
                <button
                  className={`${styles.filter_chip} ${selectedCareerGoalId === null ? styles.active_filter : ""}`}
                  onClick={handleClearFilter}
                >
                  All Posts
                </button>
                {selectedCareerGoalId !== null && (
                  <button
                    className={`${styles.filter_chip} ${styles.active_filter}`}
                    onClick={() => {}}
                  >
                    {getSelectedCareerGoalName()}
                  </button>
                )}
              </div>
            </div>
            <div className={styles.filters_list}>
              {/* Always show user's primary career goal first if it exists */}
              {userCareerGoalId && (() => {
                const primaryGoal = careerGoals.find(g => g.careerGoalId === userCareerGoalId);
                return primaryGoal && (
                  <button
                    key={primaryGoal.careerGoalId}
                    className={`${styles.filter_chip} ${selectedCareerGoalId === primaryGoal.careerGoalId ? styles.active_filter : ""} ${styles.primary_goal_filter}`}
                    onClick={() => handleCareerGoalFilter(primaryGoal.careerGoalId)}
                  >
                    {primaryGoal.careerGoalName}
                    <span className={styles.primary_badge}>Your Goal</span>
                    <span className={styles.post_count_badge}>
                      {careerGoalPostCounts[primaryGoal.careerGoalId] || 0}
                    </span>
                  </button>
                );
              })()}
              
              {/* Show other career goals that have posts (excluding user's primary goal if already shown) */}
              {careerGoalsWithPosts
                .filter(goal => goal.careerGoalId !== userCareerGoalId)
                .map(goal => (
                  <button
                    key={goal.careerGoalId}
                    className={`${styles.filter_chip} ${selectedCareerGoalId === goal.careerGoalId ? styles.active_filter : ""}`}
                    onClick={() => handleCareerGoalFilter(goal.careerGoalId)}
                  >
                    {goal.careerGoalName}
                    <span className={styles.post_count_badge}>
                      {careerGoalPostCounts[goal.careerGoalId] || 0}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Alert severity="error" className={styles.error_alert} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Posts List */}
        <div className={styles.posts_list}>
          {posts.length === 0 && !loading ? (
            <div className={styles.empty_state}>
              <div className={styles.empty_icon}>💬</div>
              <h3>No posts yet</h3>
              <p>Be the first to start a discussion!</p>
              <button className={styles.empty_create_btn} onClick={() => setCreatePostOpen(true)}>
                Create First Post
              </button>
            </div>
          ) : (
            posts.map((post, index) => (
              <div
                key={post.postId}
                className={`${styles.post_card} ${animate ? styles.slide_up : ""}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={styles.post_header}>
                  <div className={styles.author_info}>
                    <div className={styles.author_avatar}>
                      {post.author?.firstName?.charAt(0) + post.author?.lastName?.charAt(0) || 'U'}
                    </div>
                    <div className={styles.author_details}>
                      <span className={styles.author_name}>
                        {post.author?.firstName} {post.author?.lastName}
                      </span>
                      <span className={styles.post_date}>
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                  {post.primaryCareerGoal && (
                    <Chip
                      label={post.primaryCareerGoal.careerGoalName}
                      size="small"
                      className={styles.career_goal_chip}
                      style={{ backgroundColor: "#0A5ADB15", color: "#0A5ADB" }}
                    />
                  )}
                </div>

                <div className={styles.post_content}>
                  <h3 className={styles.post_title}>{post.title}</h3>
                  <p className={styles.post_preview}>
                    {post.contentPreview || post.content?.substring(0, 150)}
                    {(post.contentPreview?.length > 150 || post.content?.length > 150) && "..."}
                  </p>
                </div>

                <div className={styles.post_footer}>
                  <div className={styles.post_stats}>
                    <button
                      className={`${styles.action_btn} ${post.isLikedByCurrentUser ? styles.liked : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.postId, post.isLikedByCurrentUser);
                      }}
                    >
                      {post.isLikedByCurrentUser ? (
                        <FavoriteIcon className={styles.liked_icon} />
                      ) : (
                        <FavoriteBorderIcon className={styles.action_icon} />
                      )}
                      <span>{post.likeCount}</span>
                    </button>
                    <button
                      className={styles.action_btn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedComments(prev => ({ ...prev, [post.postId]: !prev[post.postId] }));
                      }}
                    >
                      <CommentIcon className={styles.action_icon} />
                      <span>{post.commentCount}</span>
                    </button>
                  </div>
                </div>

                {/* Inline Comments Section */}
                <div
                  className={styles.inline_comments_section}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Comment Input with User Avatar */}
                  <div className={styles.inline_comment_input_row}>
                    <div className={styles.inline_comment_avatar}>
                      {userInfo.firstName?.charAt(0) + userInfo.lastName?.charAt(0) || localStorage.getItem('userFirstName')?.charAt(0) + localStorage.getItem('userLastName')?.charAt(0) || 'U'}
                    </div>
                    <div className={styles.inline_comment_input_wrap}>
                      <input
                        className={styles.inline_comment_input}
                        type="text"
                        placeholder="Write a comment..."
                        value={inlineCommentText[post.postId] || ''}
                        onChange={(e) => setInlineCommentText(prev => ({ ...prev, [post.postId]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleInlineComment(post.postId); }}
                        disabled={inlineSubmitting[post.postId]}
                      />
                      <button
                        className={styles.inline_send_btn}
                        onClick={() => handleInlineComment(post.postId)}
                        disabled={inlineSubmitting[post.postId] || !(inlineCommentText[post.postId] || '').trim()}
                      >
                        <SendIcon fontSize="small" />
                      </button>
                    </div>
                  </div>

                  {/* Comments List */}
                  {postComments[post.postId] && postComments[post.postId].length > 0 && (
                    <div className={styles.inline_comments_list}>
                      {(expandedComments[post.postId]
                        ? postComments[post.postId]
                        : postComments[post.postId].slice(0, 2)
                      ).map((comment) => (
                        <div key={comment.commentId} className={styles.inline_comment_item}>
                          <div className={styles.inline_commenter_avatar}>
                            {comment.author?.firstName?.charAt(0) + comment.author?.lastName?.charAt(0) || 'U'}
                          </div>
                          <div className={styles.inline_comment_bubble}>
                            <span className={styles.inline_commenter_name}>
                              {comment.author?.firstName} {comment.author?.lastName}
                            </span>
                            <p className={styles.inline_comment_text}>{comment.content}</p>
                            <span className={styles.inline_comment_time}>{formatDate(comment.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                      {postComments[post.postId].length > 2 && (
                        <button
                          className={styles.inline_view_more_btn}
                          onClick={() => setExpandedComments(prev => ({ ...prev, [post.postId]: !prev[post.postId] }))}
                        >
                          {expandedComments[post.postId]
                            ? 'Show less'
                            : `View ${postComments[post.postId].length - 2} more comment${postComments[post.postId].length - 2 > 1 ? 's' : ''}`}
                        </button>
                      )}
                    </div>
                  )}

                  {!postComments[post.postId] ? (
                    <div className={styles.inline_comments_loading}>
                      <CircularProgress size={14} />
                      <span>Loading comments...</span>
                    </div>
                  ) : postComments[post.postId].length === 0 && (
                    <p className={styles.inline_no_comments}>No comments yet. Be the first!</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Post Detail Modal */}
      <Dialog
        open={postDetailOpen}
        onClose={() => setPostDetailOpen(false)}
        maxWidth="md"
        fullWidth
        className={styles.detail_dialog}
      >
        {postDetailLoading ? (
          <div className={styles.detail_loading}>
            <CircularProgress />
          </div>
        ) : selectedPost && (
          <>
            <DialogTitle className={styles.detail_header}>
              <div className={styles.detail_title_wrapper}>
                <div className={styles.detail_author_avatar}>
                  {selectedPost.author?.firstName?.charAt(0) + selectedPost.author?.lastName?.charAt(0) || 'U'}
                </div>
                <div className={styles.detail_author_info}>
                  <span className={styles.detail_author_name}>
                    {selectedPost.author?.firstName} {selectedPost.author?.lastName}
                  </span>
                  <span className={styles.detail_post_date}>
                    {formatDate(selectedPost.createdAt)}
                  </span>
                </div>
              </div>
              <IconButton onClick={() => setPostDetailOpen(false)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={styles.detail_content}>
              <h2 className={styles.detail_title}>{selectedPost.title}</h2>
              <p className={styles.detail_body}>{selectedPost.content}</p>

              <div className={styles.detail_tags}>
                {selectedPost.tags?.map((tag, idx) => (
                  <Chip
                    key={idx}
                    label={tag.careerGoalName}
                    size="small"
                    className={styles.tag_chip}
                  />
                ))}
              </div>

              <div className={styles.detail_actions}>
                <button
                  className={`${styles.detail_like_btn} ${selectedPost.isLikedByCurrentUser ? styles.liked : ""}`}
                  onClick={() => handleLike(selectedPost.postId, selectedPost.isLikedByCurrentUser)}
                >
                  {selectedPost.isLikedByCurrentUser ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                  <span>{selectedPost.likeCount} Likes</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className={styles.comments_section}>
                <h4 className={styles.comments_title}>
                  Comments ({selectedPost.comments?.length || 0})
                </h4>

                <div className={styles.add_comment}>
                  <TextField
                    fullWidth
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    multiline
                    rows={2}
                    variant="outlined"
                    className={styles.comment_input}
                  />
                  <button
                    className={styles.submit_comment_btn}
                    onClick={handleAddComment}
                    disabled={submitting || !newComment.trim()}
                  >
                    <SendIcon />
                    Comment
                  </button>
                </div>

                <div className={styles.comments_list}>
                  {selectedPost.comments?.length === 0 ? (
                    <div className={styles.no_comments}>
                      <span>No comments yet. Be the first to comment!</span>
                    </div>
                  ) : (
                    selectedPost.comments?.map((comment) => (
                      <div key={comment.commentId} className={styles.comment_item}>
                        <div className={styles.comment_avatar}>
                          {comment.author?.firstName?.charAt(0) + comment.author?.lastName?.charAt(0) || 'U'}
                        </div>
                        <div className={styles.comment_content}>
                          <div className={styles.comment_author}>
                            <span className={styles.comment_author_name}>
                              {comment.author?.firstName} {comment.author?.lastName}
                            </span>
                            <span className={styles.comment_date}>
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className={styles.comment_text}>{comment.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Create Post Modal */}
      <Dialog
        open={createPostOpen}
        onClose={() => setCreatePostOpen(false)}
        maxWidth="sm"
        fullWidth
        className={styles.create_post_dialog}
      >
        <DialogTitle className={styles.create_post_header}>
          <span>Create New Post</span>
          <IconButton onClick={() => setCreatePostOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={styles.create_post_content}>
          <TextField
            fullWidth
            label="Title"
            placeholder="What's the title of your discussion?"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className={styles.create_post_input}
            required
          />

          <TextField
            fullWidth
            label="Content"
            placeholder="Share your thoughts, questions, or experiences..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            multiline
            rows={6}
            className={styles.create_post_input}
            required
          />

          <div className={styles.create_post_actions}>
            <Button onClick={() => setCreatePostOpen(false)} className={styles.cancel_btn}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreatePost}
              disabled={submitting || !newPost.title.trim() || !newPost.content.trim()}
              className={styles.submit_btn}
            >
              {submitting ? "Posting..." : "Publish Post"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Community;