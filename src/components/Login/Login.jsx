import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import logo from "../../assets/sign in logo.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    navigate("/dashboard");
  };

  return (
    <div className={styles.login_page}>
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
            <h2>Welcome Back</h2>
            <p>Sign in to continue your learning journey</p>
          </div>

          {/* Form */}
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
              />
              <span className={styles.input_focus}></span>
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

            <div className={styles.options}>
              <label className={styles.checkbox_label}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className={styles.forgot_link}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className={styles.login_button}>
              <span>Sign In</span>
              <span className={styles.button_arrow}>→</span>
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          {/* Social Login */}
          <div className={styles.social_login}>
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
            <p>Don't have an account?</p>
            <Link to={"/signup"}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}