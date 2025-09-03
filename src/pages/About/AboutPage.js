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
  },
  {
    name: "Rubaiat Ar Rabib",
    email: "rubaiat.cse.20230104111@aust.edu",
    img: image2,
  },
  {
    name: "Saiman Ullah",
    email: "saiman.cse.20230104113@aust.edu",
    img: image3,
  },
];

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
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          EduBondhu
        </div>
        
        {/* Mobile menu button */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* About Section */}
      <section className="about-section">
        <h1>About Us</h1>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}