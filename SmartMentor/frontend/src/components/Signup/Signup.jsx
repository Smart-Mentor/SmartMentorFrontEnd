import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Signup.module.css";
import logo from "../../assets/sign in logo.png";
import { registerUser } from "../../api/authenticationService";
export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords don't match");
    return;
  }

  if (!acceptTerms) {
    setError("Please accept the Terms and Conditions");
    return;
  }

  try {
    setError("");

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    };

    await registerUser(payload);

    navigate("/login");
  } catch (err) {
    setError(err.message || "Server error");
  }
};

  return (
    <div className={styles.signup_page}>
      {/* Background decorative elements */}
      <div className={styles.bg_blur_1}></div>
      <div className={styles.bg_blur_2}></div>
      <div className={styles.bg_blur_3}></div>

      <div className={styles.container}>
        <div className={styles.card}>
          {/* Logo Section */}
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

          {/* Form */}
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
                  />
                  <button
                    type="button"
                    className={styles.password_toggle}
                    onClick={() => setShowPassword(!showPassword)}
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
                  />
                  <button
                    type="button"
                    className={styles.password_toggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className={styles.role_section}>
              <label>I am a:</label>
              <div className={styles.role_options}>
                <label className={styles.role_label}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                  />
                  <span>Student</span>
                </label>
                <label className={styles.role_label}>
                  <input
                    type="radio"
                    name="role"
                    value="professional"
                    checked={formData.role === "professional"}
                    onChange={handleChange}
                  />
                  <span>Professional</span>
                </label>
              </div>
            </div>

            {/* Terms and Conditions */}
            <label className={styles.terms_label}>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <span>
                I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </span>
            </label>

            {/* Error Message */}
            {error && <div className={styles.error_message}>{error}</div>}

            {/* Submit Button */}
            <button type="submit" className={styles.signup_button}>
              <span>Create Account</span>
              <span className={styles.button_arrow}>→</span>
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>Or sign up with</span>
          </div>

          {/* Social Signup */}
          <div className={styles.social_signup}>
            <button className={styles.social_btn}>
              <i className="fab fa-google"></i>
              Google
            </button>
            <button className={styles.social_btn}>
              <i className="fab fa-github"></i>
              GitHub
            </button>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p>Already have an account?</p>
            <Link to={"/login"}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}