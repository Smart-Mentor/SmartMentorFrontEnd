import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Chip,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tab,
  Tabs,
  Avatar,
} from "@mui/material";
import {
  Close as CloseIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Comment as CommentIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ForumIcon from "@mui/icons-material/Forum";
import PeopleIcon from "@mui/icons-material/People";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Community.module.css";
import {
  getAllCareerGoals,
  getCommunityPosts,
  getCommunityPostsByCareerGoal,
  getPostById,
  createCommunityPost,
  deleteCommunityPost,
  addCommentToPost,
  likePost,
  unlikePost,
  getCurrentUser,
  getUserProfile,
} from "../../Api/authenticationService";

const Community = () => {
  const [animate, setAnimate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const openingPostRef = useRef(null);
  const [allPosts, setAllPosts] = useState([]); 
  const [posts, setPosts] = useState([]); 
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModalCategoryDropdown, setShowModalCategoryDropdown] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postDetailOpen, setPostDetailOpen] = useState(false);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    primaryCareerGoalId: "",
    careerGoalTagIds: [],
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
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    userId: "",
  });
  const [tabValue, setTabValue] = useState("all");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const getAuthToken = () => localStorage.getItem("authToken");

  const fetchUserInfo = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const data = await getCurrentUser();
      setUserInfo({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        userName: data.userName || "",
        email: data.email || "",
        userId: data.userId || "",
      });
      localStorage.setItem("userFirstName", data.firstName || "");
      localStorage.setItem("userLastName", data.lastName || "");
      localStorage.setItem(
        "userFullName",
        `${data.firstName || ""} ${data.lastName || ""}`.trim(),
      );
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      setUserProfileLoading(true);
      const token = getAuthToken();
      if (!token) throw new Error("Please login to view community posts");
      const data = await getUserProfile();
      if (data.success && data.data) {
        const careerGoalId = data.data.careerGoalId || data.data.careerGoal?.careerGoalId;
        setUserCareerGoalId(careerGoalId);
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

  const fetchCareerGoals = async () => {
    try {
      setCareerGoalsLoading(true);
      const data = await getAllCareerGoals();
      const mapped = data.map((goal) => ({
        careerGoalId: goal.id,
        careerGoalName: goal.name,
        description: goal.description || "",
      }));
      setCareerGoals(mapped);
    } catch (err) {
      console.error("Failed to fetch career goals:", err);
      setError("Failed to load career goals. Please try again.");
      setCareerGoals([]);
    } finally {
      setCareerGoalsLoading(false);
    }
  };

  const fetchPostsData = async (careerGoalId = null) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Please login to view community posts");
      let data;
      if (careerGoalId) {
        data = await getCommunityPostsByCareerGoal(careerGoalId);
      } else {
        data = await getCommunityPosts();
      }
      return data.success && data.data ? data.data : [];
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  const fetchCommentsForPost = async (postId) => {
    try {
      const data = await getPostById(postId);
      if (data.success && data.data?.comments) {
        const sorted = [...data.data.comments].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setPostComments((prev) => ({ ...prev, [postId]: sorted }));
      }
    } catch (err) {
      console.error("Failed to fetch comments for post", postId, err);
    }
  };

  const refreshAllPosts = async () => {
    const goalIds = careerGoals.map((g) => g.careerGoalId);
    if (goalIds.length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const allPostsArrays = await Promise.all(
        goalIds.map((id) => fetchPostsData(id)),
      );
      const counts = {};
      goalIds.forEach((id, idx) => {
        counts[id] = allPostsArrays[idx].length;
      });
      setCareerGoalPostCounts(counts);
      const merged = allPostsArrays.flat();
      const unique = Array.from(
        new Map(merged.map((p) => [p.postId, p])).values(),
      );
      const sorted = unique.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setAllPosts(sorted);
      setPosts(sorted);
      sorted.forEach((post) => fetchCommentsForPost(post.postId));
      let goalsWithPosts = careerGoals.filter(
        (g) => counts[g.careerGoalId] > 0,
      );
      if (
        userCareerGoalId &&
        !goalsWithPosts.some((g) => g.careerGoalId === userCareerGoalId)
      ) {
        const primaryGoal = careerGoals.find(
          (g) => g.careerGoalId === userCareerGoalId,
        );
        if (primaryGoal) goalsWithPosts = [primaryGoal, ...goalsWithPosts];
      }
      setCareerGoalsWithPosts(goalsWithPosts);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInlineComment = async (postId) => {
    const text = (inlineCommentText[postId] || "").trim();
    if (!text) return;
    const commentText = text;
    setInlineCommentText((prev) => ({ ...prev, [postId]: "" }));
    setInlineSubmitting((prev) => ({ ...prev, [postId]: true }));
    const optimisticComment = {
      commentId: Date.now(),
      content: commentText,
      createdAt: new Date().toISOString(),
      author: {
        firstName:
          userInfo.firstName || localStorage.getItem("userFirstName") || "You",
        lastName:
          userInfo.lastName || localStorage.getItem("userLastName") || "",
        email: userInfo.email || "",
      },
    };
    setPostComments((prev) => {
      const existing = prev[postId] || [];
      const newComments = [...existing, optimisticComment];
      const sorted = newComments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      return { ...prev, [postId]: sorted };
    });
    try {
      await addCommentToPost(postId, commentText);
      await fetchCommentsForPost(postId);
      setAllPosts((prev) =>
        prev.map((p) =>
          p.postId === postId
            ? { ...p, commentCount: (p.commentCount || 0) + 1 }
            : p,
        ),
      );
      setPosts((prev) =>
        prev.map((p) =>
          p.postId === postId
            ? { ...p, commentCount: (p.commentCount || 0) + 1 }
            : p,
        ),
      );
    } catch (err) {
      setPostComments((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).filter(
          (c) => c.commentId !== optimisticComment.commentId,
        ),
      }));
      setInlineCommentText((prev) => ({ ...prev, [postId]: commentText }));
    } finally {
      setInlineSubmitting((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleLike = async (postId, isCurrentlyLiked) => {
    try {
      const token = getAuthToken();
      if (isCurrentlyLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
      const updateFn = (prev) =>
        prev.map((post) =>
          post.postId === postId
            ? {
                ...post,
                likeCount: isCurrentlyLiked
                  ? post.likeCount - 1
                  : post.likeCount + 1,
                isLikedByCurrentUser: !isCurrentlyLiked,
              }
            : post,
        );
      setAllPosts(updateFn);
      setPosts(updateFn);
      if (selectedPost && selectedPost.postId === postId) {
        setSelectedPost((prev) => ({
          ...prev,
          likeCount: isCurrentlyLiked
            ? prev.likeCount - 1
            : prev.likeCount + 1,
          isLikedByCurrentUser: !isCurrentlyLiked,
        }));
      }
    } catch (err) {
      console.error("Failed to like/unlike post:", err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    
    setDeleting(true);
    try {
      await deleteCommunityPost(postToDelete.postId);
      setAllPosts(prev => prev.filter(post => post.postId !== postToDelete.postId));
      setPosts(prev => prev.filter(post => post.postId !== postToDelete.postId));
      
      if (selectedPost && selectedPost.postId === postToDelete.postId) {
        setPostDetailOpen(false);
        setSelectedPost(null);
      }
      
      setToast({ show: true, message: "Post deleted successfully!", type: "success" });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    } catch (err) {
      console.error("Failed to delete post:", err);
      setToast({ show: true, message: err.message || "Failed to delete post. Please try again.", type: "error" });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } finally {
      setDeleting(false);
    }
  };

  const handleCreatePost = async () => {
    if (!postTitle.trim() || !postContent.trim() || !selectedCategory) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setCreating(true);
      const requestBody = {
        title: postTitle,
        content: postContent,
        primaryCareerGoalId: parseInt(selectedCategory),
      };
      await createCommunityPost(requestBody);
      setShowCreateModal(false);
      setPostTitle("");
      setPostContent("");
      setSelectedCategory("");
      await refreshAllPosts();
      setToast({ show: true, message: "Post created successfully!", type: "success" });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    } catch (err) {
      console.error("Failed to create post:", err);
      alert(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;
    const commentContent = newComment.trim();
    setNewComment("");
    setSubmitting(true);
    try {
      await addCommentToPost(selectedPost.postId, commentContent);
      await fetchPostDetail(selectedPost.postId);
      const updateFn = (prev) =>
        prev.map((post) =>
          post.postId === selectedPost.postId
            ? { ...post, commentCount: (post.commentCount || 0) + 1 }
            : post,
        );
      setAllPosts(updateFn);
      setPosts(updateFn);
    } catch (err) {
      console.error("Failed to add comment:", err);
      setNewComment(commentContent);
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchPostDetail = async (postId) => {
    try {
      setPostDetailLoading(true);
      const data = await getPostById(postId);
      if (data.success && data.data) {
        if (data.data.comments && Array.isArray(data.data.comments)) {
          data.data.comments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
        }
        setSelectedPost(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch post detail:", err);
    } finally {
      setPostDetailLoading(false);
    }
  };

  const openPostDetail = async (post) => {
    await fetchPostDetail(post.postId);
    setPostDetailOpen(true);
  };

  const handleCareerGoalFilter = async (careerGoalId) => {
    setSelectedCareerGoalId(careerGoalId);
    setLoading(true);
    try {
      if (careerGoalId === null) {
        setPosts(allPosts);
      } else {
        const postsData = await fetchPostsData(careerGoalId);
        const sorted = postsData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setPosts(sorted);
        sorted.forEach((post) => fetchCommentsForPost(post.postId));
      }
    } catch (err) {
      setError("Failed to fetch posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilter = () => {
    handleCareerGoalFilter(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    try {
      const utcDate = new Date(dateString);
      if (isNaN(utcDate.getTime())) return "Invalid date";
      const egyptDate = new Date(utcDate.getTime() + 3 * 60 * 60 * 1000);
      const now = new Date();
      const diffMs = now - egyptDate;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24)
        return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      return egyptDate.toLocaleDateString("en-EG");
    } catch (error) {
      return "Invalid date";
    }
  };

  const stringAvatar = (name) => {
    if (!name) return { children: "U" };
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return {
        children: `${nameParts[0][0]}${nameParts[1][0]}`,
      };
    }
    return {
      children: name[0],
    };
  };

  const getSelectedCareerGoalName = () => {
    if (!selectedCareerGoalId) return "All Posts";
    const goal = careerGoals.find(
      (g) => g.careerGoalId === selectedCareerGoalId,
    );
    return goal ? goal.careerGoalName : "All Posts";
  };

  const getUserPrimaryCareerGoalName = () => {
    if (!userCareerGoalId) return null;
    const goal = careerGoals.find((g) => g.careerGoalId === userCareerGoalId);
    return goal ? goal.careerGoalName : null;
  };

  const userPosts = allPosts.filter(
    (post) => post.author?.userId === userInfo.userId,
  );

  useEffect(() => {
    setAnimate(true);
    const initialize = async () => {
      await fetchUserProfile();
      await fetchUserInfo();
      await fetchCareerGoals();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (careerGoals.length > 0) refreshAllPosts();
  }, [careerGoals]);

  const totalPosts = allPosts.length;
  const totalLikes = allPosts.reduce(
    (sum, post) => sum + (post.likeCount || 0),
    0,
  );
  const totalComments = allPosts.reduce(
    (sum, post) => sum + (post.commentCount || 0),
    0,
  );

  // Opening post from location state
  useEffect(() => {
    const openPostId = location?.state?.openPostId;
    if (!openPostId) return;
    if (openingPostRef.current === openPostId && postDetailOpen) return;
    const openPost = async () => {
      openingPostRef.current = openPostId;
      const found = posts.find((p) => String(p.postId) === String(openPostId));
      if (found) {
        await openPostDetail(found);
      } else {
        await fetchPostDetail(openPostId);
        setPostDetailOpen(true);
      }
      navigate(window.location.pathname, { replace: true, state: {} });
    };
    openPost();
  }, [location?.state?.openPostId, posts, postDetailOpen, navigate]);

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showModalCategoryDropdown &&
        !event.target.closest(`.${styles.category_select}`)
      ) {
        setShowModalCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModalCategoryDropdown]);

  // Delete dialog handlers
  const openDeleteDialog = (post, event) => {
    if (event) event.stopPropagation();
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  // Loading state
  if (
    userProfileLoading ||
    careerGoalsLoading ||
    (loading && allPosts.length === 0)
  ) {
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
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>
      <div className={styles.particle_1}></div>
      <div className={styles.particle_2}></div>

      <div className={styles.community_content}>
        <div
          className={`${styles.header_section} ${animate ? styles.fade_in : ""}`}
        >
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
            onClick={() => setShowCreateModal(true)}
          >
            <AddIcon className={styles.btn_icon} /> Create Post
          </button>
        </div>

        <div className={styles.tabs_section}>
          <div className={styles.tabs_glass_container}>
            <button
              className={`${styles.glass_tab} ${tabValue === "all" ? styles.active_glass_tab : ""}`}
              onClick={() => setTabValue("all")}
            >
              All Posts
            </button>
          </div>
          <div className={styles.tabs_glass_container}>
            <button
              className={`${styles.glass_tab} ${tabValue === "my" ? styles.active_glass_tab : ""}`}
              onClick={() => setTabValue("my")}
            >
              My Posts
            </button>
          </div>
        </div>

        {tabValue === "all" && (
          <>
            {(careerGoalsWithPosts.length > 0 || userCareerGoalId) && (
              <div
                className={`${styles.filters_section} ${animate ? styles.slide_up : ""}`}
              >
                <div className={styles.filters_header}>
                  <span className={styles.filters_label}>
                    Filter by Career Goal:
                  </span>
                  <div className={styles.active_filter_info}>
                    <span className={styles.active_filter_label}>
                      Currently showing:
                    </span>
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
                  {userCareerGoalId &&
                    (() => {
                      const primaryGoal = careerGoals.find(
                        (g) => g.careerGoalId === userCareerGoalId,
                      );
                      return (
                        primaryGoal && (
                          <button
                            key={primaryGoal.careerGoalId}
                            className={`${styles.filter_chip} ${selectedCareerGoalId === primaryGoal.careerGoalId ? styles.active_filter : ""} ${styles.primary_goal_filter}`}
                            onClick={() =>
                              handleCareerGoalFilter(primaryGoal.careerGoalId)
                            }
                          >
                            {primaryGoal.careerGoalName}
                            <span className={styles.primary_badge}>
                              Your Goal
                            </span>
                            <span className={styles.post_count_badge}>
                              {careerGoalPostCounts[primaryGoal.careerGoalId] ||
                                0}
                            </span>
                          </button>
                        )
                      );
                    })()}
                  {careerGoalsWithPosts
                    .filter((goal) => goal.careerGoalId !== userCareerGoalId)
                    .map((goal) => (
                      <button
                        key={goal.careerGoalId}
                        className={`${styles.filter_chip} ${selectedCareerGoalId === goal.careerGoalId ? styles.active_filter : ""}`}
                        onClick={() =>
                          handleCareerGoalFilter(goal.careerGoalId)
                        }
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

            {error && (
              <Alert
                severity="error"
                className={styles.error_alert}
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}

            <div className={styles.posts_list}>
              {posts.length === 0 && !loading ? (
                <div className={styles.empty_state}>
                  <div className={styles.empty_icon}>💬</div>
                  <h3>No posts yet</h3>
                  <p>Be the first to start a discussion!</p>
                  <button
                    className={styles.empty_create_btn}
                    onClick={() => setShowCreateModal(true)}
                  >
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
                          {post.author?.firstName?.charAt(0) +
                            post.author?.lastName?.charAt(0) || "U"}
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
                      <div className={styles.post_header_actions}>
                        {post.primaryCareerGoal && (
                          <Chip
                            label={post.primaryCareerGoal.careerGoalName}
                            size="small"
                            className={styles.career_goal_chip}
                            style={{
                              backgroundColor: "#0A5ADB15",
                              color: "#0A5ADB",
                            }}
                          />
                        )}
                        {post.author?.userId === userInfo.userId && (
                          <IconButton
                            className={styles.delete_post_btn}
                            onClick={(e) => openDeleteDialog(post, e)}
                            size="small"
                            title="Delete post"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </div>
                    </div>
                    <div className={styles.post_content}>
                      <h3 className={styles.post_title}>{post.title}</h3>
                      <p className={styles.post_preview}>
                        {post.contentPreview || post.content?.substring(0, 150)}
                        {(post.contentPreview?.length > 150 ||
                          post.content?.length > 150) &&
                          "..."}
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
                            <FavoriteBorderIcon
                              className={styles.action_icon}
                            />
                          )}
                          <span>{post.likeCount}</span>
                        </button>
                        <button
                          className={styles.action_btn}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedComments((prev) => ({
                              ...prev,
                              [post.postId]: !prev[post.postId],
                            }));
                          }}
                        >
                          <CommentIcon className={styles.action_icon} />
                          <span>{post.commentCount}</span>
                        </button>
                      </div>
                    </div>
                    <div
                      className={styles.inline_comments_section}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={styles.inline_comment_input_row}>
                        <div className={styles.inline_comment_avatar}>
                          {userInfo.firstName?.charAt(0) +
                            userInfo.lastName?.charAt(0) ||
                            localStorage.getItem("userFirstName")?.charAt(0) +
                              localStorage.getItem("userLastName")?.charAt(0) ||
                            "U"}
                        </div>
                        <div className={styles.inline_comment_input_wrap}>
                          <input
                            className={styles.inline_comment_input}
                            type="text"
                            placeholder="Write a comment..."
                            value={inlineCommentText[post.postId] || ""}
                            onChange={(e) =>
                              setInlineCommentText((prev) => ({
                                ...prev,
                                [post.postId]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter")
                                handleInlineComment(post.postId);
                            }}
                            disabled={inlineSubmitting[post.postId]}
                          />
                          <button
                            className={styles.inline_send_btn}
                            onClick={() => handleInlineComment(post.postId)}
                            disabled={
                              inlineSubmitting[post.postId] ||
                              !(inlineCommentText[post.postId] || "").trim()
                            }
                          >
                            <SendIcon fontSize="small" />
                          </button>
                        </div>
                      </div>
                      {postComments[post.postId] &&
                        postComments[post.postId].length > 0 && (
                          <div className={styles.inline_comments_list}>
                            {(expandedComments[post.postId]
                              ? postComments[post.postId]
                              : postComments[post.postId].slice(0, 2)
                            ).map((comment) => (
                              <div
                                key={comment.commentId}
                                className={styles.inline_comment_item}
                              >
                                <div className={styles.inline_commenter_avatar}>
                                  {comment.author?.firstName?.charAt(0) +
                                    comment.author?.lastName?.charAt(0) || "U"}
                                </div>
                                <div className={styles.inline_comment_bubble}>
                                  <span
                                    className={styles.inline_commenter_name}
                                  >
                                    {comment.author?.firstName}{" "}
                                    {comment.author?.lastName}
                                  </span>
                                  <p className={styles.inline_comment_text}>
                                    {comment.content}
                                  </p>
                                  <span className={styles.inline_comment_time}>
                                    {formatDate(comment.createdAt)}
                                  </span>
                                </div>
                              </div>
                            ))}
                            {postComments[post.postId].length > 2 && (
                              <button
                                className={styles.inline_view_more_btn}
                                onClick={() =>
                                  setExpandedComments((prev) => ({
                                    ...prev,
                                    [post.postId]: !prev[post.postId],
                                  }))
                                }
                              >
                                {expandedComments[post.postId]
                                  ? "Show less"
                                  : `View ${postComments[post.postId].length - 2} more comment${postComments[post.postId].length - 2 > 1 ? "s" : ""}`}
                              </button>
                            )}
                          </div>
                        )}
                      {!postComments[post.postId] ? (
                        <div className={styles.inline_comments_loading}>
                          <CircularProgress size={14} />
                          <span>Loading comments...</span>
                        </div>
                      ) : (
                        postComments[post.postId].length === 0 && (
                          <p className={styles.inline_no_comments}>
                            No comments yet. Be the first!
                          </p>
                        )
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {tabValue === "my" && (
          <div className={styles.posts_list}>
            {userPosts.length === 0 ? (
              <div className={styles.empty_state}>
                <div className={styles.empty_icon}>📝</div>
                <h3>No posts yet</h3>
                <p>
                  You haven't created any posts. Start sharing your knowledge!
                </p>
                <button
                  className={styles.empty_create_btn}
                  onClick={() => setShowCreateModal(true)}
                >
                  Create First Post
                </button>
              </div>
            ) : (
              userPosts.map((post, index) => (
                <div
                  key={post.postId}
                  className={`${styles.post_card} ${animate ? styles.slide_up : ""}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={styles.post_header}>
                    <div className={styles.author_info}>
                      <div className={styles.author_avatar}>
                        {post.author?.firstName?.charAt(0) +
                          post.author?.lastName?.charAt(0) || "U"}
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
                    <div className={styles.post_header_actions}>
                      {post.primaryCareerGoal && (
                        <Chip
                          label={post.primaryCareerGoal.careerGoalName}
                          size="small"
                          className={styles.career_goal_chip}
                          style={{
                            backgroundColor: "#0A5ADB15",
                            color: "#0A5ADB",
                          }}
                        />
                      )}
                      <IconButton
                        className={styles.delete_post_btn}
                        onClick={(e) => openDeleteDialog(post, e)}
                        size="small"
                        title="Delete post"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                  <div className={styles.post_content}>
                    <h3 className={styles.post_title}>{post.title}</h3>
                    <p className={styles.post_preview}>
                      {post.contentPreview || post.content?.substring(0, 150)}
                      {(post.contentPreview?.length > 150 ||
                        post.content?.length > 150) &&
                        "..."}
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
                          setExpandedComments((prev) => ({
                            ...prev,
                            [post.postId]: !prev[post.postId],
                          }));
                        }}
                      >
                        <CommentIcon className={styles.action_icon} />
                        <span>{post.commentCount}</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className={styles.inline_comments_section}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={styles.inline_comment_input_row}>
                      <div className={styles.inline_comment_avatar}>
                        {userInfo.firstName?.charAt(0) +
                          userInfo.lastName?.charAt(0) ||
                          localStorage.getItem("userFirstName")?.charAt(0) +
                            localStorage.getItem("userLastName")?.charAt(0) ||
                          "U"}
                      </div>
                      <div className={styles.inline_comment_input_wrap}>
                        <input
                          className={styles.inline_comment_input}
                          type="text"
                          placeholder="Write a comment..."
                          value={inlineCommentText[post.postId] || ""}
                          onChange={(e) =>
                            setInlineCommentText((prev) => ({
                              ...prev,
                              [post.postId]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              handleInlineComment(post.postId);
                          }}
                          disabled={inlineSubmitting[post.postId]}
                        />
                        <button
                          className={styles.inline_send_btn}
                          onClick={() => handleInlineComment(post.postId)}
                          disabled={
                            inlineSubmitting[post.postId] ||
                            !(inlineCommentText[post.postId] || "").trim()
                          }
                        >
                          <SendIcon fontSize="small" />
                        </button>
                      </div>
                    </div>
                    {postComments[post.postId] &&
                      postComments[post.postId].length > 0 && (
                        <div className={styles.inline_comments_list}>
                          {(expandedComments[post.postId]
                            ? postComments[post.postId]
                            : postComments[post.postId].slice(0, 2)
                          ).map((comment) => (
                            <div
                              key={comment.commentId}
                              className={styles.inline_comment_item}
                            >
                              <div className={styles.inline_commenter_avatar}>
                                {comment.author?.firstName?.charAt(0) +
                                  comment.author?.lastName?.charAt(0) || "U"}
                              </div>
                              <div className={styles.inline_comment_bubble}>
                                <span className={styles.inline_commenter_name}>
                                  {comment.author?.firstName}{" "}
                                  {comment.author?.lastName}
                                </span>
                                <p className={styles.inline_comment_text}>
                                  {comment.content}
                                </p>
                                <span className={styles.inline_comment_time}>
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                            </div>
                          ))}
                          {postComments[post.postId].length > 2 && (
                            <button
                              className={styles.inline_view_more_btn}
                              onClick={() =>
                                setExpandedComments((prev) => ({
                                  ...prev,
                                  [post.postId]: !prev[post.postId],
                                }))
                              }
                            >
                              {expandedComments[post.postId]
                                ? "Show less"
                                : `View ${postComments[post.postId].length - 2} more comment${postComments[post.postId].length - 2 > 1 ? "s" : ""}`}
                            </button>
                          )}
                        </div>
                      )}
                    {!postComments[post.postId] ? (
                      <div className={styles.inline_comments_loading}>
                        <CircularProgress size={14} />
                        <span>Loading comments...</span>
                      </div>
                    ) : (
                      postComments[post.postId].length === 0 && (
                        <p className={styles.inline_no_comments}>
                          No comments yet. Be the first!
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        className={styles.delete_dialog}
      >
        <DialogTitle className={styles.delete_dialog_title}>
          <DeleteIcon className={styles.delete_dialog_icon} />
          Delete Post
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={styles.delete_dialog_text}>
            Are you sure you want to delete this post? This action cannot be undone and all comments will be permanently removed.
          </DialogContentText>
          {postToDelete && (
            <Box className={styles.delete_post_preview}>
              <strong>"{postToDelete.title}"</strong>
            </Box>
          )}
        </DialogContent>
        <DialogActions className={styles.delete_dialog_actions}>
          <Button onClick={handleCancelDelete} className={styles.cancel_delete_btn}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            className={styles.confirm_delete_btn}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Post Detail Dialog */}
      <Dialog
        open={postDetailOpen}
        onClose={() => {
          setPostDetailOpen(false);
          openingPostRef.current = null;
        }}
        maxWidth="md"
        fullWidth
        className={styles.detail_dialog}
      >
        {postDetailLoading ? (
          <div className={styles.detail_loading}>
            <CircularProgress />
          </div>
        ) : (
          selectedPost && (
            <>
              <DialogTitle className={styles.detail_header}>
                <div className={styles.detail_title_wrapper}>
                  <div className={styles.detail_author_avatar}>
                    {selectedPost.author?.firstName?.charAt(0) +
                      selectedPost.author?.lastName?.charAt(0) || "U"}
                  </div>
                  <div className={styles.detail_author_info}>
                    <span className={styles.detail_author_name}>
                      {selectedPost.author?.firstName}{" "}
                      {selectedPost.author?.lastName}
                    </span>
                    <span className={styles.detail_post_date}>
                      {formatDate(selectedPost.createdAt)}
                    </span>
                  </div>
                </div>
                <div className={styles.detail_header_actions}>
                  {selectedPost.author?.userId === userInfo.userId && (
                    <IconButton
                      className={styles.detail_delete_btn}
                      onClick={() => {
                        setPostDetailOpen(false);
                        openDeleteDialog(selectedPost, { stopPropagation: () => {} });
                      }}
                      size="small"
                      title="Delete post"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  <IconButton onClick={() => setPostDetailOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </div>
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
                    onClick={() =>
                      handleLike(
                        selectedPost.postId,
                        selectedPost.isLikedByCurrentUser,
                      )
                    }
                  >
                    {selectedPost.isLikedByCurrentUser ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                    <span>{selectedPost.likeCount} Likes</span>
                  </button>
                </div>
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
                      <SendIcon /> Comment
                    </button>
                  </div>
                  <div className={styles.comments_list}>
                    {selectedPost.comments?.length === 0 ? (
                      <div className={styles.no_comments}>
                        <span>No comments yet. Be the first to comment!</span>
                      </div>
                    ) : (
                      selectedPost.comments?.map((comment) => (
                        <div
                          key={comment.commentId}
                          className={styles.comment_item}
                        >
                          <div className={styles.comment_avatar}>
                            {comment.author?.firstName?.charAt(0) +
                              comment.author?.lastName?.charAt(0) || "U"}
                          </div>
                          <div className={styles.comment_content}>
                            <div className={styles.comment_author}>
                              <span className={styles.comment_author_name}>
                                {comment.author?.firstName}{" "}
                                {comment.author?.lastName}
                              </span>
                              <span className={styles.comment_date}>
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className={styles.comment_text}>
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </DialogContent>
            </>
          )
        )}
      </Dialog>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div
          className={styles.modal_overlay}
          onClick={() => setShowCreateModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal_header}>
              <h3>✨ Create Post</h3>
              <IconButton
                className={styles.close_btn}
                onClick={() => setShowCreateModal(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>

            <div className={styles.modal_body}>
              <div className={styles.modal_author}>
                <Avatar
                  {...stringAvatar(
                    userInfo.firstName + " " + userInfo.lastName || "User",
                  )}
                  className={styles.modal_avatar}
                />
                <div>
                  <h4>
                    {userInfo.firstName} {userInfo.lastName}
                  </h4>
                  <span>
                    {getUserPrimaryCareerGoalName() || "Community Member"}
                  </span>
                </div>
              </div>

              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="📌 Title your post..."
                className={styles.title_input}
                maxLength={200}
              />

              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="💡 What do you want to share?"
                className={styles.content_input}
                maxLength={4000}
              />

              <div className={styles.char_count}>
                <span
                  className={postContent.length > 3800 ? styles.warning : ""}
                >
                  {postContent.length}/4000
                </span>
              </div>

              <div className={styles.category_select_wrapper}>
                <label>📂 Category:</label>
                <div className={styles.category_select}>
                  <button
                    type="button"
                    className={styles.cat_dropdown_btn}
                    onClick={() =>
                      setShowModalCategoryDropdown(!showModalCategoryDropdown)
                    }
                  >
                    <span>
                      {selectedCategory
                        ? careerGoals.find(
                            (g) =>
                              g.careerGoalId === parseInt(selectedCategory),
                          )?.careerGoalName
                        : "Select a category"}
                    </span>
                    <KeyboardArrowDownIcon
                      className={`${styles.cat_arrow} ${showModalCategoryDropdown ? styles.rotated : ""}`}
                    />
                  </button>

                  {showModalCategoryDropdown && (
                    <div className={styles.cat_dropdown_menu}>
                      {careerGoals.map((goal) => (
                        <button
                          key={goal.careerGoalId}
                          type="button"
                          className={`${styles.cat_option} ${selectedCategory === goal.careerGoalId.toString() ? styles.selected : ""}`}
                          onClick={() => {
                            setSelectedCategory(goal.careerGoalId.toString());
                            setShowModalCategoryDropdown(false);
                          }}
                        >
                          {goal.careerGoalName}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.modal_footer}>
              <Button
                className={styles.cancel_btn}
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button
                className={styles.submit_btn}
                onClick={handleCreatePost}
                disabled={
                  creating ||
                  !postTitle.trim() ||
                  !postContent.trim() ||
                  !selectedCategory
                }
              >
                {creating ? "🚀 Publishing..." : "🚀 Publish"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast.show && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      )}
    </Box>
  );
};

export default Community;