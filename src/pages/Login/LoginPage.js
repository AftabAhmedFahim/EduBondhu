import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:" , data);
      if (!res.ok) {
        setError(data.message || "Wrong email or password");
      } else {
        setError("");
        if (data.user){
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/profile");
        }
        else{
          setError("Invalid Response from Server");
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin} >
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
             <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <div className="form-bottom">
            <a className="forgot-link">Forgot Password?</a>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="extra-link">
          Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")} className="link-action">Sign up</span>
        </div>
        <div className="back-home" onClick={() => navigate("/")}>
          ← Back to Home
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;
