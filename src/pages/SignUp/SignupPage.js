import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    institution: "",
    address: "",
    contact: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    for (let key in formData) {
    if (!formData[key].trim()) {
      alert(`${key} cannot be empty`);
      return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }


    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
    alert("Email must end with @gmail.com");
    return;
  }

  if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
    alert("Password must be at least 8 characters, include a digit and a capital letter");
    return;
  }

  if (!/^01\d{9}$/.test(formData.contact)) {
    alert("Phone number must start with 01 and be 11 digits long");
    return;
  }

  try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong",err);
    }
  };

  return (
    <div className="signup-wrapper">
      <nav className="signup-navbar">
        <button className="signup-logo" onClick={() => navigate("/")}>EduBondhu</button>
        <div className="signup-nav-links">
          <button className="nav-btn" onClick={() => navigate("/about")}>About</button>
          <button className="nav-btn" onClick={() => navigate("/contact")}>Contact</button>
          <button className="nav-btn" onClick={() => navigate("/help")}>Help</button>
        </div>
      </nav>


      <div className="signup-content">
        <div className="signup-box">
          <h2>Sign up</h2>
          <Form className="signup-form" onSubmit={handleSubmit}>
            <Form.Group className="form-group">
              <Form.Label className="form-label">Full name</Form.Label>
              <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name"/>
            </Form.Group>

            <Form.Group className="form-group">
            <Form.Label className="form-label">Institution Name</Form.Label>
            <Form.Control 
            type="text" 
            name="institution" 
            value={formData.institution} 
            onChange={handleChange} 
            placeholder="Enter your institution name"
            />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Address</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address"/>

            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Contact number</Form.Label>
              <Form.Control type="text"  name="contact" value={formData.contact} onChange={handleChange} placeholder="Enter your contact number"/>

            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange}>
                  <option value="">Select your role</option>
                  <option value="Student">Student</option>
                  <option value="Tutor">Tutor</option>
              </Form.Select>

            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Email address</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address"/>

            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password"/>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Confirm password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password"/>

            </Form.Group>

            <Button type="submit" className="signup-btn">
              Sign Up
            </Button>
          </Form>

          <div className="signup-extra">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Log in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
