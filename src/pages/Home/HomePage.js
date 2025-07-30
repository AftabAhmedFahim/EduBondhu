import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">EduBondhu</div>
        <div className="nav-links">
          <button>About</button>
          <button>Contact</button>
          <button>Help</button>
          <button className="signup" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button className="login" onClick={() => navigate("/login")}>
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Bridging Students, Tutors & Success</h1>
        <p>
          Find the perfect tutor or student with EduBondhu’s seamless platform.
          Connect, chat, and achieve your academic goals.
        </p>
        <div className="cta-buttons">
          <button className="student-btn" onClick={() => navigate("/signup")}>
            I'm a Student
          </button>
          <button className="tutor-btn" onClick={() => navigate("/signup")}>
            I'm a Tutor
          </button>
        </div>
      </section>

      {/* Key Features */}
      <section className="features">
        <h2>Key Features</h2>
        <h3>Empowering Education, One Connection at a Time</h3>
        <p>
          EduBondhu offers a comprehensive suite of tools to enhance the
          learning experience for students and tutors alike.
        </p>
        <div className="feature-cards">
          <div className="card">
            <h4>Find Your Ideal Tutor</h4>
            <p>
              Search for tutors based on subject, level, and availability. Our
              advanced search filters ensure you find the perfect match.
            </p>
          </div>
          <div className="card">
            <h4>Seamless Communication</h4>
            <p>
              Communicate with tutors directly through our integrated chat
              system. Schedule sessions, ask questions, and stay connected.
            </p>
          </div>
          <div className="card">
            <h4>Trusted Ratings & Reviews</h4>
            <p>
              Read reviews and ratings from other students to make informed
              decisions. Share your own experiences to help others.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="final-cta">
        <h2>Ready to Elevate Your Learning Journey?</h2>
        <p>
          Join EduBondhu today and unlock your full potential. Whether you're a
          student seeking guidance or a tutor looking to share your expertise,
          we have the resources you need.
        </p>
        <button className="get-started-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-links">
            <a href="#">About Us</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
          </div>
          <p>© 2024 EduBondhu. All rights reserved.</p>
        </footer>
      </section>
    </div>
  );
};

export default HomePage;
