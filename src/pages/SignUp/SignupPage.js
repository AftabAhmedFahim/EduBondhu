import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-wrapper">
      <nav className="navbar">
        <div className="logo">EduBondhu</div>
        <div className="nav-links">
          <button>About</button>
          <button>Contact</button>
          <button>Help</button>
          <button className="login" onClick={() => navigate("/login")}>
            Log In
          </button>
        </div>
      </nav>

      <div className="signup-content">
        <div className="signup-box">
          <h2>Sign up</h2>
          <Form className="signup-form">
            <Form.Group className="form-group">
              <Form.Label className="form-label">Full name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Address</Form.Label>
              <Form.Control type="text" placeholder="Enter your address" />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Contact number</Form.Label>
              <Form.Control type="text" placeholder="Enter your contact number" />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Role</Form.Label>
              <Form.Select>
                <option>Select your role</option>
                <option>Student</option>
                <option>Tutor</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email address" />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label className="form-label">Confirm password</Form.Label>
              <Form.Control type="password" placeholder="Confirm your password" />
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
