import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Load user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user
    window.location.href = "/login"; // redirect to login
  };

  if (!user) {
    return <h2>Loading...</h2>; // if user not found yet
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">EduBondhu</div>
        <ul className="nav-links">
          <li><a href="#">My Profile</a></li>
          <li><a href="#">Search Tutors</a></li>
          <li><a href="#">Messages</a></li>
        </ul>

        <div className="profile-dropdown">
          <button className="profile-icon" onClick={toggleDropdown}>
            {user.fullName.charAt(0).toUpperCase()}
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="#">Edit Profile</a>
              <a href="#">Settings & Privacy</a>
              <a href="#">Help</a>
              <a onClick={handleLogout} style={{ cursor: "pointer" }}>Log Out</a>
            </div>
          )}
        </div>
      </nav>

      {/* Main Profile Section */}
      <div className="profile-container">
        <h1 className="welcome-text">
          Welcome back, {user.fullName.split(" ")[0]}
        </h1>

        <div className="profile-card">
          <div className="profile-info">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h2 className="profile-name">{user.fullName}</h2>
              <p className="profile-email">🖂 {user.email}</p>
              <p className="profile-contact">
                📞 {user.contact}
              </p>
              <p className="profile-role">👤 {user.role}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="quick-links">
            <h3>Quick Links</h3>
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
