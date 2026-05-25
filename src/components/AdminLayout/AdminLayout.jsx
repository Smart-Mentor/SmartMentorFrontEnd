import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
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

  const handleLogout = () => {
    // Get tokens before clearing for logging (optional)
    const authToken = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    console.log('Clearing admin tokens:', { authToken: !!authToken, userData: !!userData });

    // Clear ALL localStorage items (like in Navbar)
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Specifically remove auth-related items (redundant but thorough)
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
    
    // Clear sessionStorage items
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('token');
    
    // Update state
    setShowLogoutConfirm(false);
    
    // Remove axios authorization header if axios is used globally
    if (window.axios) {
      delete window.axios.defaults.headers.common["Authorization"];
    }
    
    // Delete any global token variables
    delete window.authToken;
    delete window.adminToken;
    
    // Navigate to home page with replace (prevents back button issues)
    navigate("/", { replace: true });
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.admin_layout}>
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
        {/* Toggle Button */}
        <button className={styles.sidebar_toggle} onClick={toggleSidebar}>
          {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </button>
        
        <div className={styles.logo}>
          <h2>{isCollapsed ? "SM" : "SmartMentor"}</h2>
          {!isCollapsed && <span>Admin Portal</span>}
        </div>
        
        <nav className={styles.nav}>
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => isActive ? styles.active : styles.nav_link}
          >
            <PeopleIcon />
            {!isCollapsed && <span>User Management</span>}
          </NavLink>
          
          <NavLink 
            to="/admin/analytics" 
            className={({ isActive }) => isActive ? styles.active : styles.nav_link}
          >
            <BarChartIcon />
            {!isCollapsed && <span>Analytics Overview</span>}
          </NavLink>

          <NavLink 
            to="/admin/usergrowth" 
            className={({ isActive }) => isActive ? styles.active : styles.nav_link}
          >
            <TrendingUpIcon />
            {!isCollapsed && <span>User Growth</span>}
          </NavLink>
        </nav>
        
        <button onClick={confirmLogout} className={styles.logout_btn}>
          <LogoutIcon />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </aside>
      
      <main className={styles.main_content}>
        <Outlet />
      </main>

      {/* Logout Confirmation Modal - Similar to Navbar style */}
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