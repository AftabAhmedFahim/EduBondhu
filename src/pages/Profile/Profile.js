import React, { useState, useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (token) {
      fetch("http://localhost:5000/api/auth/users", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch users");
          }
          return res.json();
        })
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <h2>No user found. Please log in.</h2>; 
  }

  return (
    <div>
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
