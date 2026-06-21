import { useState, useEffect, useCallback } from 'react';
import { fetchAllPosts, fetchPostDetails, getCurrentUserId } from '../api/notificationService';

const STORAGE_KEY = 'notifications';

const loadNotifications = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
  return [];
};

const saveNotifications = (notifications) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastCheckTime, setLastCheckTime] = useState(() => {
    return localStorage.getItem('lastNotificationCheck') || new Date().toISOString();
  });

  const currentUserId = getCurrentUserId();

  // Save last check time
  const updateLastCheckTime = useCallback(() => {
    const now = new Date().toISOString();
    setLastCheckTime(now);
    localStorage.setItem('lastNotificationCheck', now);
  }, []);

  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev => {
      const updated = prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      saveNotifications(updated);
      setUnreadCount(updated.filter(n => !n.read).length);
      return updated;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(notif => ({ ...notif, read: true }));
      saveNotifications(updated);
      setUnreadCount(0);
      return updated;
    });
  }, []);

  const checkForNewNotifications = useCallback(async () => {
    if (!currentUserId) return;

    try {
      const allPosts = await fetchAllPosts();
      
      const userPosts = allPosts.filter(post => 
        post.author?.userId === currentUserId
      );

      const newNotifications = [];
      const existingNotifications = loadNotifications();
      const existingIds = new Set(existingNotifications.map(n => n.id));

      // Check each user post
      for (const post of userPosts) {
        const postDetails = await fetchPostDetails(post.postId);
        if (!postDetails) continue;

        // Check for new comments
        const existingCommentNotifs = existingNotifications.filter(
          n => n.type === 'comment' && n.postId === post.postId
        );
        const existingCommentIds = new Set(existingCommentNotifs.map(n => n.commentId));

        if (postDetails.comments && postDetails.comments.length > 0) {
          for (const comment of postDetails.comments) {
            if (comment.author?.userId === currentUserId) continue;
            
            const commentNotifId = `comment-${comment.commentId}`;
            if (!existingCommentIds.has(commentNotifId)) {
              newNotifications.push({
                id: commentNotifId,
                type: 'comment',
                postId: post.postId,
                postTitle: post.title,
                commentId: comment.commentId,
                commentContent: comment.content,
                commentAuthor: `${comment.author?.firstName || ''} ${comment.author?.lastName || ''}`.trim(),
                createdAt: comment.createdAt,
                read: false
              });
            }
          }
        }
      }

      const allNotifications = [...newNotifications, ...existingNotifications];
      allNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      const uniqueNotifications = Array.from(
        new Map(allNotifications.map(n => [n.id, n])).values()
      );

      setNotifications(uniqueNotifications);
      saveNotifications(uniqueNotifications);
      setUnreadCount(uniqueNotifications.filter(n => !n.read).length);
      updateLastCheckTime();
    } catch (err) {
      console.error('Error checking notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUserId, updateLastCheckTime]);

  useEffect(() => {
    const stored = loadNotifications();
    if (stored.length > 0) {
      setNotifications(stored);
      setUnreadCount(stored.filter(n => !n.read).length);
    }
    
    // Check for new notifications
    checkForNewNotifications();
    
    // Set up periodic check every 5 seconds
    const interval = setInterval(() => {
      checkForNewNotifications();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [checkForNewNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    refreshNotifications: checkForNewNotifications
  };
};