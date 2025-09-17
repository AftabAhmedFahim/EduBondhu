import React, { useState } from "react";
import "./AboutPage.css";
import { useNavigate } from "react-router-dom";

import image1 from "./images/member1.jpg";
import image2 from "./images/member2.jpg";
import image3 from "./images/member3.jpg";

const teamMembers = [
  {
    name: "Aftab Ahmed Fahim",
    email: "aftab.cse.20230104117@aust.edu",
    img: image1,
    github: "https://github.com/AftabAhmedFahim",
    facebook: "https://www.facebook.com/Ahmed.aFtabfahim",
  },
  {
    name: "Rubaiat Ar Rabib",
    email: "rubaiat.cse.20230104111@aust.edu",
    img: image2,
    github: "https://github.com/sloth-262",
    facebook: "https://www.facebook.com/rubaiat.rabeeb",
  },
  {
    name: "Saiman Ullah",
    email: "saiman.cse.20230104113@aust.edu",
    img: image3,
    github: "https://github.com/saiman4113",
    facebook: "https://www.facebook.com/saiman.saiman.3766952/",
  },
];

const GithubIcon = () => (
  <svg height="28" width="28" viewBox="0 0 24 24" fill="#333">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.93.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.98.01 1.97.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg height="28" width="28" viewBox="0 0 24 24" fill="#1877f3">
    <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.405.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.405 24 22.674V1.326C24 .595 23.405 0 22.675 0"/>
  </svg>
);

export default function AboutPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="about-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          EduBondhu
        </div>
        
        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <section className="about-section">
        <h1><u>About Us</u></h1>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <a href={`mailto:${member.email}`}>{member.email}</a>
              <div className="social-links">
                <a href={member.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <GithubIcon />
                </a>
                <a href={member.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                  <FacebookIcon />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}