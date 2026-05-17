// 🔹 Imports
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/sign in logo.png";
import { loginUser, forgotPassword, resetPassword } from "../../api/authenticationService";

// 🔹 Login Component
export default function Login() {

  // 🔹 Main Form States
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  // 🔹 Forgot / Reset Password Popup States
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupError, setPopupError] = useState("");
  const [popupSuccess, setPopupSuccess] = useState("");
  const [popupLoading, setPopupLoading] = useState(false);

  // --- Animation on mount ---
  useEffect(() => {
    setAnimate(true);
  }, []);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  // 🔹 Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Check for admin credentials first (case-insensitive)
    const isAdminEmail = formData.email.toLowerCase() === "admin@gmail.com";
    const isAdminPassword = formData.password === "Admin@123";
    
    if (isAdminEmail && isAdminPassword) {
      // Admin login - bypass API call
      try {
        setError("");
        setLoading(true);
        
        // Store admin token or admin flag
        const loginData = {
        ...formData,
        email: formData.email.toLowerCase()
      };

      const response = await loginUser(loginData);

      if (response.isSuccessful && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userRole", "admin");
        localStorage.removeItem("verificationToken");}
        
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
        
        // Navigate to admin dashboard
        navigate("/admindashboard", { replace: true });
        return;
      } catch (err) {
        setError("Admin login failed");
      } finally {
        setLoading(false);
      }
      return;
    }

    // 🔹 Regular user login flow (also make email case-insensitive)
    try {
      setError("");
      setLoading(true);

      // Convert email to lowercase before sending to API
      const loginData = {
        ...formData,
        email: formData.email.toLowerCase()
      };

      const response = await loginUser(loginData);

      if (response.isSuccessful && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userRole", "user");
        localStorage.removeItem("verificationToken");

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        navigate("/completeprofile", { replace: true });
        return;
      }

      if (!response.isSuccessful && response.message?.includes("Email not confirmed")) {
        setError("📧 Email not verified! Please verify your email first.");
        return;
      }

      setError(response.message || "Invalid email or password");

    } catch (err) {
      const errorMsg = err.message || "Login failed";
      if (errorMsg.includes("Email not confirmed")) {
        setError("📧 Email not verified! Please check your email.");
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Step 1: Send Reset Code
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent password reset for admin account (case-insensitive)
    if (forgotEmail.toLowerCase() === "admin@gmail.com") {
      setPopupError("Admin password reset is not allowed through this form");
      return;
    }
    
    if (!forgotEmail) {
      setPopupError("Please enter your email");
      return;
    }

    try {
      setPopupLoading(true);
      setPopupError("");
      setPopupSuccess("");

      // Convert email to lowercase for API call
      const res = await forgotPassword(forgotEmail.toLowerCase());

      if (res.message?.toLowerCase().includes("sent") || res.isSuccessful) {
        setPopupSuccess("📩 Reset code sent to your email!");
        localStorage.setItem("resetEmail", forgotEmail.toLowerCase());
        localStorage.setItem("resetToken", res.resetToken || "");

        setTimeout(() => {
          setShowForgotPopup(false);
          setShowResetPopup(true);
          setPopupSuccess("");
          setPopupError("");
        }, 1200);
      } else {
        setPopupError(res.message || "Failed to send code");
      }
    } catch (err) {
      setPopupError("Something went wrong. Please try again.");
    } finally {
      setPopupLoading(false);
    }
  };

  // 🔹 Step 2: Reset Password
  const handleResetSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");
    
    // Prevent password reset for admin account (case-insensitive)
    if (email && email.toLowerCase() === "admin@gmail.com") {
      setPopupError("Admin password reset is not allowed through this form");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPopupError("Passwords do not match");
      return;
    }

    const resetToken = localStorage.getItem("resetToken");

    try {
      setPopupLoading(true);
      setPopupError("");
      setPopupSuccess("");

      const res = await resetPassword({
        email,
        code: resetCode,
        resetToken,
        newPassword,
        confirmPassword,
      });

      if (res.message?.toLowerCase().includes("success") || res.isSuccessful) {
        setPopupSuccess("✅ Password reset successfully!");
        setTimeout(() => {
          closeAllPopups();
          setForgotEmail("");
          setResetCode("");
          setNewPassword("");
          setConfirmPassword("");
        }, 2000);
      } else {
        setPopupError(res.message || "Failed to reset password");
      }
    } catch (err) {
      setPopupError("Something went wrong. Please try again.");
    } finally {
      setPopupLoading(false);
    }
  };

  // 🔹 Close All Popups
  const closeAllPopups = () => {
    setShowForgotPopup(false);
    setShowResetPopup(false);
    setPopupError("");
    setPopupSuccess("");
    setPopupLoading(false);
  };

  // --- UI Render ---
  return (
    <div className={styles.login_page}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>
      <div className={styles.floating_shapes}>
        <div className={`${styles.shape} ${styles.shape_1}`}></div>
        <div className={`${styles.shape} ${styles.shape_2}`}></div>
        <div className={`${styles.shape} ${styles.shape_3}`}></div>
        <div className={`${styles.shape} ${styles.shape_4}`}></div>
        <div className={`${styles.shape} ${styles.shape_5}`}></div>
      </div>

      {/* Main Container - Split Layout */}
      <div className={`${styles.login_container} ${animate ? styles.animate_in : ''}`}>
        
        {/* Left Side - Welcome Section */}
        <div className={`${styles.welcome_section} ${animate ? styles.fade_in_left : ''}`}>
          <div className={styles.welcome_content}>
            
            {/* Animated Logo */}
            <div className={`${styles.logo_section} ${animate ? styles.scale_in : ''}`}>
              <div className={styles.logo_hero}>
                <div className={styles.logo_orb_1}></div>
                <div className={styles.logo_orb_2}></div>
                <div className={styles.logo_orb_3}></div>
                <div className={styles.logo_center}>
                  <img src={logo} alt="SmartMentor" className={styles.logo} />
                </div>
              </div>
              <h1 className={styles.brand_name}>SmartMentor</h1>
            </div>

            {/* Welcome Text */}
            <div className={`${styles.welcome_text} ${animate ? styles.fade_in_up : ''}`} style={{ animationDelay: '0.2s' }}>
              <h2 className={styles.welcome_title}>
                Welcome Back to <span className={styles.gradient_text}>Your Journey</span>
              </h2>
              <p className={styles.welcome_description}>
                Continue building your tech career with AI-powered guidance and personalized learning paths.
              </p>
            </div>

            {/* Features */}
            <div className={`${styles.features_list} ${animate ? styles.fade_in_up : ''}`} style={{ animationDelay: '0.3s' }}>
              <div className={`${styles.feature_item} ${animate ? styles.slide_in_right : ''}`} style={{ animationDelay: '0.4s' }}>
                <span className={styles.feature_icon}>🎯</span>
                <span>Personalized learning paths</span>
              </div>
              <div className={`${styles.feature_item} ${animate ? styles.slide_in_right : ''}`} style={{ animationDelay: '0.5s' }}>
                <span className={styles.feature_icon}>📊</span>
                <span>Real-time job market insights</span>
              </div>
              <div className={`${styles.feature_item} ${animate ? styles.slide_in_right : ''}`} style={{ animationDelay: '0.6s' }}>
                <span className={styles.feature_icon}>🚀</span>
                <span>Skill gap analysis</span>
              </div>
              <div className={`${styles.feature_item} ${animate ? styles.slide_in_right : ''}`} style={{ animationDelay: '0.7s' }}>
                <span className={styles.feature_icon}>🤖</span>
                <span>AI-powered recommendations</span>
              </div>
            </div>

            {/* Stats */}
            <div className={`${styles.stats_section} ${animate ? styles.fade_in_up : ''}`} style={{ animationDelay: '0.8s' }}>
              <div className={`${styles.stat_item} ${animate ? styles.bounce_in : ''}`} style={{ animationDelay: '0.9s' }}>
                <span className={styles.stat_number}>10K+</span>
                <span className={styles.stat_label}>Learners</span>
              </div>
              <div className={styles.stat_divider}></div>
              <div className={`${styles.stat_item} ${animate ? styles.bounce_in : ''}`} style={{ animationDelay: '1s' }}>
                <span className={styles.stat_number}>500+</span>
                <span className={styles.stat_label}>Careers</span>
              </div>
              <div className={styles.stat_divider}></div>
              <div className={`${styles.stat_item} ${animate ? styles.bounce_in : ''}`} style={{ animationDelay: '1.1s' }}>
                <span className={styles.stat_number}>95%</span>
                <span className={styles.stat_label}>Success Rate</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={styles.decorative_1}></div>
          <div className={styles.decorative_2}></div>
          <div className={styles.decorative_3}></div>
          <div className={styles.grid_pattern}></div>
          <div className={styles.floating_dots}></div>
        </div>

        {/* Right Side - Login Form */}
        <div className={`${styles.form_section} ${animate ? styles.fade_in_right : ''}`}>
          <div className={styles.form_card}>
            
            {/* Form Header */}
            <div className={`${styles.form_header} ${animate ? styles.fade_in_up : ''}`}>
              <div className={`${styles.form_badge} ${animate ? styles.bounce_in : ''}`}>
                <span className={styles.badge_icon}>👋</span>
                <span>Welcome Back</span>
              </div>
              <h2 className={styles.form_title}>Sign In</h2>
              <p className={styles.form_subtitle}>Enter your credentials to access your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className={`${styles.login_form} ${animate ? styles.fade_in_up : ''}`} style={{ animationDelay: '0.2s' }}>
              
              {/* Email */}
              <div className={`${styles.input_group} ${animate ? styles.slide_in_up : ''}`} style={{ animationDelay: '0.3s' }}>
                <label>Email Address</label>
                <div className={styles.input_wrapper}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    disabled={loading}
                  />
                  <span className={styles.input_icon}>📧</span>
                  <span className={styles.input_focus_ring}></span>
                </div>
              </div>

              {/* Password */}
              <div className={`${styles.input_group} ${animate ? styles.slide_in_up : ''}`} style={{ animationDelay: '0.4s' }}>
                <label>Password</label>
                <div className={styles.input_wrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.password_toggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                  </button>
                  <span className={styles.input_focus_ring}></span>
                </div>
              </div>

              {/* Options */}
              <div className={`${styles.options} ${animate ? styles.fade_in : ''}`} style={{ animationDelay: '0.5s' }}>
                <label className={styles.checkbox_wrapper}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <span className={styles.checkmark}>
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className={styles.forgot_link}
                  onClick={() => {
                    setShowForgotPopup(true);
                    setPopupError("");
                    setPopupSuccess("");
                  }}
                >
                  <span>Forgot Password?</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className={`${styles.error_message} ${styles.shake}`}>
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`${styles.login_button} ${loading ? styles.loading : ''} ${animate ? styles.slide_in_up : ''}`}
                disabled={loading}
                style={{ animationDelay: '0.6s' }}
              >
                <span className={styles.button_content}>
                  {loading ? (
                    <>
                      <span className={styles.spinner}></span>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span className={styles.button_arrow}>
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </>
                  )}
                </span>
                <span className={styles.button_shine}></span>
              </button>
            </form>

            {/* Divider */}
            <div className={`${styles.divider} ${animate ? styles.fade_in : ''}`} style={{ animationDelay: '0.7s' }}>
              <span>or continue with</span>
            </div>

            {/* Social Login */}
            <div className={`${styles.social_login} ${animate ? styles.fade_in_up : ''}`} style={{ animationDelay: '0.8s' }}>
              <button className={`${styles.social_btn} ${styles.google_btn}`} disabled={loading}>
                <span className={styles.social_icon}><i className="fab fa-google"></i></span>
                <span>Google</span>
              </button>
              <button className={`${styles.social_btn} ${styles.github_btn}`} disabled={loading}>
                <span className={styles.social_icon}><i className="fab fa-github"></i></span>
                <span>GitHub</span>
              </button>
            </div>

            {/* Footer */}
            <div className={`${styles.footer} ${animate ? styles.fade_in : ''}`} style={{ animationDelay: '0.9s' }}>
              <p>
                Don't have an account? <Link to="/signup">Sign Up <i className="fas fa-arrow-right"></i></Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Popup 1: Forgot Password */}
      {showForgotPopup && (
        <div className={styles.popup_overlay} onClick={closeAllPopups}>
          <div className={styles.popup_card} onClick={(e) => e.stopPropagation()}>
            <button className={styles.popup_close} onClick={closeAllPopups}>
              <i className="fas fa-times"></i>
            </button>

            <div className={styles.popup_header}>
              <div className={`${styles.reset_icon} ${styles.pulse_anim}`}>
                <span>🔑</span>
              </div>
              <h3>Reset Password</h3>
              <p>Enter your email to receive reset code</p>
            </div>

            <form onSubmit={handleForgotSubmit} className={styles.popup_form}>
              <div className={styles.input_group}>
                <label>Email Address</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  disabled={popupLoading}
                />
              </div>

              {popupError && (
                <div className={`${styles.popup_error} ${styles.shake}`}>
                  <i className="fas fa-exclamation-circle"></i>
                  {popupError}
                </div>
              )}

              {popupSuccess && (
                <div className={`${styles.popup_success} ${styles.popup_success_anim}`}>
                  <i className="fas fa-check-circle"></i>
                  {popupSuccess}
                </div>
              )}

              <button
                type="submit"
                className={`${styles.popup_button} ${popupLoading ? styles.loading : ''}`}
                disabled={popupLoading}
              >
                <span>{popupLoading ? "Sending..." : "Send Code"}</span>
                {!popupLoading && <i className="fas fa-paper-plane"></i>}
              </button>

              <button
                type="button"
                className={styles.popup_back}
                onClick={closeAllPopups}
              >
                <i className="fas fa-arrow-left"></i> Back to Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Popup 2: Reset Password */}
      {showResetPopup && (
        <div className={styles.popup_overlay} onClick={closeAllPopups}>
          <div className={`${styles.popup_card} ${styles.popup_enter}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.popup_close} onClick={closeAllPopups}>
              <i className="fas fa-times"></i>
            </button>

            <div className={styles.popup_header}>
              <div className={`${styles.reset_icon} ${styles.pulse_anim}`}>
                <span>🔒</span>
              </div>
              <h3>New Password</h3>
              <p>Enter the code and your new password</p>
            </div>

            <form onSubmit={handleResetSubmit} className={styles.popup_form}>
              <div className={styles.input_group}>
                <label>Reset Code</label>
                <input
                  type="text"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="000000"
                  required
                  disabled={popupLoading}
                />
              </div>

              <div className={styles.input_group}>
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  disabled={popupLoading}
                />
              </div>

              <div className={styles.input_group}>
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  disabled={popupLoading}
                />
              </div>

              {popupError && (
                <div className={`${styles.popup_error} ${styles.shake}`}>
                  <i className="fas fa-exclamation-circle"></i>
                  {popupError}
                </div>
              )}

              {popupSuccess && (
                <div className={`${styles.popup_success} ${styles.popup_success_anim}`}>
                  <i className="fas fa-check-circle"></i>
                  {popupSuccess}
                </div>
              )}

              <button
                type="submit"
                className={`${styles.popup_button} ${popupLoading ? styles.loading : ''}`}
                disabled={popupLoading}
              >
                <span>{popupLoading ? "Resetting..." : "Reset Password"}</span>
                {!popupLoading && <i className="fas fa-check"></i>}
              </button>

              <button
                type="button"
                className={styles.popup_back}
                onClick={() => {
                  setShowResetPopup(false);
                  setShowForgotPopup(true);
                  setPopupError("");
                  setPopupSuccess("");
                }}
              >
                <i className="fas fa-arrow-left"></i> Back
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}