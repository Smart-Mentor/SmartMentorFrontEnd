import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import NavBtn from "../NavBtn/NavBtn";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.nav_container}>
        {/* Logo Section */}
        <Link to="/" className={styles.logo_link}>
          <div className={styles.logo_wrapper}>
            <div className={styles.logo_glow}></div>
            <img src={Logo} alt="SmartMentor" className={styles.logo_image} />
          </div>
          <div className={styles.logo_text_wrapper}>
            <span className={styles.logo_text}>SmartMentor</span>
            <span className={styles.logo_badge}>AI</span>
          </div>
        </Link>

        {/* Desktop Navigation Buttons */}
        <div className={styles.desktop_buttons}>
          <Link to="/login">
            <NavBtn 
              name={"Login"} 
              variant="outline" 
              isScrolled={isScrolled}
            />
          </Link>
          <Link to="/signup">
            <NavBtn 
              name={"Get Started"} 
              variant="primary"
              isScrolled={isScrolled}
            />
          </Link>
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
                <img src={Logo} alt="SmartMentor" className={styles.mobile_logo} />
                <span className={styles.mobile_logo_text}>SmartMentor</span>
              </div>
            </div>
            <div className={styles.mobile_buttons}>
              <Link to="/login" className={styles.mobile_link}>
                <NavBtn name={"Login"} variant="outline" fullWidth />
              </Link>
              <Link to="/signup" className={styles.mobile_link}>
                <NavBtn name={"Get Started"} variant="primary" fullWidth />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className={styles.navbar_line}></div>
    </nav>
  );
}