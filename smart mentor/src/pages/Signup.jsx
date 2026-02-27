import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";
import logo from "../assets/sign in logo.png";

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
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password != formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError("");
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
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
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit">Create Account</button>
          </div>

          <div className="footer">
            <p>Do You have an account?</p>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </form>
  );
}
