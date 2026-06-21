import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./AdminLayout.module.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Auto-close mobile menu when resizing to desktop
      if (width >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    const authToken = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    console.log('Clearing admin tokens:', { authToken: !!authToken, userData: !!userData });

    localStorage.clear();
    
    sessionStorage.clear();
    
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('verificationToken');
    localStorage.removeItem('resetEmail');
    localStorage.removeItem('resetToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    localStorage.removeItem('refreshToken');
    
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('token');
    
    setShowLogoutConfirm(false);
    setIsMobileMenuOpen(false);
    
    if (window.axios) {
      delete window.axios.defaults.headers.common["Authorization"];
    }
    
    delete window.authToken;
    delete window.adminToken;
    
    navigate("/", { replace: true });
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const toggleSidebar = () => {
    if (isMobile || isTablet) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.admin_layout}>
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      
      {/* Menu Button for Mobile/Tablet */}
      {(isMobile || isTablet) && (
        <button 
          className={styles.menu_button} 
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </button>
      )}
      
      {/* Mobile/Tablet Overlay */}
      {(isMobile || isTablet) && isMobileMenuOpen && (
        <div className={styles.mobile_overlay} onClick={closeMobileMenu} />
      )}
      
      {/* Sidebar */}
      <aside className={`${styles.sidebar} 
        ${isCollapsed && !isMobile && !isTablet ? styles.collapsed : ""} 
        ${(isMobile || isTablet) && isMobileMenuOpen ? styles.mobile_open : ""}
        ${(isMobile || isTablet) && !isMobileMenuOpen ? styles.mobile_closed : ""}`}
      >
        {/* Close button for mobile/tablet */}
        {(isMobile || isTablet) && isMobileMenuOpen && (
          <button className={styles.close_button} onClick={closeMobileMenu}>
            <CloseIcon />
          </button>
        )}
        
        {/* Desktop Toggle Button - Only show on desktop */}
        {!isMobile && !isTablet && (
          <button className={styles.sidebar_toggle} onClick={toggleSidebar}>
            {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </button>
        )}
        
        <div className={styles.logo}>
          <h2>{isCollapsed ? "SM" : "SmartMentor"}</h2>
          {!isCollapsed && <span>Admin Portal</span>}
        </div>
        
        <nav className={styles.nav}>
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => isActive ? styles.active : styles.nav_link}
            onClick={() => (isMobile || isTablet) && closeMobileMenu()}
          >
            <PeopleIcon />
            {!isCollapsed && <span>User Management</span>}
          </NavLink>
          
          <NavLink 
            to="/admin/analytics" 
            className={({ isActive }) => isActive ? styles.active : styles.nav_link}
            onClick={() => (isMobile || isTablet) && closeMobileMenu()}
          >
            <BarChartIcon />
            {!isCollapsed && <span>Analytics Overview</span>}
          </NavLink>

          <NavLink 
            to="/admin/usergrowth" 
            className={({ isActive }) => isActive ? styles.active : styles.nav_link}
            onClick={() => (isMobile || isTablet) && closeMobileMenu()}
          >
            <TrendingUpIcon />
            {!isCollapsed && <span>User Growth</span>}
          </NavLink>
        </nav>
        
        <button onClick={confirmLogout} className={styles.logout_btn}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </aside>
      
      <main className={`${styles.main_content} 
        ${(isMobile || isTablet) && isMobileMenuOpen ? styles.content_blurred : ""}`}
      >
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <>
          <div className={styles.modal_overlay} onClick={cancelLogout}>
            <div className={styles.confirm_modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.confirm_modal_header}>
                <div className={styles.confirm_icon_wrapper}>
                  <LogoutIcon className={styles.confirm_icon} />
                </div>
                <h3 className={styles.confirm_title}>Logout</h3>
                <button className={styles.modal_close} onClick={cancelLogout}>
                  <CloseIcon />
                </button>
              </div>
              <div className={styles.confirm_modal_body}>
                <p>Are you sure you want to logout?</p>
                <p className={styles.confirm_warning}>
                  You will need to log in again to access your account.
                </p>
              </div>
              <div className={styles.confirm_modal_footer}>
                <button className={styles.confirm_cancel_btn} onClick={cancelLogout}>
                  Cancel
                </button>
                <button className={styles.confirm_delete_btn} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLayout;