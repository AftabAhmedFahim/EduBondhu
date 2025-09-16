import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./editProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    institution: "",
    contact: "",
    password: "",
    confirmPassword: "",
    email: "",
    newEmail: "",
    otp: "",
  });
  const [step, setStep] = useState("edit"); // edit | otp
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      setForm((f) => ({
        ...f,
        fullName: u.fullName || "",
        address: u.address || "",
        institution: u.institution || "",
        contact: u.contact || "",
        email: u.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
  setError("");
  setMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    if (form.newEmail && form.newEmail !== form.email) {
      try {
        const res = await fetch("http://localhost:5000/api/auth/request-email-change", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ⭐ EDITED
          },
          body: JSON.stringify({ newEmail: form.newEmail }),
        });
        const data = await res.json();
        if (res.ok) {
          setStep("otp");
          setMsg("OTP sent to new email. Please enter it below.");
        } else {
          setError(data.message || "Failed to send OTP");
        }
      } catch {
        setError("Failed to send OTP");
      }
      setLoading(false);
      return;
    }

    // Password confirmation check
    if (form.password && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // ⭐ EDITED: Profile update API (no email update here)
    try {
      const res = await fetch("http://localhost:5000/api/auth/user/" + user.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: form.fullName,
          address: form.address,
          institution: form.institution,
          contact: form.contact,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Profile updated successfully.");
        localStorage.setItem("user", JSON.stringify({ ...user, ...data.user }));
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch {
      setError("Failed to update profile");
    }
    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMsg("");

    const token = localStorage.getItem("token");

    // ⭐ EDITED: Confirm OTP & update email
    try {
      const res = await fetch("http://localhost:5000/api/auth/confirm-email-change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ⭐ EDITED
        },
        body: JSON.stringify({ newEmail: form.newEmail, otp: form.otp }),
      });
      const data = await res.json();

      if (res.ok) {
        setMsg("Email updated successfully.");
        setUser((u) => ({ ...u, email: form.newEmail }));
        localStorage.setItem("user", JSON.stringify({ ...user, email: form.newEmail }));
        setStep("edit");
        setForm((f) => ({ ...f, email: form.newEmail, newEmail: "", otp: "" }));
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch {
      setError("Failed to verify OTP");
    }
    setLoading(false);
  };

  if (!user) return <div className="edit-profile-container"><h2>Loading...</h2></div>;

  return (
    <div className="edit-profile-bg">
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        {msg && <div className="edit-success">{msg}</div>}
        {error && <div className="edit-error">{error}</div>}
        {step === "edit" ? (
          <form className="edit-profile-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input name="fullName" value={form.fullName} onChange={handleChange} required />
            </label>
            <label>
              Address:
              <input name="address" value={form.address} onChange={handleChange} required />
            </label>
            <label>
              Institution:
              <input name="institution" value={form.institution} onChange={handleChange} required />
            </label>
            <label>
              Contact Number:
              <input name="contact" value={form.contact} onChange={handleChange} required />
            </label>
            <label>
              Password:
              <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Change your Password" />
            </label>
            <label>
              Confirm Password:
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm new password" />
            </label>
            <label>
              Email:
              <input name="newEmail" type="email" value={form.newEmail} onChange={handleChange} placeholder={form.email} />
              <span className="email-desc">To change your email, verification will be required for the new email address.</span>
            </label>
            <button type="submit" disabled={loading}>
              {form.newEmail && form.newEmail !== form.email ? "Send OTP to New Email" : "Update Profile"}
            </button>
            <button type="button" className="back-btn" onClick={() => navigate("/profile")}>{" Go back to profile"}</button>
          </form>
        ) : (
          <form className="edit-profile-form" onSubmit={handleOtpSubmit}>
            <label>
              Enter OTP sent to {form.newEmail}:
              <input name="otp" value={form.otp} onChange={handleChange} required />
            </label>
            <button type="submit" disabled={loading}>Verify & Update Email</button>
            <button type="button" className="back-btn" onClick={() => navigate("/profile")}>{"Go back to profile"}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;