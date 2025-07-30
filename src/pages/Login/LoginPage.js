import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form >
          <div className="form-group">
            <label>Email</label>
            <input placeholder="Enter your email"/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input placeholder="Enter your password" />
          </div>

          <div className="form-bottom">
            <a className="forgot-link">Forgot Password?</a>
          </div>

          <button className="login-btn">Login</button>
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
