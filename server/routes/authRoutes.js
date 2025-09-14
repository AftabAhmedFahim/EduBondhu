import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { authenticateToken} from "../middleware/auth.js"; 

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { fullName, institution, address, contact, role, email, password } = req.body;

    if ([fullName, institution, address, contact, role, email, password].some(field => !field || !field.trim())) {
      return res.status(400).json({ message: "All fields are required and cannot be empty" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered. Please login or use another email." });
    }

    const newUser = new User({
      fullName,
      institution,
      address,
      contact,
      role,
      email,
      password
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    )

    res.status(201).json({ 
      message: "User registered successfully!", 
      token, 
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        contact: newUser.contact
      }
    });

  } catch (error) {
    console.error(error);

    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ message: "Email is already registered." });
    }
    
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select("-password"); 
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/users/tutors", authenticateToken, async (req, res) => {
  try {
    const tutors = await User.find({ role: "Tutor" }).select("-password");
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tutors" });
  }
});

router.get("/users/students", authenticateToken, async (req, res) => {
  try {
    const students = await User.find({ role: "Student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );

    res.status(200).json({
    message: "Login successful",
    token,
    user: { 
     id: user._id, 
     email: user.email, 
     fullName: user.fullName,
     role: user.role,            
     contact: user.contact
    }
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong during login" });
  }
});

export default router;