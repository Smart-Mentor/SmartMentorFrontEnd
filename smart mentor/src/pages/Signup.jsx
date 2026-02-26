import { Link } from "react-router-dom";
import { useState } from "react";
import "./login.css";
import logo from "../assets/sign in logo.png";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="container">
        <div className="heading-text">
          <div className="title">
            <img src={logo} alt="SmartMentor Logo" />
            <h1>SmartMentor</h1>
          </div>

          <h2>Create Your Account</h2>
          <p>Start your journey to career success</p>
        </div>

        <div className="fields">
          <label htmlFor="fullname">Full Name</label>
          <input id="fullname" type="text" />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" />

          <label htmlFor="password">Password</label>

          <div className="password-field">
            <input id="password" type={showPassword ? "text" : "password"} />

            <i
              className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <button>Create Account</button>
        </div>

        <div className="footer">
          <p>Do You have an account?</p>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
