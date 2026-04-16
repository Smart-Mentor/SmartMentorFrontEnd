import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { Outlet, NavLink } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

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

  const menuItems = [
    { name: "Dashboard", icon: "fa-solid fa-table-columns fa-xl", path: "/dashboard" },
    { name: "AI Mentor", icon: "fa-solid fa-robot fa-xl", path: "/aimentor" },
    { name: "Learning Path", icon: "fa-solid fa-road-circle-check fa-xl", path: "/learningpath" },
    { name: "Skills", icon: "fa-solid fa-code fa-xl", path: "/skills" },
    { name: "Gap Analysis", icon: "fa-regular fa-chart-bar fa-xl", path: "/gapanalysis" },
    { name: "Job Trends", icon: "fa-solid fa-chart-line fa-xl", path: "/jobtrends" },
    { name: "Projects", icon: "fa-regular fa-folder-open fa-xl", path: "/projects" },
    { name: "Community", icon: "fa-solid fa-users fa-xl", path: "/community" },
    { name: "Study Planner", icon:"fa-regular fa-calendar-days fa-xl", path: "/studyplanner" },
    { name: "Profile", icon: "fa-solid fa-user-circle fa-2xl", path: "/profile" },
  ];

  const drawer = (
    <div className={styles.drawer_container}>
      <div className={styles.logo_container}>
        <i className="fas fa-graduation-cap" style={{color: '#258eff'}}></i>
        <h1 className={styles.logo_text}>SmartMentor</h1>
      </div>

      <nav className={styles.nav_menu}>
        {menuItems.map((item) => (
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
      </nav>
    </div>
  );

  return (
    <div className={styles.layout}>
      <button 
        className={styles.menu_button} 
        onClick={handleDrawerToggle}
        aria-label="Toggle menu"
      >
        <span className={styles.menu_icon}>☰</span>
      </button>

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
        <Outlet />
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};