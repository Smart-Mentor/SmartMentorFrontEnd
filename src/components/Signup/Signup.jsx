import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Signup.module.css";
import logo from "../../assets/sign in logo.png";
import { registerUser, verifyEmail, resendVerificationCode } from "../../api/authenticationService";

export default function Signup() {

  // --- Form State ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  // --- UI Visibility States ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- Feedback & Loading States ---
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // --- Field Validation States ---
  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // --- Password Validation States ---
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // --- Show password requirements flag ---
  const [showPasswordReqs, setShowPasswordReqs] = useState(false);

  const navigate = useNavigate();

  // --- Verification Popup States ---
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [verifySuccess, setVerifySuccess] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

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

  // --- Validate Single Field ---
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.trim().length < 2) return "First name must be at least 2 characters";
        if (!/^[a-zA-Z\s]*$/.test(value)) return "First name can only contain letters";
        return "";
      
      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.trim().length < 2) return "Last name must be at least 2 characters";
        if (!/^[a-zA-Z\s]*$/.test(value)) return "Last name can only contain letters";
        return "";
      
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      
      case "password":
        if (!value) return "Password is required";
        const validation = validatePassword(value);
        if (!validation.hasMinLength) return "At least 6 characters required";
        if (!validation.hasUpperCase) return "Add an uppercase letter (A-Z)";
        if (!validation.hasLowerCase) return "Add a lowercase letter (a-z)";
        if (!validation.hasNumber) return "Add a number (0-9)";
        if (!validation.hasSpecialChar) return "Add a special character (!@#$%^&*)";
        return "";
      
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      
      default:
        return "";
    }
  };

  // --- Input Change Handler with Validation ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear general errors
    if (error) setError("");
    if (success) setSuccess("");
    
    // Validate the field
    const fieldError = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: fieldError }));
    
    // Special handling for password to update validation indicators
    if (name === "password") {
      const validation = validatePassword(value);
      setPasswordValidation(validation);
      
      // Also re-validate confirm password if it has a value
      if (formData.confirmPassword) {
        const confirmError = validateField("confirmPassword", formData.confirmPassword);
        setFieldErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      }
    }
    
    // Re-validate confirm password when password changes
    if (name === "confirmPassword") {
      const confirmError = validateField("confirmPassword", value);
      setFieldErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  // --- Handle Password Field Focus ---
  const handlePasswordFocus = () => {
    setShowPasswordReqs(true);
  };

  // --- Handle Password Field Blur ---
  const handlePasswordBlur = () => {
    // Only hide if password is empty or all requirements are met
    if (formData.password === "" || Object.values(passwordValidation).every(v => v === true)) {
      setShowPasswordReqs(false);
    }
  };

  // --- Validate All Fields Before Submit ---
  const validateAllFields = () => {
    const errors = {
      firstName: validateField("firstName", formData.firstName),
      lastName: validateField("lastName", formData.lastName),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword),
    };
    
    setFieldErrors(errors);
    
    // Check if any field has an error
    return !Object.values(errors).some(error => error !== "");
  };

  // --- Countdown Timer Effect ---
  useEffect(() => {
    let interval;
    if (showVerifyPopup && timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, canResend, showVerifyPopup]);

  // --- Popup Control Logic ---
  const openVerifyPopup = () => {
    setShowVerifyPopup(true);
    setTimer(60);
    setCanResend(false);
    setVerifyCode("");
    setVerifyError("");
    setVerifySuccess("");
  };

  const closeVerifyPopup = () => {
    setShowVerifyPopup(false);
    setVerifyLoading(false);
    setVerifyError("");
    setVerifySuccess("");
  };

  // --- Verification Input Handler ---
  const handleVerifyChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setVerifyCode(value);
    if (verifyError) setVerifyError("");
    if (verifySuccess) setVerifySuccess("");
  };

  // --- Email Verification Submit ---
  const handleVerifySubmit = async (e) => {
    e.preventDefault();

    if (verifyCode.length !== 6) {
      setVerifyError("Please enter 6-digit code");
      return;
    }

    const token = localStorage.getItem("verificationToken");
    if (!token) {
      setVerifyError("Token missing. Please register again.");
      return;
    }

    try {
      setVerifyLoading(true);
      setVerifyError("");
      setVerifySuccess("");

      const res = await verifyEmail({ verificationToken: token, code: verifyCode });

      const isSuccess =
        res?.isSuccessful ||
        res?.success ||
        res?.message?.toLowerCase().includes("success") ||
        res?.message?.toLowerCase().includes("verified");

      if (isSuccess) {
        localStorage.removeItem("verificationToken");
        localStorage.removeItem("tempEmail");
        setVerifySuccess("🎉 Verified! Redirecting...");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      } else {
        setVerifyError(res.message || "Invalid code");
      }
    } catch (err) {
      setVerifyError(err.message || "Verification failed");
    } finally {
      setVerifyLoading(false);
    }
  };

  // --- Resend Code Logic ---
  const handleResendVerify = async () => {
    const token = localStorage.getItem("verificationToken");
    if (!token || !canResend || verifyLoading) return;

    try {
      setVerifyLoading(true);
      setVerifyError("");
      setVerifySuccess("");

      const res = await resendVerificationCode(token);

      if (res?.isSuccessful || res?.message?.toLowerCase().includes("sent")) {
        setVerifySuccess("📩 New code sent!");
        setTimer(60);
        setCanResend(false);
      } else {
        setVerifyError(res.message || "Failed to resend");
      }
    } catch (err) {
      setVerifyError("Something went wrong");
    } finally {
      setVerifyLoading(false);
    }
  };

  // --- Registration Submit with Validation ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Selected role:", formData.role);

    // First validate all fields
    if (!validateAllFields()) {
      setError("Please fix the errors above before continuing");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the Terms and Conditions");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phoneNumber: formData.phoneNumber.trim() || null,
        role: formData.role,
      };

      const res = await registerUser(payload);

      if (res.verificationToken) {
        localStorage.setItem("verificationToken", res.verificationToken);
      }

      if (res.isSuccessful || res.success || res.message?.toLowerCase().includes("success")) {
        localStorage.setItem("tempEmail", formData.email);
        setSuccess("✅ Account created!");
        setTimeout(() => openVerifyPopup(), 800);
        return;
      }

      if (res.message?.toLowerCase().includes("exist") || res.message?.toLowerCase().includes("already")) {
        const token = res.verificationToken || localStorage.getItem("verificationToken");

        if (!token) {
          setError("⚠️ Email exists but can't resend code. Try logging in.");
          return;
        }

        localStorage.setItem("tempEmail", formData.email);
        localStorage.setItem("verificationToken", token);
        const res = await resendVerificationCode(token);
        setSuccess("📩 New code sent!");
        setTimeout(() => openVerifyPopup(), 800);
        return;
      }

      setSuccess("✅ Account created!");
      setTimeout(() => openVerifyPopup(), 800);

    } catch (err) {
      const errorMsg = err.message;
      if (errorMsg.toLowerCase().includes("exist")) {
        setError("This email is already registered");
      } else {
        setError(errorMsg || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- UI Render ---
  return (
    <div className={styles.signup_page}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>
      <div className={styles.bg_particles}></div>
      <div className={styles.floating_shapes}>
        <div className={styles.shape_1}></div>
        <div className={styles.shape_2}></div>
        <div className={styles.shape_3}></div>
      </div>

      {/* Main Container - Split Layout */}
      <div className={styles.signup_container}>
        
        {/* Left Side - Welcome Section */}
        <div className={styles.welcome_section}>
          <div className={styles.welcome_content}>
            
            {/* Animated Logo */}
            <div className={styles.logo_section}>
              <div className={styles.logo_hero}>
                <div className={styles.logo_orb_1}></div>
                <div className={styles.logo_orb_2}></div>
                <div className={styles.logo_center}>
                  <img src={logo} alt="SmartMentor" className={styles.logo} />
                </div>
              </div>
              <h1 className={styles.brand_name}>SmartMentor</h1>
            </div>

            {/* Welcome Text with Typing Animation */}
            <div className={styles.welcome_text}>
              <h2 className={styles.welcome_title}>
                Begin Your <span className={styles.gradient_text}>Career Journey</span>
              </h2>
              <p className={styles.welcome_description}>
                Join thousands of learners building their tech careers with AI-powered guidance and personalized learning paths.
              </p>
            </div>

            {/* Animated Features */}
            <div className={styles.features_showcase}>
              <div className={styles.feature_card}>
                <div className={styles.feature_icon_wrapper}>
                  <span className={styles.feature_icon}>🚀</span>
                </div>
                <div className={styles.feature_info}>
                  <h3>Fast Track Learning</h3>
                  <p>AI-curated content tailored to you</p>
                </div>
              </div>

              <div className={styles.feature_card}>
                <div className={styles.feature_icon_wrapper}>
                  <span className={styles.feature_icon}>🎯</span>
                </div>
                <div className={styles.feature_info}>
                  <h3>Career Roadmap</h3>
                  <p>Clear path to your dream job</p>
                </div>
              </div>

              <div className={styles.feature_card}>
                <div className={styles.feature_icon_wrapper}>
                  <span className={styles.feature_icon}>💎</span>
                </div>
                <div className={styles.feature_info}>
                  <h3>Real Projects</h3>
                  <p>Build portfolio-worthy work</p>
                </div>
              </div>
            </div>

            {/* Animated Stats */}
            <div className={styles.stats_showcase}>
              <div className={styles.stat_bubble}>
                <span className={styles.stat_number}>10K+</span>
                <span className={styles.stat_label}>Active Learners</span>
              </div>
              <div className={styles.stat_bubble}>
                <span className={styles.stat_number}>95%</span>
                <span className={styles.stat_label}>Success Rate</span>
              </div>
              <div className={styles.stat_bubble}>
                <span className={styles.stat_number}>500+</span>
                <span className={styles.stat_label}>Career Paths</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={styles.decorative_1}></div>
          <div className={styles.decorative_2}></div>
          <div className={styles.decorative_3}></div>
          <div className={styles.grid_pattern}></div>
        </div>

        {/* Right Side - Signup Form */}
        <div className={styles.form_section}>
          <div className={styles.form_card}>
            
            {/* Form Header */}
            <div className={styles.form_header}>
              <div className={styles.form_badge}>
                <span>✨</span> Free Account
              </div>
              <h2 className={styles.form_title}>Create Account</h2>
              <p className={styles.form_subtitle}>Start your learning journey today</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className={styles.signup_form}>
              
              {/* Name Row */}
              <div className={styles.name_row}>
                <div className={styles.input_group}>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    disabled={loading}
                    className={fieldErrors.firstName ? styles.input_error : ""}
                  />
                  <span className={styles.input_icon}>👤</span>
                  {fieldErrors.firstName && (
                    <span className={styles.field_error}>{fieldErrors.firstName}</span>
                  )}
                </div>
                <div className={styles.input_group}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    disabled={loading}
                    className={fieldErrors.lastName ? styles.input_error : ""}
                  />
                  <span className={styles.input_icon}>👤</span>
                  {fieldErrors.lastName && (
                    <span className={styles.field_error}>{fieldErrors.lastName}</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className={styles.input_group}>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  disabled={loading}
                  className={fieldErrors.email ? styles.input_error : ""}
                />
                <span className={styles.input_icon}>📧</span>
                {fieldErrors.email && (
                  <span className={styles.field_error}>{fieldErrors.email}</span>
                )}
              </div>

              {/* Phone */}
              <div className={styles.input_group}>
                <label>Phone Number <span className={styles.optional}>(Optional)</span></label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+20 1xx xxx xxxx"
                  disabled={loading}
                />
                <span className={styles.input_icon}>📱</span>
              </div>

              {/* Password Row */}
              <div className={styles.password_row}>
                <div className={styles.input_group}>
                  <label>Password</label>
                  <div className={styles.password_wrapper}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={handlePasswordFocus}
                      onBlur={handlePasswordBlur}
                      placeholder="Create a strong password"
                      required
                      disabled={loading}
                      className={fieldErrors.password ? styles.input_error : ""}
                    />
                    <button
                      type="button"
                      className={styles.password_toggle}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <span className={styles.field_error}>{fieldErrors.password}</span>
                  )}
                </div>
                <div className={styles.input_group}>
                  <label>Confirm Password</label>
                  <div className={styles.password_wrapper}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      disabled={loading}
                      className={fieldErrors.confirmPassword ? styles.input_error : ""}
                    />
                    <button
                      type="button"
                      className={styles.password_toggle}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <span className={styles.field_error}>{fieldErrors.confirmPassword}</span>
                  )}
                </div>
              </div>

              {/* Enhanced Password Strength Indicator */}
              <div className={styles.password_strength_container}>
                <div className={styles.password_strength}>
                  <div className={styles.strength_bars_wrapper}>
                    <div 
                      className={styles.strength_bars_fill}
                      style={{ 
                        width: `${(Object.values(passwordValidation).filter(v => v === true).length / 5) * 100}%`,
                        backgroundColor: (() => {
                          const percent = (Object.values(passwordValidation).filter(v => v === true).length / 5);
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
                    {formData.password.length === 0 && "Enter password"}
                    {formData.password.length > 0 && 
                      (() => {
                        const percent = (Object.values(passwordValidation).filter(v => v === true).length / 5) * 100;
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
                {(showPasswordReqs || formData.password.length > 0) && (
                  <div className={styles.password_requirements}>
                    <div className={`${styles.req_item} ${passwordValidation.hasMinLength ? styles.req_met : ''}`}>
                      <span>{passwordValidation.hasMinLength ? '✓' : '○'}</span> At least 6 characters
                    </div>
                    <div className={`${styles.req_item} ${passwordValidation.hasUpperCase ? styles.req_met : ''}`}>
                      <span>{passwordValidation.hasUpperCase ? '✓' : '○'}</span> Uppercase letter (A-Z)
                    </div>
                    <div className={`${styles.req_item} ${passwordValidation.hasLowerCase ? styles.req_met : ''}`}>
                      <span>{passwordValidation.hasLowerCase ? '✓' : '○'}</span> Lowercase letter (a-z)
                    </div>
                    <div className={`${styles.req_item} ${passwordValidation.hasNumber ? styles.req_met : ''}`}>
                      <span>{passwordValidation.hasNumber ? '✓' : '○'}</span> Number (0-9)
                    </div>
                    <div className={`${styles.req_item} ${passwordValidation.hasSpecialChar ? styles.req_met : ''}`}>
                      <span>{passwordValidation.hasSpecialChar ? '✓' : '○'}</span> Special character (!@#$%^&*)
                    </div>
                  </div>
                )}
              </div>

              {/* Terms */}
              <label className={styles.terms_label}>
                <div className={styles.checkbox_wrapper}>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    disabled={loading}
                  />
                  <span className={styles.checkmark}>
                    <i className="fas fa-check"></i>
                  </span>
                </div>
                <span>
                  I agree to the <span style={{color:"#0A5ADB", fontWeight:"600"}}>Terms</span> and <span style={{color:"#0A5ADB", fontWeight:"600"}}>Privacy Policy</span>
                </span>
              </label>

              {/* Messages */}
              {error && (
                <div className={styles.error_message}>
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className={styles.success_message}>
                  <i className="fas fa-check-circle"></i>
                  <span>{success}</span>
                </div>
              )}
                            
              {/* Submit Button */}
              <button 
                type="submit" 
                className={`${styles.signup_button} ${loading ? styles.loading : ''}`}
                disabled={loading}
              >
                <span>{loading ? "Creating Account..." : ""}</span>
                {!loading && (
                  <span className={styles.button_content}>
                    <span className={styles.button_text}>Get Started</span>
                    <span className={styles.button_arrow}>→</span>
                  </span>
                )}
                {loading && <span className={styles.spinner}></span>}
              </button>
            </form>

            {/* Footer */}
            <div className={styles.footer}>
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Verification Modal --- */}
      {showVerifyPopup && (
        <div className={styles.popup_overlay} onClick={closeVerifyPopup}>
          <div className={styles.popup_card} onClick={(e) => e.stopPropagation()}>
            <button className={styles.popup_close} onClick={closeVerifyPopup}>
              <i className="fas fa-times"></i>
            </button>

            <div className={styles.popup_header}>
              <div className={styles.verify_icon}>
                <span>📧</span>
              </div>
              <h3>Verify Your Email</h3>
              <p className={styles.verify_email}>{localStorage.getItem("tempEmail") || "your@email.com"}</p>
              <p className={styles.verify_hint}>Enter the 6-digit code we sent to your email</p>
            </div>

            <form onSubmit={handleVerifySubmit} className={styles.popup_form}>
              <div className={styles.otp_section}>
                <input
                  type="text"
                  value={verifyCode}
                  onChange={handleVerifyChange}
                  placeholder="• • • • • •"
                  maxLength="6"
                  required
                  disabled={verifyLoading}
                  className={styles.otp_input}
                  autoFocus
                />
              </div>

              {verifyError && (
                <div className={styles.popup_error}>
                  <i className="fas fa-exclamation-circle"></i>
                  {verifyError}
                </div>
              )}

              {verifySuccess && (
                <div className={styles.popup_success}>
                  <i className="fas fa-check-circle"></i>
                  {verifySuccess}
                </div>
              )}

              <button
                type="submit"
                className={`${styles.verify_button} ${verifyLoading ? styles.loading : ""}`}
                disabled={verifyLoading || verifyCode.length !== 6}
              >
                <span>{verifyLoading ? "Verifying..." : "Verify Email"}</span>
                {!verifyLoading && <span>→</span>}
              </button>

              <div className={styles.popup_actions}>
                <button
                  type="button"
                  className={styles.resend_btn}
                  onClick={handleResendVerify}
                  disabled={verifyLoading || !canResend}
                >
                  {canResend ? (
                    <>
                      <span>📩</span> Resend Code
                    </>
                  ) : (
                    <>
                      <span>⏳</span> Resend in {timer}s
                    </>
                  )}
                </button>

                <button type="button" className={styles.popup_back} onClick={closeVerifyPopup}>
                  Back to Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}