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

  const navigate = useNavigate();

  // --- Verification Popup States ---
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [verifySuccess, setVerifySuccess] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // --- Input Change Handler ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
    if (success) setSuccess("");
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

  // --- Registration Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Selected role:", formData.role);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the Terms and Conditions");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
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
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.container}>
        <div className={styles.card}>

          <div className={styles.heading_text}>
            <div className={styles.title}>
              <div className={styles.logo_wrapper}>
                <img src={logo} alt="SmartMentor Logo" className={styles.logo} />
                <div className={styles.logo_pulse}></div>
              </div>
              <h1>SmartMentor</h1>
            </div>
            <h2>Create Your Account</h2>
            <p>Start your journey to career success</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.fields}>
            <div className={styles.row}>
              <div className={styles.input_group}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                  disabled={loading}
                />
              </div>
              <div className={styles.input_group}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.input_group}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div className={styles.input_group}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                disabled={loading}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.input_group}>
                <label>Password</label>
                <div className={styles.password_field}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
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
              <div className={styles.input_group}>
                <label>Confirm Password</label>
                <div className={styles.password_field}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.password_toggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                  </button>
                </div>
              </div>
            </div>

            <label className={styles.terms_label}>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                disabled={loading}
              />
              <span>
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </span>
            </label>

            {error && <div className={styles.error_message}>{error}</div>}
            {success && (
              <div className={styles.success_message}>
                <i className="fas fa-check-circle"></i>
                <span>{success}</span>
              </div>
            )}

            <button type="submit" className={styles.signup_button} disabled={loading}>
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
              {!loading && <span className={styles.button_arrow}>→</span>}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
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
              <div className={styles.logo_wrapper}>
                <img src={logo} alt="SmartMentor" className={styles.logo} />
                <div className={styles.logo_pulse}></div>
              </div>
              <h3>Verify Your Email</h3>
              <p>{localStorage.getItem("tempEmail") || "your@email.com"}</p>
              <p>Enter the 6-digit code we sent</p>
            </div>

            <form onSubmit={handleVerifySubmit} className={styles.popup_form}>
              <div className={styles.input_group}>
                <label>Verification Code</label>
                <input
                  type="text"
                  value={verifyCode}
                  onChange={handleVerifyChange}
                  placeholder="000000"
                  maxLength="6"
                  required
                  disabled={verifyLoading}
                  autoFocus
                />
                <small className={styles.popup_hint}>Check spam folder if not received</small>
              </div>

              {verifyError && (
                <div className={`${styles.error_message} ${styles.error_message_animated}`}>
                  <i className={`fas fa-exclamation-circle ${styles.error_icon}`}></i>
                  {verifyError}
                </div>
              )}

              {verifySuccess && (
                <div className={styles.success_message}>
                  <i className="fas fa-check-circle"></i>
                  {verifySuccess}
                </div>
              )}

              <button
                type="submit"
                className={`${styles.signup_button} ${verifyLoading ? styles.loading : ""}`}
                disabled={verifyLoading || verifyCode.length !== 6}
              >
                <span>{verifyLoading ? "Verifying..." : "Verify Email"}</span>
                {!verifyLoading && <span className={styles.button_arrow}>→</span>}
              </button>

              <div className={styles.popup_actions}>
                <button
                  type="button"
                  className={styles.resend_btn}
                  onClick={handleResendVerify}
                  disabled={verifyLoading || !canResend}
                >
                  {canResend ? "📩 Resend Code" : `⏳ Resend in ${timer}s`}
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