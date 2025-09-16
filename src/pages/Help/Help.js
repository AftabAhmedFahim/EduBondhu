import React from "react";
import { useNavigate } from "react-router-dom";
import "./Help.css";
import bgImage from "../../assets/login-bg.jpg";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="help-page">
      {/* Navbar */}
      <nav className="navbar">
        <button className="back-btn" onClick={() => navigate("/")}>Back</button>
        <h1 className="brand">EduBondhu</h1>
      </nav>

      {/* Header with background */}
      <div
        className="header-section"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h2 className="header-title">How can I help you?</h2>
      </div>

      {/* White section with boxes */}
      <div className="content-section">
        

        {/* FAQ Section */}
        <div className="faq-section">
          <h3 className="faq-title">How to find tutors?</h3>
          <p className="faq-answer">
            Login as a student, search tutors, and you can message them to discuss a tuition schedule and fees.
          </p>

          <h3 className="faq-title">How to find tuition?</h3>
          <p className="faq-answer">
            You need to login as a tutor, and students will contact you for tuition opportunities.
          </p>

          <h3 className="faq-title">How to login?</h3>
          <p className="faq-answer">
            Use the login button on the homepage, enter your email and password to access your account.
          </p>

          <h3 className="faq-title">How to change password?</h3>
          <p className="faq-answer">
            Go to your profile settings, click on "Change Password", and follow the steps to update it.
          </p>

          <h3 className="faq-title">How to change profile page information?</h3>
          <p className="faq-answer">
            Visit your profile page, click edit, and update your details like bio, contact info, or subjects you teach.
          </p>
        </div>
        <div className="boxes-container">
          <div className="info-box green">
            <FaMapMarkerAlt className="info-icon" />
            <h2>Our Main Office</h2>
            <p>Ahsanullah University of Science and Technology. 141 & 142, Love Road, Tejgaon Industrial Area, Dhaka-1208</p>
          </div>
          <div className="info-box blue">
            <FaPhoneAlt className="info-icon" />
            <h2>Phone Number</h2>
            <p>01612345678</p>
          </div>
          <div className="info-box red">
            <FaEnvelope className="info-icon" />
            <h2>Email</h2>
            <p>aftab@aust.edu</p>
            <p>saiman@aust.edu</p>
            <p>rabib@aust.edu</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpPage;