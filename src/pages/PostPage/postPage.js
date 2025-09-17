import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./postPage.css";
import { FiTrash2 } from "react-icons/fi";
const API_URL = "http://localhost:5000/api/posts";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data.reverse());
    } catch {
      setError("Failed to fetch posts");
    }
    setLoading(false);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    if (!content.trim()) {
      setError("Post content cannot be empty");
      return;
    }
    if (!user) {
      setError("You must be logged in to post");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          author: user.fullName,
          userId: user.id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Posted successfully!");
        setContent("");
        fetchPosts();
      } else {
        setError(data.message || "Failed to post");
      }
    } catch {
      setError("Failed to post");
    }
    setLoading(false);
  };

  const handleDelete = async (postId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;
  setLoading(true);
  setError("");
  setMsg("");
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_URL}/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setMsg("Post deleted successfully!");
      fetchPosts();
    } else {
      setError(data.message || "Failed to delete post");
    }
  } catch {
    setError("Failed to delete post");
  }
  setLoading(false);
};

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="post-page-bg">
      <div>
        {/* Navbar copied from Profile.js */}
        <nav className="navbar">
          <div className="logo">EduBondhu</div>
          <ul className="nav-links">
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/postPage">Feed</Link></li>
            <li><Link to="/searchPage">Search</Link></li>
            <li><Link to="/messages">Messages</Link></li>
          </ul>
          <div className="profile-dropdown">
            <button className="profile-icon" onClick={toggleDropdown}>
              {user && user.fullName ? user.fullName.charAt(0).toUpperCase() : "?"}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/editProfile">Edit Profile</Link>
                <Link to="/help">Help</Link>
                <a onClick={handleLogout} style={{ cursor: "pointer" }}>Log Out</a>
              </div>
            )}
          </div>
        </nav>
        {/* End Navbar */}

<div className="post-page-container">
          <h2>Tuition & Tutor Posts</h2>
          <form className="post-form" onSubmit={handlePost}>
            <textarea
              className="post-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your tuition/tutor post..."
              rows={3}
            />
            <button type="submit" disabled={loading}>Post</button>
          </form>
          {msg && <div className="post-success">{msg}</div>}
          {error && <div className="post-error">{error}</div>}
          <div className="posts-list">
            {loading ? (
              <div>Loading posts...</div>
            ) : posts.length === 0 ? (
              <div>No posts yet.</div>
            ) : (
              posts.map((post) => (
                <div className="post-card" key={post._id}>
                  <div className="post-author">{post.author}</div>
                  <div className="post-content">{post.content}</div>
                  <div className="post-date">
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                  {user && user.id === post.userId && (
                    <button
                      className="delete-post-btn"
                      onClick={() => handleDelete(post._id)}
                      disabled={loading}
                      title="Delete post"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;