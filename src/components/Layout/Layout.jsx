import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import { logoutUser } from "../../api/authenticationService";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);

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

  // ✅ Menu items مقسمة لأقسام
  const menuItems = {
    main: [
      { name: "Home", icon: "fa-solid fa-house", path: "/home" },
      { name: "Dashboard", icon: "fa-solid fa-table-columns", path: "/dashboard" },
      { name: "AI Mentor", icon: "fa-solid fa-robot", path: "/aimentor" },
    ],
    learning: [
      { name: "Learning Path", icon: "fa-solid fa-road-circle-check", path: "/learningpath" },
      { name: "Skills", icon: "fa-solid fa-code", path: "/skills" },
      { name: "Gap Analysis", icon: "fa-regular fa-chart-bar", path: "/gapanalysis" },
      { name: "Job Trends", icon: "fa-solid fa-chart-line", path: "/jobtrends" },
    ],
    tools: [
      { name: "Projects", icon: "fa-regular fa-folder-open", path: "/projects" },
      { name: "Study Planner", icon: "fa-regular fa-calendar-days", path: "/studyplanner" },
    ],
    social: [
      { name: "Community", icon: "fa-solid fa-users", path: "/community" },
    ],
  };

  // ✅ User data من localStorage
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
  });

  useEffect(() => {
    const loadUserData = () => {
      // ✅ قراءة من authToken response
      const savedUser = localStorage.getItem('userData');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUserData({
            firstName: parsed.firstName || parsed.first_name || "",
            lastName: parsed.lastName || parsed.last_name || "",
            email: parsed.email || "",
            userName: parsed.userName || parsed.username || "",
          });
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    };

    loadUserData();

    // ✅ استماع لتغييرات localStorage
    window.addEventListener('storage', loadUserData);
    return () => window.removeEventListener('storage', loadUserData);
  }, []);

  const getUserInitials = () => {
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    if (userData.userName) {
      return userData.userName.slice(0, 2).toUpperCase();
    }
    if (userData.email) {
      return userData.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  const getUserName = () => {
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName} ${userData.lastName}`;
    }
    if (userData.userName) {
      return userData.userName;
    }
    if (userData.firstName) {
      return userData.firstName;
    }
    return "User";
  };

  const getUserEmail = () => {
    if (userData.email) {
      return userData.email;
    }
    return "student@smartmentor.com";
  };

  // ✅ Logout handler باستخدام الـ API
  const handleLogout = useCallback(() => {
    // ✅ استخدام logoutUser من authenticationService
    logoutUser();
    
    // ✅ مسح البيانات الإضافية
    localStorage.removeItem('userCVUrl');
    localStorage.removeItem('userCVName');
    localStorage.removeItem('userProjects');
    localStorage.removeItem('userSkills');
    localStorage.removeItem('profileCompleted');
    localStorage.removeItem('profileData');
    localStorage.removeItem('userProgress');
    
    // ✅ Navigate to login
    navigate('/login');
    handleDrawerClose();
  }, [navigate, handleDrawerClose]);

  const drawer = (
    <div className={styles.drawer_container}>
      {/* Logo */}
      <div className={styles.logo_container} onClick={handleLogoClick}>
        <div className={styles.logo_icon}>
          <i className="fas fa-graduation-cap"></i>
        </div>
        <h1 className={styles.logo_text}>
          Smart<span>Mentor</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className={styles.nav_menu}>
        {/* Main Section */}
        <div className={styles.nav_section}>
          <div className={styles.nav_section_title}>Main</div>
          {menuItems.main.map((item) => (
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

        {/* Learning Section */}
        <div className={styles.nav_section}>
          <div className={styles.nav_section_title}>Learning</div>
          {menuItems.learning.map((item) => (
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

        {/* Tools Section */}
        <div className={styles.nav_section}>
          <div className={styles.nav_section_title}>Tools</div>
          {menuItems.tools.map((item) => (
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

        {/* Social Section */}
        <div className={styles.nav_section}>
          <div className={styles.nav_section_title}>Social</div>
          {menuItems.social.map((item) => (
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

        {/* Profile Section */}
        <div className={styles.nav_section}>
          <div className={styles.nav_section_title}>Account</div>
          <NavLink
            to="/profile"
            className={({ isActive }) => 
              `${styles.nav_item} ${isActive ? styles.nav_item_active : ""}`
            }
            onClick={handleDrawerClose}
          >
            <i className="fa-solid fa-user-circle fa-lg"></i>
            <span className={styles.nav_label}>Profile</span>
          </NavLink>
        </div>
      </nav>

      {/* Bottom Section - User & Logout */}
      <div className={styles.bottom_section}>
        {/* User Card */}
        <div 
          className={styles.user_card}
          onClick={() => {
            navigate('/profile');
            handleDrawerClose();
          }}
        >
          <div className={styles.user_avatar}>
            {getUserInitials()}
          </div>
          <div className={styles.user_info}>
            <div className={styles.user_name}>{getUserName()}</div>
            <div className={styles.user_email}>{getUserEmail()}</div>
          </div>
          <i className="fas fa-chevron-right"></i>
        </div>

        {/* Logout Button */}
        <button 
          className={styles.logout_btn}
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
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
        <Outlet />
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};