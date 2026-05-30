import { useState, useEffect, useRef } from "react";
import { Avatar, Button, Divider, IconButton, Badge } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  getCurrentUser,
  getAllCareerGoals,
  createPost,
  addComment,
  likePost,
  unlikePost,
  getUserProfile,
  getPostsByCareerGoal,
  getPostById,
} from "../../api/authenticationService";
import styles from "./Community.module.css";

// ================================================
// 🚫 قائمة الكلمات المحظورة
// ================================================
const BLOCKED_PATTERNS = {
  arabic: [
    "زب",
    "زبي",
    "زباله",
    "نيج",
    "نيجه",
    "عرص",
    "قحب",
    "خنز",
    "قذر",
    "لوطي",
    "لوط",
    "مثلي",
    "كلب",
    "حمار",
    "قرد",
    "خنزير",
    "لعنة",
    "لعين",
    "ملعون",
    "زنوج",
  ],
  english: [
    "fuck",
    "fucks",
    "fucked",
    "fucking",
    "fucker",
    "shit",
    "shits",
    "shitty",
    "ass",
    "asses",
    "asshole",
    "assholes",
    "bitch",
    "bitches",
    "bitchy",
    "bastard",
    "bastards",
    "dick",
    "dicks",
    "dickhead",
    "pussy",
    "pussies",
    "cock",
    "cocks",
    "whore",
    "whores",
    "slut",
    "sluts",
    "nigger",
    "nigga",
    "niggers",
    "niggas",
    "faggot",
    "fags",
    "retard",
    "retards",
    "moron",
    "morons",
    "idiot",
    "idiots",
    "dumbass",
    "cunt",
    "porn",
    "sexy",
  ],
  symbols: ["fuk", "fck", "fuq", "phuck", "fukn", "sh1t", "@$$"],
};

const checkBlockedWords = (text) => {
  if (!text) return { blocked: false, foundWords: [] };
  const lowerText = text.toLowerCase().trim();
  const foundWords = [];
  const allPatterns = [
    ...BLOCKED_PATTERNS.arabic,
    ...BLOCKED_PATTERNS.english,
    ...BLOCKED_PATTERNS.symbols,
  ];
  for (const word of allPatterns) {
    if (lowerText.includes(word.toLowerCase())) {
      foundWords.push(word);
    }
  }
  return { blocked: foundWords.length > 0, foundWords };
};

const cleanText = (text) => {
  if (!text) return "";
  return text.replace(/\s+/g, " ").trim();
};

// ================================================
// 🎨 ألوان الأفاتار الفاخرة
// ================================================
const avatarGradients = [
  "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
  "linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)",
  "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
  "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)",
  "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)",
  "linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)",
  "linear-gradient(135deg, #FA709A 0%, #FEE140 100%)",
  "linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)",
  "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
  "linear-gradient(135deg, #FFECD2 0%, #FCB69F 100%)",
  "linear-gradient(135deg, #A1C4FD 0%, #C2E9FB 100%)",
  "linear-gradient(135deg, #D4FC79 0%, #96E6A1 100%)",
  "linear-gradient(135deg, #FDDb92 0%, #D1FDFF 100%)",
  "linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)",
  "linear-gradient(135deg, #FF6B6B 0%, #FECA57 100%)",
  "linear-gradient(135deg, #5F27CD 0%, #48DBFB 100%)",
  "linear-gradient(135deg, #00D2D3 0%, #FF9FF3 100%)",
  "linear-gradient(135deg, #FC5C7D 0%, #6A82FB 100%)",
  "linear-gradient(135deg, #11998E 0%, #38EF7D 100%)",
  "linear-gradient(135deg, #EE0979 0%, #FF6A00 100%)",
];

const getAvatarGradient = (name) => {
  if (!name) return avatarGradients[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarGradients[Math.abs(hash) % avatarGradients.length];
};

function stringAvatar(name) {
  if (!name)
    return { children: "?", sx: { background: getAvatarGradient(name) } };
  const names = name.trim().split(" ");
  let initials = "";
  if (names.length >= 2) {
    initials = `${names[0][0]}${names[1][0]}`.toUpperCase();
  } else if (names[0]?.length >= 2) {
    initials = names[0].substring(0, 2).toUpperCase();
  } else {
    initials = names[0]?.[0]?.toUpperCase() || "?";
  }

  return {
    children: initials,
    sx: {
      background: getAvatarGradient(name),
      fontWeight: 800,
      fontSize: name.length > 10 ? "14px" : "16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    },
  };
}

// ================================================
// 🔹 دالة تحويل بيانات البوست من API
// ================================================
const transformPost = (post, careerGoals = []) => {
  let categoryName =
    post.primaryCareerGoal?.careerGoalName || post.careerGoalName || "General";

  if (post.careerGoalId || post.primaryCareerGoalId) {
    const goalId = post.careerGoalId || post.primaryCareerGoalId;
    const goal = careerGoals.find((g) => g.id === goalId);
    categoryName =
      goal?.name ||
      post.primaryCareerGoal?.careerGoalName ||
      post.careerGoalName ||
      "General";
  }

  return {
    id: post.id || post.postId,
    title: post.title || "",
    content:
      post.content ||
      post.data?.content ||
      post.contentPreview ||
      post.body ||
      "",
    userName:
      post.userName ||
      post.authorName ||
      post.name ||
      `${post.author?.firstName || ""} ${post.author?.lastName || ""}`.trim() ||
      "Anonymous",
    userId:
      post.userId || post.authorId || post.user?.id || post.author?.userId,
    likes: post.likes ?? post.likeCount ?? post.data?.likeCount ?? 0,
    isLiked: post.isLiked ?? post.isLikedByCurrentUser ?? false,
    comments: (
      post.comments ||
      post.postComments ||
      post.data?.comments ||
      []
    ).map((c) => ({
      id: c.id || c.commentId,
      userName:
        c.userName ||
        c.authorName ||
        `${c.author?.firstName || ""} ${c.author?.lastName || ""}`.trim() ||
        "Anonymous",
      userId: c.userId || c.authorId || c.author?.userId,
      content: c.content || c.text || "",
      createdAt: c.createdAt || c.date || new Date().toISOString(),
    })),
    createdAt:
      post.createdAt || post.date || post.created || new Date().toISOString(),
    category: categoryName,
    categoryId: post.careerGoalId || post.primaryCareerGoalId,
  };
};

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [careerGoals, setCareerGoals] = useState([]);
  const [selectedCareerGoal, setSelectedCareerGoal] = useState("all");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("feed");
  const [notification, setNotification] = useState(null);
  const [userData, setUserData] = useState({
    id: null,
    name: "",
    careerGoalName: "Student",
  });

  // Create Post State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [creating, setCreating] = useState(false);

  // ================================================
  // 🔔 Notifications State
  // ================================================
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bellShaking, setBellShaking] = useState(false);
  const [newNotificationPopup, setNewNotificationPopup] = useState(null);
  const notificationRef = useRef(null);

  // Comment State
  const [commentText, setCommentText] = useState({});
  const [activeComments, setActiveComments] = useState(null);
  const [submittingComment, setSubmittingComment] = useState(null);

  // Delete State
  const [postToDelete, setPostToDelete] = useState(null);

  // Category Dropdown State
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showModalCategoryDropdown, setShowModalCategoryDropdown] =
    useState(false);
  const categoryRef = useRef(null);

  const previousPostsRef = useRef([]);
  const isFetchingNotificationsRef = useRef(false);

  useEffect(() => {
    fetchInitialData();
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
        setShowModalCategoryDropdown(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (careerGoals.length > 0) {
      fetchPosts();
    }
  }, [selectedCareerGoal, careerGoals, userData.id]);

  // ================================================
  // 🔔 Background Notification Check
  // ================================================
  useEffect(() => {
    if (!userData.id || careerGoals.length === 0) return;

    const interval = setInterval(async () => {
      if (isFetchingNotificationsRef.current) return;

      isFetchingNotificationsRef.current = true;

      if (previousPostsRef.current.length === 0) {
        await fetchPosts(false);
      } else {
        await fetchPosts(true);
      }
      isFetchingNotificationsRef.current = false;
    }, 15000);

    return () => clearInterval(interval);
  }, [careerGoals, selectedCareerGoal, userData.id]);

  useEffect(() => {
    if (notifications.length > 0) {
      setBellShaking(true);
      const timer = setTimeout(() => setBellShaking(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [notifications.length]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const [currentUser, allCareerGoalsData, userProfile] = await Promise.all([
        getCurrentUser().catch(() => null),
        getAllCareerGoals().catch(() => []),
        getUserProfile().catch(() => null),
      ]);

      const userId =
        currentUser?.id ||
        currentUser?.userId ||
        localStorage.getItem("userId");

      setUserData({
        id: userId,
        name: `${currentUser?.firstName || "User"} ${currentUser?.lastName || ""}`.trim(),
        careerGoalName: userProfile?.careerGoalName || "Student",
      });

      setCareerGoals(allCareerGoalsData || []);

      if (allCareerGoalsData?.length > 0 && !selectedCategory) {
        setSelectedCategory(allCareerGoalsData[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch initial data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (isAutoRefresh = false) => {
    try {
      let fetchedPosts = [];

      if (selectedCareerGoal === "all") {
        for (const goal of careerGoals) {
          try {
            const response = await getPostsByCareerGoal(goal.id);
            const categoryPosts =
              response?.posts || response?.data || response?.items || response;

            if (Array.isArray(categoryPosts)) {
              const transformed = await Promise.all(
                categoryPosts.map(async (post) => {
                  let fullPost = post;
                  try {
                    const response = await getPostById(post.postId || post.id);
                    fullPost = response?.data || response;
                  } catch (e) {
                    console.error("Failed full post fetch", e);
                  }

                  return transformPost(
                    { ...post, ...fullPost, careerGoalId: goal.id },
                    careerGoals,
                  );
                }),
              );
              fetchedPosts.push(...transformed);
            }
          } catch (err) {
            console.error(`Failed category ${goal.id}`, err);
          }
        }
      } else {
        const response = await getPostsByCareerGoal(selectedCareerGoal);
        const categoryPosts =
          response?.posts || response?.data || response?.items || response;

        fetchedPosts = Array.isArray(categoryPosts)
          ? await Promise.all(
              categoryPosts.map(async (post) => {
                let fullPost = post;
                try {
                  const response = await getPostById(post.postId || post.id);
                  fullPost = response?.data || response;
                } catch (e) {
                  console.error("Failed full post fetch", e);
                }
                return transformPost({ ...post, ...fullPost }, careerGoals);
              }),
            )
          : [];
      }

      fetchedPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      if (!isAutoRefresh) {
        fetchedPosts = [...fetchedPosts].sort(() => Math.random() - 0.5);
      }

      if (isAutoRefresh && previousPostsRef.current.length > 0) {
        const previousPosts = previousPostsRef.current;
        const newNotifications = [];

        fetchedPosts.forEach((newPost) => {
          const oldPost = previousPosts.find((p) => p.id === newPost.id);

          if (oldPost && String(newPost.userId) === String(userData.id)) {
            if (newPost.likes > oldPost.likes && !newPost.isLiked) {
              const likeCount = newPost.likes - oldPost.likes;
              newNotifications.push({
                id: Date.now() + Math.random(),
                postId: newPost.id,
                type: "like",
                text:
                  likeCount === 1
                    ? `❤️ Someone liked your post "${newPost.title.substring(0, 25)}${newPost.title.length > 25 ? "..." : ""}"`
                    : `❤️ ${likeCount} people liked your post "${newPost.title.substring(0, 25)}${newPost.title.length > 25 ? "..." : ""}"`,
                createdAt: new Date().toISOString(),
              });
            }

            const oldCommentIds = new Set(
              (oldPost.comments || []).map((c) => c.id),
            );

            const newComments = (newPost.comments || []).filter(
              (c) => !oldCommentIds.has(c.id),
            );

            if (newComments.length > 0) {
              newNotifications.push({
                id: Date.now() + Math.random() + 1,
                postId: newPost.id,
                type: "comment",
                text:
                  newComments.length === 1
                    ? `💬 Someone commented on "${newPost.title.substring(0, 25)}${newPost.title.length > 25 ? "..." : ""}"`
                    : `💬 ${newComments.length} new comments on "${newPost.title.substring(0, 25)}${newPost.title.length > 25 ? "..." : ""}"`,
                createdAt: new Date().toISOString(),
              });
            }
          }
        });

        if (newNotifications.length > 0) {
          console.log("🔔 New notifications detected:", newNotifications);

          setNotifications((prev) => {
            const existing = new Set(
              prev.map((n) => `${n.type}-${n.postId}-${n.text}`),
            );
            const filtered = newNotifications.filter(
              (n) => !existing.has(`${n.type}-${n.postId}-${n.text}`),
            );
            return [...filtered, ...prev];
          });

          setNewNotificationPopup(newNotifications[0]);
          setTimeout(() => setNewNotificationPopup(null), 5000);
        }
      }

      previousPostsRef.current = fetchedPosts;

      if (!isAutoRefresh) {
        setPosts(fetchedPosts);

        setMyPosts(
          fetchedPosts.filter(
            (post) => String(post.userId) === String(userData.id),
          ),
        );
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setPosts([]);
      setMyPosts([]);
    }
  };

  // ================================================
  // 🔹 إنشاء بوست جديد
  // ================================================
  const handleCreatePost = async () => {
    const titleCheck = checkBlockedWords(postTitle);
    const contentCheck = checkBlockedWords(postContent);

    if (titleCheck.blocked) {
      showNotification(
        `Title contains inappropriate words: "${titleCheck.foundWords.join(", ")}"`,
        "error",
      );
      return;
    }

    if (contentCheck.blocked) {
      showNotification(
        `Content contains inappropriate words: "${contentCheck.foundWords.join(", ")}"`,
        "error",
      );
      return;
    }

    if (!postTitle.trim() || !postContent.trim()) {
      showNotification("Please fill in title and content", "error");
      return;
    }

    if (!selectedCategory) {
      showNotification("Please select a category", "error");
      return;
    }

    try {
      setCreating(true);

      const postData = {
        title: cleanText(postTitle),
        content: cleanText(postContent),
        primaryCareerGoalId: selectedCategory,
      };

      const newPost = await createPost(postData);

      const goal = careerGoals.find((g) => g.id === selectedCategory);
      const createdPost = {
        id: newPost?.id || newPost?.postId || Date.now(),
        title: cleanText(postTitle),
        content: cleanText(postContent),
        userName: userData.name,
        userId: userData.id,
        likes: 0,
        isLiked: false,
        comments: [],
        createdAt: new Date().toISOString(),
        category: goal?.name || "General",
        categoryId: selectedCategory,
      };

      setPosts((prev) => [createdPost, ...prev]);
      setMyPosts((prev) => [createdPost, ...prev]);

      setPostTitle("");
      setPostContent("");
      setShowCreateModal(false);
      showNotification("Post created successfully! 🎉", "success");
    } catch (err) {
      console.error("Failed to create post:", err);
      showNotification("Failed to create post", "error");
    } finally {
      setCreating(false);
    }
  };

  // ================================================
  // 🔹 حذف بوست
  // ================================================
  const handleDeletePost = async () => {
    if (!postToDelete) return;
    const postId = postToDelete;
    setPostToDelete(null);

    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setMyPosts((prev) => prev.filter((p) => p.id !== postId));

    showNotification("Post deleted successfully! 🗑️", "success");
  };

  // ================================================
  // 🔹 لايك/أنلايك بوست
  // ================================================
  const handleLike = async (postId) => {
    const currentPost = posts.find((p) => p.id === postId);
    if (!currentPost) return;

    const wasLiked = currentPost.isLiked;

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              isLiked: !wasLiked,
              likes: wasLiked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );

    setMyPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              isLiked: !wasLiked,
              likes: wasLiked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );

    try {
      if (wasLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    } catch (err) {
      console.error("Failed to update like:", err);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, isLiked: wasLiked, likes: currentPost.likes }
            : p,
        ),
      );
      setMyPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, isLiked: wasLiked, likes: currentPost.likes }
            : p,
        ),
      );
    }
  };

  // ================================================
  // 🔹 إضافة تعليق
  // ================================================
  const handleAddComment = async (postId) => {
    const currentComment = commentText[postId] || "";

    if (!currentComment.trim()) {
      showNotification("Please enter a comment", "error");
      return;
    }

    const contentCheck = checkBlockedWords(currentComment);
    if (contentCheck.blocked) {
      showNotification(
        `Comment contains inappropriate words: "${contentCheck.foundWords.join(", ")}"`,
        "error",
      );
      return;
    }

    const commentData = {
      id: Date.now(),
      userName: userData.name,
      userId: userData.id,
      content: cleanText(currentComment),
      createdAt: new Date().toISOString(),
    };

    setSubmittingComment(postId);

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...(p.comments || []), commentData] }
          : p,
      ),
    );

    setMyPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...(p.comments || []), commentData] }
          : p,
      ),
    );

    const tempCommentText = currentComment;

    setCommentText((prev) => ({
      ...prev,
      [postId]: "",
    }));

    try {
      await addComment(postId, cleanText(tempCommentText));
      showNotification("Comment added! 💬", "success");
    } catch (err) {
      console.error("Failed to add comment:", err);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: p.comments.filter((c) => c.id !== commentData.id),
              }
            : p,
        ),
      );
      setMyPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: p.comments.filter((c) => c.id !== commentData.id),
              }
            : p,
        ),
      );
      showNotification("Failed to add comment", "error");
    } finally {
      setSubmittingComment(null);
    }
  };

  // ================================================
  // 🔹 حذف تعليق
  // ================================================
  const handleDeleteComment = async (postId, commentId) => {
    const commentToDelete = posts
      .find((p) => p.id === postId)
      ?.comments?.find((c) => c.id === commentId);

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) }
          : p,
      ),
    );

    setMyPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) }
          : p,
      ),
    );

    try {
      showNotification("Comment deleted! 🗑️", "success");
    } catch (err) {
      console.error("Failed to delete comment:", err);
      if (commentToDelete) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? { ...p, comments: [...(p.comments || []), commentToDelete] }
              : p,
          ),
        );
        setMyPosts((prev) =>
          prev.map((p) =>
            p.id === postId
              ? { ...p, comments: [...(p.comments || []), commentToDelete] }
              : p,
          ),
        );
      }
      showNotification("Failed to delete comment", "error");
    }
  };

  // ================================================
  // 🔹 مسح كل الإشعارات
  // ================================================
  const clearAllNotifications = () => {
    setNotifications([]);
    showNotification("All notifications cleared! ✅", "success");
  };

  // ================================================
  // 🔹 مسح إشعار واحد
  // ================================================
  const removeNotification = (notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const toggleComments = (postId) => {
    setActiveComments(activeComments === postId ? null : postId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isOwnPost = (post) => {
    if (!post || !userData.id) return false;
    return String(post.userId) === String(userData.id);
  };

  const isOwnComment = (comment) => {
    if (!comment || !userData.id) return false;
    return String(comment.userId) === String(userData.id);
  };

  const getSelectedCategoryName = () => {
    if (selectedCareerGoal === "all") return "All Categories";
    const goal = careerGoals.find((g) => g.id === selectedCareerGoal);
    return goal?.name || "Select Category";
  };

  const displayedPosts = activeTab === "my-posts" ? myPosts : posts;

  if (loading) {
    return (
      <div className={styles.community_container}>
        <div className={styles.loading_container}>
          <div className={styles.loading_spinner}></div>
          <p>Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.community_container}>
      {/* 🔔 New Notification Popup Toast */}
      {newNotificationPopup && (
        <div className={styles.notification_popup}>
          <div className={styles.popup_icon}>
            {newNotificationPopup.type === "like" ? (
              <FavoriteIcon className={styles.heart_icon} />
            ) : (
              <CommentIcon className={styles.comment_icon} />
            )}
          </div>
          <div className={styles.popup_content}>
            <p>{newNotificationPopup.text}</p>
            <small>{formatDate(newNotificationPopup.createdAt)}</small>
          </div>
          <IconButton
            className={styles.popup_close}
            onClick={() => setNewNotificationPopup(null)}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      )}

      {/* Main Notification Toast */}
      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      {/* ================================================ */}
      {/* 🔔 Floating Action Button - ثابت */}
      {/* ================================================ */}
      <button
        className={styles.fab_button}
        onClick={() => setShowCreateModal(true)}
        title="Create new post"
      >
        <AddIcon className={styles.fab_icon} />
      </button>

      <div className={styles.community_content}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.header_left}>
            <h2 className={styles.header_title}>Community</h2>
            <p className={styles.header_subtitle}>
              Share knowledge and connect with others
            </p>
          </div>

          {/* 🔔 Notification Bell Button */}
          <div className={styles.header_right} ref={notificationRef}>
            <button
              className={`${styles.notification_bell_btn} ${bellShaking ? styles.shaking : ""}`}
              onClick={async () => {
                const newState = !showNotifications;

                setShowNotifications(newState);
                if (newState) {
                  setBellShaking(false);
                }

                // لما يفتح الجرس
                if (newState) {
                  // أول fetch يحفظ البيانات القديمة
                  if (previousPostsRef.current.length === 0) {
                    await fetchPosts(false);
                  } else {
                    await fetchPosts(true);
                  }
                }
              }}
            >
              <Badge
                badgeContent={notifications.length}
                className={styles.badge}
                max={99}
              >
                <NotificationsIcon className={styles.bell_icon} />
              </Badge>
            </button>

            {showNotifications && (
              <div className={styles.notification_panel}>
                <div className={styles.notification_panel_header}>
                  <h3>🔔 Notifications</h3>
                  {notifications.length > 0 && (
                    <button
                      className={styles.clear_all_btn}
                      onClick={clearAllNotifications}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className={styles.notification_list}>
                  {notifications.length === 0 ? (
                    <div className={styles.empty_notifications}>
                      <NotificationsIcon className={styles.empty_icon} />
                      <p>No notifications yet</p>
                      <small>
                        We'll notify you when someone likes or comments on your
                        posts!
                      </small>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`${styles.notification_item} ${styles[n.type]}`}
                      >
                        <div className={styles.notification_item_icon}>
                          {n.type === "like" ? "❤️" : "💬"}
                        </div>
                        <div className={styles.notification_item_content}>
                          <p>{n.text}</p>
                          <small>{formatDate(n.createdAt)}</small>
                        </div>
                        <button
                          className={styles.remove_notification_btn}
                          onClick={() => removeNotification(n.id)}
                        >
                          <CloseIcon fontSize="small" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "feed" ? styles.active : ""}`}
            onClick={() => setActiveTab("feed")}
          >
            <span className={styles.tab_icon}>🌐</span>
            All Posts
          </button>
          <button
            className={`${styles.tab} ${activeTab === "my-posts" ? styles.active : ""}`}
            onClick={() => setActiveTab("my-posts")}
          >
            <span className={styles.tab_icon}>📝</span>
            My Posts
          </button>
        </div>

        {/* Category Dropdown */}
        <div className={styles.category_dropdown_wrapper} ref={categoryRef}>
          <button
            className={styles.category_dropdown_btn}
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <span className={styles.dropdown_label}>Category:</span>
            <span className={styles.dropdown_value}>
              {getSelectedCategoryName()}
            </span>
            <KeyboardArrowDownIcon
              className={`${styles.dropdown_arrow} ${showCategoryDropdown ? styles.rotated : ""}`}
            />
          </button>

          {showCategoryDropdown && (
            <div className={styles.category_dropdown_menu}>
              <button
                className={`${styles.dropdown_item} ${selectedCareerGoal === "all" ? styles.selected : ""}`}
                onClick={() => {
                  setSelectedCareerGoal("all");
                  setShowCategoryDropdown(false);
                }}
              >
                <span className={styles.item_icon}>🌐</span>
                All Categories
              </button>
              {careerGoals.map((goal) => (
                <button
                  key={goal.id}
                  className={`${styles.dropdown_item} ${selectedCareerGoal === goal.id ? styles.selected : ""}`}
                  onClick={() => {
                    setSelectedCareerGoal(goal.id);
                    setShowCategoryDropdown(false);
                  }}
                >
                  <span className={styles.item_icon}>📚</span>
                  {goal.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className={styles.posts_section}>
          {displayedPosts.length === 0 ? (
            <div className={styles.empty_state}>
              <span className={styles.empty_icon}>📝</span>
              <h3>
                {activeTab === "my-posts"
                  ? "No posts yet"
                  : "No posts in this category"}
              </h3>
              <p>
                {activeTab === "my-posts"
                  ? "Create your first post!"
                  : "Be the first to share something!"}
              </p>
              {activeTab === "my-posts" && (
                <Button
                  className={styles.empty_btn}
                  onClick={() => setShowCreateModal(true)}
                >
                  Create Post
                </Button>
              )}
            </div>
          ) : (
            displayedPosts.map((post, index) => (
              <div
                key={post.id}
                className={styles.post_card}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Post Header */}
                <div className={styles.post_header}>
                  <div className={styles.post_author}>
                    <Avatar
                      {...stringAvatar(post.userName)}
                      className={styles.post_avatar}
                    />
                    <div className={styles.author_info}>
                      <h4 className={styles.author_name}>{post.userName}</h4>
                      <div className={styles.post_meta}>
                        <span className={styles.post_category}>
                          {post.category}
                        </span>
                        <span className={styles.dot_separator}>•</span>
                        <span className={styles.post_date}>
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isOwnPost(post) && (
                    <button
                      className={styles.delete_post_btn}
                      onClick={() => setPostToDelete(post.id)}
                      title="Delete post"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  )}
                </div>

                {/* Post Title */}
                {post.title && (
                  <h3 className={styles.post_title}>{post.title}</h3>
                )}

                {/* Post Content */}
                <div className={styles.post_content_wrapper}>
                  <p className={styles.post_content}>{post.content}</p>
                </div>

                {/* Post Footer */}
                <div className={styles.post_footer}>
                  <div className={styles.post_stats}>
                    <button
                      className={`${styles.stat_btn} ${post.isLiked ? styles.liked : ""}`}
                      onClick={() => handleLike(post.id)}
                    >
                      {post.isLiked ? (
                        <FavoriteIcon fontSize="small" />
                      ) : (
                        <FavoriteBorderIcon fontSize="small" />
                      )}
                      <span>{post.likes || 0}</span>
                    </button>
                    <button
                      className={styles.stat_btn}
                      onClick={() => toggleComments(post.id)}
                    >
                      <CommentIcon fontSize="small" />
                      <span>{post.comments?.length || 0}</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {activeComments === post.id && (
                  <div className={styles.comments_section}>
                    <Divider className={styles.comment_divider} />

                    {post.comments && post.comments.length > 0 ? (
                      <div className={styles.comments_list}>
                        {post.comments.map((comment) => (
                          <div key={comment.id} className={styles.comment_item}>
                            <Avatar
                              {...stringAvatar(comment.userName)}
                              className={styles.comment_avatar}
                            />
                            <div className={styles.comment_content}>
                              <div className={styles.comment_header}>
                                <span className={styles.comment_author}>
                                  {comment.userName}
                                </span>
                                <span className={styles.comment_date}>
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className={styles.comment_text}>
                                {comment.content}
                              </p>
                            </div>
                            {isOwnComment(comment) && (
                              <button
                                className={styles.delete_comment_btn}
                                onClick={() =>
                                  handleDeleteComment(post.id, comment.id)
                                }
                                title="Delete comment"
                              >
                                <DeleteIcon fontSize="small" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={styles.no_comments}>
                        No comments yet. Be the first! 💬
                      </p>
                    )}

                    {/* Add Comment */}
                    <div className={styles.add_comment}>
                      <Avatar
                        {...stringAvatar(userData.name)}
                        className={styles.comment_avatar}
                      />
                      <div className={styles.comment_input_wrapper}>
                        <input
                          type="text"
                          value={commentText[post.id] || ""}
                          onChange={(e) =>
                            setCommentText((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          placeholder="Write a comment..."
                          className={styles.comment_input}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddComment(post.id)
                          }
                        />
                        <IconButton
                          className={styles.send_btn}
                          onClick={() => handleAddComment(post.id)}
                          disabled={submittingComment === post.id}
                          size="small"
                        >
                          <SendIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* نافذة تأكيد الحذف */}
        {postToDelete && (
          <div
            className={styles.confirm_overlay}
            onClick={() => setPostToDelete(null)}
          >
            <div
              className={styles.confirm_dialog}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.confirm_icon}>
                <DeleteIcon fontSize="large" />
              </div>
              <h3>Delete Post?</h3>
              <p>
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className={styles.confirm_buttons}>
                <button
                  className={styles.cancel_delete_btn}
                  onClick={() => setPostToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  className={styles.confirm_delete_btn}
                  onClick={handleDeletePost}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

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
                    {...stringAvatar(userData.name)}
                    className={styles.modal_avatar}
                  />
                  <div>
                    <h4>{userData.name}</h4>
                    <span>{userData.careerGoalName}</span>
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
                          ? careerGoals.find((g) => g.id === selectedCategory)
                              ?.name
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
                            key={goal.id}
                            type="button"
                            className={`${styles.cat_option} ${selectedCategory === goal.id ? styles.selected : ""}`}
                            onClick={() => {
                              setSelectedCategory(goal.id);
                              setShowModalCategoryDropdown(false);
                            }}
                          >
                            {goal.name}
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
      </div>
    </div>
  );
}
