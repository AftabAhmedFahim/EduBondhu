import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./searchPage.css";
import { FiMenu } from "react-icons/fi"; 

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    fetch("http://localhost:5000/api/auth/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredUsers(
        users.filter((user) => {
          const name = user.fullName?.toLowerCase() || "";
          const address = user.address?.toLowerCase() || "";
          const institution = user.institution?.toLowerCase() || "";
          const role = user.role?.toLowerCase() || "";

          switch (searchType) {
            case "name":
              return name.includes(term);
            case "role":
              return role.includes(term);
            case "institution":
              return institution.includes(term);
            case "address":
              return address.includes(term);
            case "all":
            default:
              return (
                name.includes(term) ||
                address.includes(term) ||
                institution.includes(term) ||
                role.includes(term)
              );
          }
        })
      );
    }
  }, [searchTerm, users, searchType]);


  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleTypeChange = (e) => setSearchType(e.target.value);
  
  const handleMessage = (userId) => {
    const userToMessage = users.find(u => u._id === userId);
    if (userToMessage) {
      navigate("/messages", { state: { userToMessage } });
    }
  };

  return (
    <div className="search-bg-container">
      <nav className="navbar">
        <div className="logo">EduBondhu</div>
        <button
          className="hamburger"
          onClick={() => setNavOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          <FiMenu />
        </button>
        <ul className={`nav-links${navOpen ? " active" : ""}`}>
  <li>
    <Link to="/profile" onClick={() => setNavOpen(false)}>My Profile</Link>
  </li>
  <li>
    <Link to="/postPage" onClick={() => setNavOpen(false)}>Feed</Link>
  </li>
  <li>
    <Link to="/messages" onClick={() => setNavOpen(false)}>Messages</Link>
  </li>
        </ul>
      </nav>
      <div className="search-page">
        <h1>Search Users</h1>
        <div className="search-controls">
          <select className="search-type-select" value={searchType} onChange={handleTypeChange}>
            <option value="all">All</option>
            <option value="name">Name</option>
            <option value="role">Role</option>
            <option value="institution">Institution</option>
            <option value="address">Address</option>
          </select>
          <input
            type="text"
            className="search-input"
            placeholder={
              searchType === "all"
                ? "Search by name, role, institution, or address"
                : `Search by ${searchType}`
            }
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="user-list">
            {filteredUsers.length === 0 ? (
              <p>No users found.</p>
            ) : (
              filteredUsers.map((user) => (
                <div className="user-card" key={user._id}>
                  <div className="user-avatar">
                    {(user.fullName?.charAt(0) || "").toUpperCase()}
                  </div>
                  <div className="user-info">
                    <h2>{user.fullName}</h2>
                    <p>
                      <strong>Institution:</strong> {user.institution}
                    </p>
                    <p>
                      <strong>Address:</strong> {user.address}
                    </p>
                    <p>
                      <strong>Role:</strong> {user.role}
                    </p>
                    <p>
                      <strong>Contact:</strong> {user.contact}
                    </p>
                  </div>
                  <button
                    className="message-btn"
                    onClick={() => handleMessage(user._id)}
                  >
                    Message
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;