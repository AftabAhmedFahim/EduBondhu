import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./VerifyOtpPage.css";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      alert("OTP cannot be empty");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Invalid or expired OTP");
    }
  };

  return (
    <div className="signup-wrapper">
      <nav className="signup-navbar">
        <button className="signup-logo" onClick={() => navigate("/")}>EduBondhu</button>
        <div className="signup-nav-links">
          <button className="nav-btn" onClick={() => navigate("/about")}>About</button>
          <button className="nav-btn" onClick={() => navigate("/contact")}>Contact</button>
          <button className="nav-btn" onClick={() => navigate("/help")}>Help</button>
        </div>
      </nav>

      <div className="signup-content">
        <div className="signup-box">
          <h2>Verify OTP</h2>
          <Form className="signup-form" onSubmit={handleSubmit}>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Enter OTP</Form.Label>
              <Form.Control type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter the 6-digit OTP"/>
            </Form.Group>

            <Button type="submit" className="signup-btn">
              Verify
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
