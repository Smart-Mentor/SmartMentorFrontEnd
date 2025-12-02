import { useState } from "react";
import "./login.css";
import logo from "../assets/sign in logo.png";

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">

      <div className="heading-text">
        <div className="title">
          <img src={logo} alt="SmartMentor Logo" />
          <h1>SmartMentor</h1>
        </div>

        <h2>Welcome Back</h2>
        <p>Sign in to continue your learning journey</p>
      </div>

      <div className="filds">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />

        <label htmlFor="password">Password</label>

        <div className="password-fild">
          <input 
            id="password"
            type={showPassword ? "text" : "password"}
          />

          <i 
            id="icone"
            className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        <button>Sign in</button>
      </div>

      <div className="footer">
        <p>Don't have an account? </p>
        <a href="#">Sign Up</a>
      </div>

    </div>
  );
}
