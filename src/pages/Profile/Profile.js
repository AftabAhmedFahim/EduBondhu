import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [navOpen, setNavOpen] = useState(false);          // for hamburger menu
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // If we have a token, fetch detailed user information
      if (token) {
        // Fetch detailed user information including institution and address
        fetch(`http://localhost:5000/api/auth/user/${userData.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch user details");
            }
            return res.json();
          })
          .then((userDetailsData) => {
            // Update the user object with the detailed information
            setUser({...userData, ...userDetailsData});
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching user details:", err);
            setError(err.message);
            setLoading(false);
          });

        // Your existing code to fetch all users
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
          })
          .catch((err) => {
            console.error("Error fetching users:", err);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const toggleNav = () => {
    setNavOpen(!navOpen);
    setProfileMenuOpen(false); // close profile menu if nav is toggled
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
    setNavOpen(false); // close nav if profile menu is toggled
  };

   useEffect(() => {
    if (!navOpen) return;

    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.navbar');
      if (navbar && !navbar.contains(event.target)) {
        setNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navOpen]);
  
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
  <div className="profile-page">
    <div>
      <nav className="navbar">
        <div className="logo">EduBondhu</div>
        <button className="hamburger" onClick={toggleNav}>
          ☰
        </button>
        <ul className={`nav-links ${navOpen ? "active" : ""}`}>
          <li><a href="#">My Profile</a></li>
          <li><Link to="/postPage">Feed</Link></li>
          <li><Link to="/searchPage">Search</Link></li>
          <li><Link to="/messages">Messages</Link></li>
        </ul>

        <div className="profile-dropdown">
          <button className="profile-icon" onClick={toggleProfileMenu}>
            {user.fullName.charAt(0).toUpperCase()}
          </button>
          {profileMenuOpen && (
            <div className="dropdown-menu">
              <Link to="/editProfile">Edit Profile</Link>
              <Link to="/help">Help</Link>
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
            <div className="profile-header">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              </div>
              <h2 className="profile-name">{user.fullName}</h2>
            </div>
            
            <div className="profile-info-vertical">
              <div className="info-section-vertical">
                <h3 className="info-title">Email</h3>
                <p className="info-content">
                  <span className="info-item">
                    <span className="info-icon">🖂</span>
                    {user.email || "Not provided"}
                  </span>
                </p>
              </div>
              
              <div className="info-section-vertical">
                <h3 className="info-title">Contact</h3>
                <p className="info-content">
                  <span className="info-item">
                    <span className="info-icon">📞</span>
                    {user.contact || "Not provided"}
                  </span>
                </p>
              </div>
              
              <div className="info-section-vertical">
                <h3 className="info-title">Institution</h3>
                <p className="info-content">
                  <span className="info-item">
                    <span className="info-icon">🏫</span>
                    {user.institution || "Not provided"}
                  </span>
                </p>
              </div>
              
              <div className="info-section-vertical">
                <h3 className="info-title">Address</h3>
                <p className="info-content">
                  <span className="info-item">
                    <span className="info-icon">📍</span>
                    {user.address || "Not provided"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;