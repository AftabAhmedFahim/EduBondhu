import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Sign up</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full name</Form.Label>
          <Form.Control type="text" placeholder="Enter your full name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your address" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact number</Form.Label>
          <Form.Control type="text" placeholder="Enter your contact number" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select>
            <option>Select your role</option>
            <option>Student</option>
            <option>Tutor</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email address" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Confirm your password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>

      <div className="text-center mt-3">
        Already have an account?{" "}
        <button
          className="btn btn-link p-0"
          onClick={() => navigate("/login")}
          style={{ textDecoration: "underline" }}
        >
          Log in
        </button>
      </div>
    </Container>
  );
};

export default SignupPage;
