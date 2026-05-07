// 🔹 Imports
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
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

        navigate("/dashboard", { replace: true });
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

  // 🔹 JSX UI
  return (
    <div className={styles.login_page}>
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.container}>
        <div className={styles.card}>

          {/* 🔹 Header Section */}
          <div className={styles.heading_text}>
            <div className={styles.title}>
              <div className={styles.logo_wrapper}>
                <img src={logo} alt="SmartMentor Logo" className={styles.logo} />
                <div className={styles.logo_pulse}></div>
              </div>
              <h1>SmartMentor</h1>
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to continue your learning journey</p>
          </div>

          {/* 🔹 Login Form */}
          <form onSubmit={handleSubmit} className={styles.fields}>
            <div className={styles.input_group}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="password">Password</label>
              <div className={styles.password_field}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
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
                  disabled={loading}
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                </button>
              </div>
            </div>

            {/* 🔹 Options */}
            <div className={styles.options}>
              <label className={styles.checkbox_label}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
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
                Forgot Password?
              </button>
            </div>

            {/* 🔹 Error Message */}
            {error && (
              <div className={`${styles.error_message} ${styles.error_message_animated}`}>
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            {/* 🔹 Submit Button */}
            <button 
              type="submit" 
              className={`${styles.login_button} ${loading ? styles.loading : ''}`} 
              disabled={loading}
            >
              <span>{loading ? "Signing In..." : "Sign In"}</span>
              {!loading && <span className={styles.button_arrow}>→</span>}
            </button>
          </form>

          {/* 🔹 Social Login */}
          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          <div className={styles.social_login}>
            <button className={styles.social_btn} disabled={loading}>
              <i className="fab fa-google"></i> Google
            </button>
            <button className={styles.social_btn} disabled={loading}>
              <i className="fab fa-github"></i> GitHub
            </button>
          </div>

          {/* 🔹 Footer */}
          <div className={styles.footer}>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
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
              <div className={styles.logo_wrapper}>
                <img src={logo} alt="SmartMentor" className={styles.logo} />
                <div className={styles.logo_pulse}></div>
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
                <div className={`${styles.error_message} ${styles.error_message_animated}`}>
                  <i className="fas fa-exclamation-circle"></i>
                  {popupError}
                </div>
              )}

              {popupSuccess && (
                <div className={styles.success_message}>
                  <i className="fas fa-check-circle"></i>
                  {popupSuccess}
                </div>
              )}

              <button
                type="submit"
                className={`${styles.login_button} ${popupLoading ? styles.loading : ''}`}
                disabled={popupLoading}
              >
                <span>{popupLoading ? "Sending..." : "Send Code"}</span>
                {!popupLoading && <span className={styles.button_arrow}>→</span>}
              </button>

              <button
                type="button"
                className={styles.popup_back}
                onClick={closeAllPopups}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Popup 2: Reset Password */}
      {showResetPopup && (
        <div className={styles.popup_overlay} onClick={closeAllPopups}>
          <div className={styles.popup_card} onClick={(e) => e.stopPropagation()}>
            <button className={styles.popup_close} onClick={closeAllPopups}>
              <i className="fas fa-times"></i>
            </button>

            <div className={styles.popup_header}>
              <div className={styles.logo_wrapper}>
                <img src={logo} alt="SmartMentor" className={styles.logo} />
                <div className={styles.logo_pulse}></div>
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
                <div className={`${styles.error_message} ${styles.error_message_animated}`}>
                  <i className="fas fa-exclamation-circle"></i>
                  {popupError}
                </div>
              )}

              {popupSuccess && (
                <div className={styles.success_message}>
                  <i className="fas fa-check-circle"></i>
                  {popupSuccess}
                </div>
              )}

              <button
                type="submit"
                className={`${styles.login_button} ${popupLoading ? styles.loading : ''}`}
                disabled={popupLoading}
              >
                <span>{popupLoading ? "Resetting..." : "Reset Password"}</span>
                {!popupLoading && <span className={styles.button_arrow}>→</span>}
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
                Back
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}