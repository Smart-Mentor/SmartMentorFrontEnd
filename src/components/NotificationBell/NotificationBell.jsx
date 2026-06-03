// components/NotificationBell.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import styles from './NotificationBell.module.css';

const NotificationBell = ({ notifications, unreadCount, onMarkAsRead, onMarkAllAsRead, onClearAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification) => {
    onMarkAsRead(notification.id);
    setIsOpen(false);
    // Navigate to the post
    navigate('/community', { state: { openPostId: notification.postId } });
  };

  // Helper function to parse dates
  const parseDate = (dateString) => {
    if (!dateString) return new Date();
    
    try {
      let fixedDateString = dateString;
      if (dateString.includes('.') && dateString.match(/\.\d{4,}/)) {
        fixedDateString = dateString.replace(/\.(\d{3})\d+/, '.$1');
      }
      const date = new Date(fixedDateString);
      return isNaN(date.getTime()) ? new Date() : date;
    } catch (e) {
      return new Date();
    }
  };

  // Format time for like notifications (uses current time)
//   const formatLikeTime = (dateString) => {
//     // Likes use current time (createdAt is set to new Date().toISOString())
//    const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins} min ago`;
//     if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
//     if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
//     return date.toLocaleDateString();
//   };

  // Format time for comment notifications (uses actual comment timestamp from API)
  const formatCommentTime = (dateString) => {
    // Comments use actual comment.createdAt from API
    const date = parseDate(dateString);
    
    if (isNaN(date.getTime())) return 'Invalid date';
    
    const egyptDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));
    
    const now = new Date();
    const diffMs = now - egyptDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return egyptDate.toLocaleDateString();
  };

  return (
    <div className={styles.notification_container} ref={dropdownRef}>
      <button
        className={styles.notification_bell}
        onClick={() => setIsOpen(!isOpen)}
      >
        {unreadCount > 0 ? (
          <NotificationsActiveIcon className={styles.bell_icon_active} />
        ) : (
          <NotificationsIcon className={styles.bell_icon} />
        )}
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdown_header}>
            <h3>Notifications</h3>
            <div className={styles.header_actions}>
              {notifications.length > 0 && (
                <>
                  <button
                    className={styles.mark_all_btn}
                    onClick={onMarkAllAsRead}
                    title="Mark all as read"
                  >
                    <DoneAllIcon fontSize="small" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={styles.dropdown_content}>
            {notifications.length === 0 ? (
              <div className={styles.empty_state}>
                <NotificationsIcon className={styles.empty_icon} />
                <p>No notifications yet</p>
                <span>When someone comments on your posts, you'll see them here</span>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`${styles.notification_item} ${!notification.read ? styles.unread : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={styles.notification_icon}>
                    {notification.type === 'comment' ? (
                      <CommentIcon className={styles.comment_icon} />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className={styles.notification_content}>
                    <p className={styles.notification_message}>
                      {notification.type === 'comment' ? (
                        <>
                          <strong>{notification.commentAuthor}</strong> commented on your post
                          <br />
                          <span className={styles.post_title}>"{notification.postTitle}"</span>
                          <br />
                          <span className={styles.comment_preview}>"{notification.commentContent?.substring(0, 80)}"</span>
                        </>
                      ) : (
                        <></>
                      )}
                    </p>
                    <span className={styles.notification_time}>
                      {notification.type === 'comment' 
                        ? formatCommentTime(notification.createdAt)
                        : <></>
                      }
                    </span>
                  </div>
                  {!notification.read && <div className={styles.unread_dot} />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;