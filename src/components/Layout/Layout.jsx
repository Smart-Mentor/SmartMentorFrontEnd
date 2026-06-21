import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import { fetchUserInfo } from "../../api/notificationService";
import NotificationBell from "../NotificationBell/NotificationBell";
import { useNotifications } from "../../hooks/useNotifications";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  
  // Get notifications
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useNotifications();

  const isAiModelPage = location.pathname.includes('/aimentor/');

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [mobileOpen]);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleOverlayClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const handleLogoClick = useCallback(() => {
    navigate('/');
    handleDrawerClose();
  }, [navigate, handleDrawerClose]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    
    sessionStorage.clear();
    
    navigate('/login');
    handleDrawerClose();
  }, [navigate, handleDrawerClose]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Classified menu items into 5 sections
  const menuSections = [
    {
      title: "Main Navigation",
      icon: "fa-solid fa-compass",
      items: [
        { name: "Home", icon: "fa-solid fa-house", path: "/home" },
        { name: "Dashboard", icon: "fa-solid fa-table-columns", path: "/dashboard" },
      ]
    },
    {
      title: "Learning & Growth",
      icon: "fa-solid fa-graduation-cap",
      items: [
        { name: "AI Mentor", icon: "fa-solid fa-robot", path: "/aimentor" },
        { name: "Learning Path", icon: "fa-solid fa-road-circle-check", path: "/learningpath" },
        { name: "Skills", icon: "fa-solid fa-code", path: "/skills" },
      ]
    },
    {
      title: "Progress & Analytics",
      icon: "fa-solid fa-chart-simple",
      items: [
        { name: "Gap Analysis", icon: "fa-regular fa-chart-bar", path: "/gapanalysis" },
        { name: "Job Trends", icon: "fa-solid fa-chart-line", path: "/jobtrends" },
      ]
    },
    {
      title: "Resources & Engagement",
      icon: "fa-solid fa-users",
      items: [
        { name: "Projects", icon: "fa-regular fa-folder-open", path: "/projects" },
        { name: "Community", icon: "fa-solid fa-users", path: "/community" },
        { name: "Study Planner", icon: "fa-regular fa-calendar-days", path: "/studyplanner" },
      ]
    },
    {
      title: "Account",
      icon: "fa-solid fa-user",
      items: [
        { name: "Profile", icon: "fa-solid fa-user-circle", path: "/profile" },
      ]
    }
  ];

  const drawer = (
    <div className={styles.drawer_container}>
      <div className={styles.logo_container} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <i className="fas fa-graduation-cap"></i>
        <h1 className={styles.logo_text}>SmartMentor</h1>
      </div>

      <nav className={styles.nav_menu}>
        {menuSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className={styles.nav_section}>
            <div className={styles.section_header}>
              <i className={`${section.icon} ${styles.section_icon}`}></i>
              <span className={styles.section_title}>{section.title}</span>
            </div>
            <div className={styles.section_items}>
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => 
                    `${styles.nav_item} ${isActive ? styles.nav_item_active : ""}`
                  }
                  onClick={handleDrawerClose}
                >
                  <i className={`${item.icon} ${styles.nav_icon}`}></i>
                  <span className={styles.nav_label}>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className={styles.logout_section}>
        <button 
          onClick={handleLogout} 
          className={`${styles.nav_item} ${styles.logout_button}`}
        >
          <i className={`fa-solid fa-right-from-bracket ${styles.nav_icon}`}></i>
          <span className={styles.nav_label}>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.layout}>
      {!isAiModelPage && (
        <button 
          className={styles.menu_button} 
          onClick={handleDrawerToggle}
          aria-label="Toggle menu"
        >
          <span className={styles.menu_icon}>☰</span>
        </button>
      )}

      {!isTablet && (
        <aside className={styles.sidebar}>
          {drawer}
        </aside>
      )}

      <div className={`${styles.mobile_sidebar} ${mobileOpen ? styles.mobile_sidebar_open : ""}`}>
        <div className={styles.mobile_sidebar_header}>
          <button 
            className={styles.close_button} 
            onClick={handleDrawerClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        {drawer}
      </div>
      
      {mobileOpen && (
        <div 
          className={styles.overlay} 
          onClick={handleOverlayClick}
          onTouchEnd={handleOverlayClick}
        />
      )}

      <main className={styles.main_content}>
        {/* Floating Notification Bell - Bottom Right */}
        <div className={styles.floating_notification}>
          <NotificationBell
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onClearAll={clearNotifications}
          />
        </div>
        
        <Outlet />
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};