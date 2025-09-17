import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./message.css";

const MessagePage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      fetch("http://localhost:5000/api/auth/chat-users", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((chatUsers) => {
          setConversations(chatUsers.map(u => ({ user: u, messages: [] })));
        });

      fetch("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setAllUsers(data.filter(u => u._id !== parsedUser.id)));
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.userToMessage) {
      setSelectedUser(location.state.userToMessage);
    }
  }, [location.state]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let intervalId;
    const fetchMessages = () => {
      if (selectedUser && user && token) {
        fetch(`http://localhost:5000/api/auth/messages/${selectedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => {
            setConversations(prev => {
              const idx = prev.findIndex(c => c.user._id === selectedUser._id);
              if (idx !== -1) {
                const updated = [...prev];
                updated[idx].messages = data;
                return updated;
              } else {
                return [
                  ...prev,
                  { user: selectedUser, messages: data }
                ];
              }
            });
          });
      }
    };
    fetchMessages();
    if (selectedUser && user && token) {
      intervalId = setInterval(fetchMessages, 2000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [selectedUser, user]);


  const handleSelectUser = (u) => {
    setSelectedUser(u);
    setMessageInput("");
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedUser) return;
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/auth/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        to: selectedUser._id,
        text: messageInput
      })
    });
    if (res.ok) {
      setMessageInput("");
      fetch(`http://localhost:5000/api/auth/messages/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setConversations(prev => {
            const idx = prev.findIndex(c => c.user._id === selectedUser._id);
            if (idx !== -1) {
              const updated = [...prev];
              updated[idx].messages = data;
              return updated;
            } else {
              return [
                ...prev,
                { user: selectedUser, messages: data }
              ];
            }
          });
        });
    }
  };

  const currentMessages = conversations.find(c => c.user._id === (selectedUser && selectedUser._id))?.messages || [];

  const newChatUsers = allUsers.filter(u => !conversations.some(c => c.user._id === u._id));

  return (
    <div className="message-bg">
      <nav className="navbar">
        <div className="logo">EduBondhu</div>
        <ul className="nav-links">
          <li><Link to="/profile">My Profile</Link></li>
          <li><Link to="/searchPage">Search</Link></li>
          <li><Link to="/postPage">Feed</Link></li>
        </ul>
      </nav>
      <div className="messenger-container">
        <div className="sidebar">
          <h3>Chats</h3>
          <div className="user-list">
            {conversations.length === 0 && (
              <div className="no-chats">No chats yet</div>
            )}
            {conversations.map((conv) => (
              <div
                key={conv.user._id}
                className={`user-item${selectedUser && selectedUser._id === conv.user._id ? " selected" : ""}`}
                onClick={() => handleSelectUser(conv.user)}
              >
                <div className="avatar">{conv.user.fullName.charAt(0).toUpperCase()}</div>
                <div className="user-info">
                  <div className="user-name">{conv.user.fullName}</div>
                  <div className="last-message">
                    {conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].text : ""}
                  </div>
                </div>
              </div>
            ))}
            <div className="all-users-label">Start new chat</div>
            {newChatUsers.map((u) => (
              <div
                key={u._id}
                className={`user-item${selectedUser && selectedUser._id === u._id ? " selected" : ""}`}
                onClick={() => handleSelectUser(u)}
              >
                <div className="avatar">{u.fullName.charAt(0).toUpperCase()}</div>
                <div className="user-info">
                  <div className="user-name">{u.fullName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-area">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <div className="avatar big">{selectedUser.fullName.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="chat-user-name">{selectedUser.fullName}</div>
                  <div className="chat-user-meta">{selectedUser.email}</div>
                </div>
              </div>
              <div className="chat-messages">
                {currentMessages.length === 0 && (
                  <div className="no-messages">No messages yet. Say hi!</div>
                )}
                {currentMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`chat-message${msg.from === user.id ? " own" : ""}`}
                  >
                    <div className="msg-text">{msg.text}</div>
                    <div className="msg-time">{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form className="chat-input-bar" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  autoFocus
                />
                <button type="submit" disabled={!messageInput.trim()}>Send</button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">Select a user to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;