import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import NavBtn from "../NavBtn/NavBtn";
import { getCurrentUser, logoutUser } from "../../api/authenticationService"; 
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    checkAuthAndFetchUser();
  }, [location]);

  const checkAuthAndFetchUser = async () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setIsLoggedIn(true);
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (error.message === "Unauthorized" || error.message.includes("401")) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    logoutUser();
    
    localStorage.removeItem('userCVUrl');
    localStorage.removeItem('userCVName');
    localStorage.removeItem('userProjects');
    localStorage.removeItem('userSkills');
    localStorage.removeItem('profileCompleted');
    localStorage.removeItem('profileData');
    localStorage.removeItem('userProgress');
    
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    
    navigate("/");
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const fullName = user.fullName || 
      (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username || "User");
    const names = fullName.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return fullName[0].toUpperCase();
  };

  const getUserName = () => {
    if (!user) return "User";
    return user.fullName || 
      (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null) ||
      user.username || 
      user.email?.split('@')[0] || 
      "User";
  };

  const getUserEmail = () => user?.email || "";
  const getUserAvatar = () => user?.avatar || null;

  if (loading) {
    return (
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.nav_container}>
          <Link to="/" className={styles.logo_link}>
            <div className={styles.logo_icon}>
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className={styles.logo_text}>
              <span className={styles.logo_smart}>Smart</span>
              <span className={styles.logo_dot}></span>
              <span className={styles.logo_mentor}>Mentor</span>
            </div>
          </Link>
          <div className={styles.desktop_buttons}>
            <div className={styles.loading_skeleton}></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.nav_container}>
        {/* Logo Section */}
        <Link to="/" className={styles.logo_link}>
          <div className={styles.logo_icon}>
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className={styles.logo_text}>
            <span className={styles.logo_smart}>Smart</span>
            <span className={styles.logo_dot}></span>
            <span className={styles.logo_mentor}>Mentor</span>
          </div>
        </Link>

        {/* Desktop Navigation Buttons */}
        <div className={styles.desktop_buttons}>
          {isLoggedIn ? (
            <>
              {/* User Dropdown */}
              <div className={styles.user_dropdown} ref={dropdownRef}>
                <button 
                  className={styles.user_avatar_btn}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label="User menu"
                >
                  <div className={styles.user_avatar_wrapper}>
                    <div className={styles.user_avatar}>
                      {getUserAvatar() ? (
                        <img src={getUserAvatar()} alt={getUserName()} />
                      ) : (
                        <span className={styles.user_initials}>{getUserInitials()}</span>
                      )}
                    </div>
                    <div className={styles.online_indicator}></div>
                  </div>
                  <div className={styles.user_info}>
                    <span className={styles.user_name_text}>{getUserName()}</span>
                  </div>
                  <i className={`fas fa-chevron-down ${styles.user_arrow}`}></i>
                </button>
                
                {isDropdownOpen && (
                  <>
                    <div className={styles.dropdown_overlay} onClick={() => setIsDropdownOpen(false)}></div>
                    <div className={styles.dropdown_menu}>
                      <div className={styles.dropdown_header}>
                        <div className={styles.dropdown_avatar_wrapper}>
                          <div className={styles.dropdown_avatar}>
                            {getUserAvatar() ? (
                              <img src={getUserAvatar()} alt={getUserName()} />
                            ) : (
                              <span className={styles.dropdown_initials}>{getUserInitials()}</span>
                            )}
                          </div>
                          <div className={styles.dropdown_online_indicator}></div>
                        </div>
                        <div className={styles.dropdown_user_info}>
                          <p className={styles.dropdown_user_name}>{getUserName()}</p>
                          <p className={styles.dropdown_user_email}>{getUserEmail()}</p>
                          <div className={styles.online_badge}>
                            <span className={styles.online_dot}></span>
                            Online
                          </div>
                        </div>
                      </div>
                      <div className={styles.dropdown_divider}></div>
                      <Link to="/profile" className={styles.dropdown_item} onClick={() => setIsDropdownOpen(false)}>
                        <span className={styles.dropdown_icon}>👤</span>
                        My Profile
                      </Link>
                      <Link to="/dashboard" className={styles.dropdown_item} onClick={() => setIsDropdownOpen(false)}>
                        <span className={styles.dropdown_icon}>📊</span>
                        Dashboard
                      </Link>
                      <Link to="/learningpath" className={styles.dropdown_item} onClick={() => setIsDropdownOpen(false)}>
                        <span className={styles.dropdown_icon}>🎯</span>
                        Learning Path
                      </Link>
                      <div className={styles.dropdown_divider}></div>
                      <button className={`${styles.dropdown_item} ${styles.logout_item}`} onClick={handleLogout}>
                        <span className={styles.dropdown_icon}>🚪</span>
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <NavBtn name={"Login"} variant="outline" />
              </Link>
              <Link to="/signup">
                <NavBtn name={"Get Started"} variant="primary" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`${styles.mobile_menu_btn} ${isMobileMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger_line}></span>
          <span className={styles.hamburger_line}></span>
          <span className={styles.hamburger_line}></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`${styles.mobile_overlay} ${isMobileMenuOpen ? styles.open : ""}`}>
          <div className={styles.mobile_menu}>
            <div className={styles.mobile_menu_header}>
              <div className={styles.mobile_logo_wrapper}>
                <div className={styles.mobile_logo}>
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <span className={styles.mobile_logo_text}>SmartMentor</span>
              </div>
              {isLoggedIn && (
                <div className={styles.mobile_user_info}>
                  <div className={styles.mobile_avatar_wrapper}>
                    <div className={styles.mobile_avatar}>
                      {getUserAvatar() ? (
                        <img src={getUserAvatar()} alt={getUserName()} />
                      ) : (
                        <span className={styles.mobile_initials}>{getUserInitials()}</span>
                      )}
                    </div>
                    <div className={styles.mobile_online_indicator}></div>
                  </div>
                  <div className={styles.mobile_user_details}>
                    <p className={styles.mobile_user_name}>{getUserName()}</p>
                    <p className={styles.mobile_user_email}>{getUserEmail()}</p>
                    <div className={styles.mobile_online_badge}>
                      <span className={styles.mobile_online_dot}></span>
                      Online
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.mobile_buttons}>
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className={styles.mobile_link} onClick={() => setIsMobileMenuOpen(false)}>
                    <NavBtn name={"Dashboard"} variant="text" fullWidth />
                  </Link>
                  <Link to="/profile" className={styles.mobile_link} onClick={() => setIsMobileMenuOpen(false)}>
                    <NavBtn name={"Profile"} variant="text" fullWidth />
                  </Link>
                  <Link to="/learningpath" className={styles.mobile_link} onClick={() => setIsMobileMenuOpen(false)}>
                    <NavBtn name={"Learning Path"} variant="text" fullWidth />
                  </Link>
                  <div className={styles.mobile_divider}></div>
                  <button onClick={handleLogout} className={styles.mobile_logout_btn}>
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={styles.mobile_link} onClick={() => setIsMobileMenuOpen(false)}>
                    <NavBtn name={"Login"} variant="outline" fullWidth />
                  </Link>
                  <Link to="/signup" className={styles.mobile_link} onClick={() => setIsMobileMenuOpen(false)}>
                    <NavBtn name={"Get Started"} variant="primary" fullWidth />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}