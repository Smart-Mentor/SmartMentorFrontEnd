// 🔹 Imports
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/sign in logo.png";
import { loginUser, forgotPassword, resetPassword, verifyEmail, resendVerificationCode } from "../../api/authenticationService";

export default function Login() {

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

  const pendingCredentials = useRef({ email: "", password: "" });

  // Forgot / Reset Password Popup States
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popupError, setPopupError] = useState("");
  const [popupSuccess, setPopupSuccess] = useState("");
  const [popupLoading, setPopupLoading] = useState(false);

  // Reset Password Strength States
  const [resetPasswordValidation, setResetPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [showResetPasswordReqs, setShowResetPasswordReqs] = useState(false);
  const [showResetNewPassword, setShowResetNewPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);

  // Verification Modal States
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verificationError, setVerificationError] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);

  // --- Password Validation Function ---
  const validatePassword = (password) => {
    return {
      hasMinLength: password.length >= 6,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  // --- Animation on mount ---
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  // Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for admin credentials first
    const isAdminEmail = formData.email.toLowerCase() === "admin@gmail.com";
    const isAdminPassword = formData.password === "Admin@123";
    
    if (isAdminEmail && isAdminPassword) {
      try {
        setError("");
        setLoading(true);
        
        const loginData = {
          ...formData,
          email: formData.email.toLowerCase()
        };

        const response = await loginUser(loginData);

        if (response.isSuccessful && response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("userRole", "admin");
          localStorage.removeItem("verificationToken");
        }
        
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
        
        navigate("/admin/dashboard", { replace: true });
        return;
      } catch (err) {
        setError("Admin login failed");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Regular user login flow
    try {
      setError("");
      setLoading(true);

      const loginData = {
        ...formData,
        email: formData.email.toLowerCase()
      };

      pendingCredentials.current = {
        email: loginData.email,
        password: loginData.password
      };

      const response = await loginUser(loginData);

      if (response.isSuccessful && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userRole", "user");
        localStorage.removeItem("verificationToken");

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        // Check if email is confirmed
        if (response.user && response.user.emailConfirmed === false) {
          setVerificationToken(response.verificationToken);
          setShowVerificationPopup(true);
        } else {
          navigate("/completeprofile", { replace: true });
        }
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

  // Verification Submit Handler
  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setVerificationError("Please enter the verification code");
      return;
    }

    try {
      setVerificationLoading(true);
      setVerificationError("");
      setVerificationSuccess("");

      const result = await verifyEmail({
        verificationToken: verificationToken,
        code: verificationCode
      });

      if (result.isSuccessful || result.message?.toLowerCase().includes("success")) {
        setVerificationSuccess("✅ Email verified successfully! Logging you in...");

        const newLoginResponse = await loginUser(pendingCredentials.current);

        if (newLoginResponse.isSuccessful && newLoginResponse.token) {
          localStorage.setItem("token", newLoginResponse.token);
          localStorage.setItem("userRole", "user");
          if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
          }

          setTimeout(() => {
            setShowVerificationPopup(false);
            setVerificationCode("");
            setVerificationToken("");
            navigate("/completeprofile", { replace: true });
          }, 1000);
        } else {
          setVerificationError("Verification succeeded, but we couldn't log you in. Please try logging in again.");
          setTimeout(() => {
            setShowVerificationPopup(false);
            setVerificationCode("");
            setVerificationToken("");
            window.location.reload();
          }, 2000);
        }
      } else {
        setVerificationError(result.message || "Verification failed. Please check your code.");
      }
    } catch (err) {
      setVerificationError(err.message || "Something went wrong. Please try again.");
    } finally {
      setVerificationLoading(false);
    }
  };

  // Resend Verification Code Handler
  const handleResendCode = async () => {
    if (resendDisabled) return;

    try {
      setResendDisabled(true);
      setCountdown(60);
      setVerificationError("");
      setVerificationSuccess("");

      await resendVerificationCode(verificationToken);
      setVerificationSuccess("📧 A new verification code has been sent to your email.");

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setVerificationError(err.message || "Failed to resend code. Please try again.");
      setResendDisabled(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    
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

  // Handle Reset New Password Change
  const handleResetNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    const validation = validatePassword(value);
    setResetPasswordValidation(validation);
    if (popupError) setPopupError("");
  };

  // Handle Reset Confirm Password Change
  const handleResetConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (popupError) setPopupError("");
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");
    
    if (email && email.toLowerCase() === "admin@gmail.com") {
      setPopupError("Admin password reset is not allowed through this form");
      return;
    }

    // Validate password strength
    const validation = validatePassword(newPassword);
    if (!validation.hasMinLength) {
      setPopupError("Password must be at least 6 characters");
      return;
    }
    if (!validation.hasUpperCase) {
      setPopupError("Password must contain an uppercase letter (A-Z)");
      return;
    }
    if (!validation.hasLowerCase) {
      setPopupError("Password must contain a lowercase letter (a-z)");
      return;
    }
    if (!validation.hasNumber) {
      setPopupError("Password must contain a number (0-9)");
      return;
    }
    if (!validation.hasSpecialChar) {
      setPopupError("Password must contain a special character (!@#$%^&*)");
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
          setResetPasswordValidation({
            hasMinLength: false,
            hasUpperCase: false,
            hasLowerCase: false,
            hasNumber: false,
            hasSpecialChar: false,
          });
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

  const closeAllPopups = () => {
    setShowForgotPopup(false);
    setShowResetPopup(false);
    setPopupError("");
    setPopupSuccess("");
    setPopupLoading(false);
  };

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

      {/* Back to Home Button - Top Right Corner */}
      <button 
        className={styles.back_home_button}
        onClick={() => navigate('/')}
        aria-label="Back to Home"
      >
        <svg className={styles.home_icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span className={styles.tooltip}>Back to Home</span>
      </button>

      {/* Main Container - Split Layout */}
      <div className={`${styles.login_container} ${animate ? styles.animate_in : ''}`}>
        
        {/* Left Side - Welcome Section */}
        <div className={`${styles.welcome_section} ${animate ? styles.fade_in_left : ''}`}>
          <div className={styles.welcome_content}>
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

            <div className={`${styles.welcome_text} ${animate ? styles.fade_in_up : ''}`} style={{ animationDelay: '0.2s' }}>
              <h2 className={styles.welcome_title}>
                Welcome Back to <span className={styles.gradient_text}>Your Journey</span>
              </h2>
              <p className={styles.welcome_description}>
                Continue building your tech career with AI-powered guidance and personalized learning paths.
              </p>
            </div>

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

          <div className={styles.decorative_1}></div>
          <div className={styles.decorative_2}></div>
          <div className={styles.decorative_3}></div>
          <div className={styles.grid_pattern}></div>
          <div className={styles.floating_dots}></div>
        </div>

        {/* Right Side - Login Form */}
        <div className={`${styles.form_section} ${animate ? styles.fade_in_right : ''}`}>
          <div className={styles.form_card}>
            <div className={`${styles.form_header} ${animate ? styles.fade_in_up : ''}`}>
              <div className={`${styles.form_badge} ${animate ? styles.bounce_in : ''}`}>
                <span className={styles.badge_icon}>👋</span>
                <span>Welcome Back</span>
              </div>
              <h2 className={styles.form_title}>Sign In</h2>
              <p className={styles.form_subtitle}>Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className={`${styles.login_form} ${animate ? styles.fade_in_up : ''}`} style={{ animationDelay: '0.2s' }}>
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

              {error && (
                <div className={`${styles.error_message} ${styles.shake}`}>
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

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
              <button type="button" className={styles.popup_back} onClick={closeAllPopups}>
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
                <div className={styles.password_wrapper}>
                  <input
                    type={showResetNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={handleResetNewPasswordChange}
                    onFocus={() => setShowResetPasswordReqs(true)}
                    onBlur={() => {
                      if (newPassword === "" || Object.values(resetPasswordValidation).every(v => v === true)) {
                        setShowResetPasswordReqs(false);
                      }
                    }}
                    placeholder="Enter new password"
                    required
                    disabled={popupLoading}
                  />
                  <button
                    type="button"
                    className={styles.password_toggle}
                    onClick={() => setShowResetNewPassword(!showResetNewPassword)}
                  >
                    <i className={`fa-solid ${showResetNewPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator for Reset */}
              <div className={styles.password_strength_container}>
                <div className={styles.password_strength}>
                  <div className={styles.strength_bars_wrapper}>
                    <div 
                      className={styles.strength_bars_fill}
                      style={{ 
                        width: `${(Object.values(resetPasswordValidation).filter(v => v === true).length / 5) * 100}%`,
                        backgroundColor: (() => {
                          const percent = (Object.values(resetPasswordValidation).filter(v => v === true).length / 5);
                          if (percent <= 0.2) return '#ff4444';
                          if (percent <= 0.4) return '#ff8844';
                          if (percent <= 0.6) return '#ffcc44';
                          if (percent <= 0.8) return '#88cc44';
                          return '#44ff44';
                        })()
                      }}
                    ></div>
                  </div>
                  <span className={styles.strength_label}>
                    {newPassword.length === 0 && "Enter password"}
                    {newPassword.length > 0 && 
                      (() => {
                        const percent = (Object.values(resetPasswordValidation).filter(v => v === true).length / 5) * 100;
                        if (percent === 0) return "Very Weak";
                        if (percent <= 20) return "Weak";
                        if (percent <= 40) return "Fair";
                        if (percent <= 60) return "Good";
                        if (percent <= 80) return "Strong";
                        return "Very Strong";
                      })()
                    }
                  </span>
                </div>
                  
                {/* Password Requirements List */}
                {(showResetPasswordReqs || newPassword.length > 0) && (
                  <div className={styles.password_requirements}>
                    <div className={`${styles.req_item} ${resetPasswordValidation.hasMinLength ? styles.req_met : ''}`}>
                      <span>{resetPasswordValidation.hasMinLength ? '✓' : '○'}</span> At least 6 characters
                    </div>
                    <div className={`${styles.req_item} ${resetPasswordValidation.hasUpperCase ? styles.req_met : ''}`}>
                      <span>{resetPasswordValidation.hasUpperCase ? '✓' : '○'}</span> Uppercase letter (A-Z)
                    </div>
                    <div className={`${styles.req_item} ${resetPasswordValidation.hasLowerCase ? styles.req_met : ''}`}>
                      <span>{resetPasswordValidation.hasLowerCase ? '✓' : '○'}</span> Lowercase letter (a-z)
                    </div>
                    <div className={`${styles.req_item} ${resetPasswordValidation.hasNumber ? styles.req_met : ''}`}>
                      <span>{resetPasswordValidation.hasNumber ? '✓' : '○'}</span> Number (0-9)
                    </div>
                    <div className={`${styles.req_item} ${resetPasswordValidation.hasSpecialChar ? styles.req_met : ''}`}>
                      <span>{resetPasswordValidation.hasSpecialChar ? '✓' : '○'}</span> Special character (!@#$%^&*)
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.input_group}>
                <label>Confirm Password</label>
                <div className={styles.password_wrapper}>
                  <input
                    type={showResetConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleResetConfirmPasswordChange}
                    placeholder="Confirm new password"
                    required
                    disabled={popupLoading}
                  />
                  <button
                    type="button"
                    className={styles.password_toggle}
                    onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}
                  >
                    <i className={`fa-solid ${showResetConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                  </button>
                </div>
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
                  setNewPassword("");
                  setConfirmPassword("");
                  setResetCode("");
                  setResetPasswordValidation({
                    hasMinLength: false,
                    hasUpperCase: false,
                    hasLowerCase: false,
                    hasNumber: false,
                    hasSpecialChar: false,
                  });
                }}
              >
                <i className="fas fa-arrow-left"></i> Back
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Popup 3: Email Verification Modal */}
      {showVerificationPopup && (
        <div className={styles.popup_overlay} onClick={() => {}}>
          <div className={styles.popup_card} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.popup_close}
              onClick={() => {
                setShowVerificationPopup(false);
                setVerificationCode("");
                setVerificationToken("");
                setVerificationError("");
                setVerificationSuccess("");
              }}
            >
              <i className="fas fa-times"></i>
            </button>

            <div className={styles.popup_header}>
              <div className={`${styles.reset_icon} ${styles.pulse_anim}`}>
                <span>✉️</span>
              </div>
              <h3>Verify Your Email</h3>
              <p>Please enter the 6‑digit code sent to your email address</p>
            </div>

            <form onSubmit={handleVerificationSubmit} className={styles.popup_form}>
              <div className={styles.input_group}>
                <label>Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6‑digit code"
                  maxLength="6"
                  required
                  disabled={verificationLoading}
                />
              </div>

              {verificationError && (
                <div className={`${styles.popup_error} ${styles.shake}`}>
                  <i className="fas fa-exclamation-circle"></i>
                  {verificationError}
                </div>
              )}

              {verificationSuccess && (
                <div className={`${styles.popup_success} ${styles.popup_success_anim}`}>
                  <i className="fas fa-check-circle"></i>
                  {verificationSuccess}
                </div>
              )}

              <button
                type="submit"
                className={`${styles.popup_button} ${verificationLoading ? styles.loading : ''}`}
                disabled={verificationLoading}
              >
                <span>{verificationLoading ? "Verifying..." : "Verify Email"}</span>
                {!verificationLoading && <i className="fas fa-check"></i>}
              </button>

              <div className={styles.resend_container}>
                <button
                  type="button"
                  className={`${styles.resend_button} ${resendDisabled ? styles.disabled : ''}`}
                  onClick={handleResendCode}
                  disabled={resendDisabled}
                >
                  {resendDisabled ? `Resend code in ${countdown}s` : "Resend Code"}
                </button>
              </div>

              <button
                type="button"
                className={styles.popup_back}
                onClick={() => {
                  setShowVerificationPopup(false);
                  setVerificationCode("");
                  setVerificationToken("");
                }}
              >
                <i className="fas fa-arrow-left"></i> Back to Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}