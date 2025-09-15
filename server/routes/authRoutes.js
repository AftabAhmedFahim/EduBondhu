import express from "express";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
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
      password, 
      isVerified: false 
    });

    await newUser.save();

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.create({ email, otp: otpCode });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your Email",
      text: `Your OTP is ${otpCode}. It will expire in 5 minutes.`,
    });

    res.status(201).json({ 
      success: true,
      message: "Signup successful! OTP sent to email." 
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Something went wrong during signup" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    await Otp.deleteMany({ email });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );

    res.status(200).json({
      message: "Email verified successfully!",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        contact: user.contact,
      }
    });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ success: false, message: "Something went wrong during OTP verification" });
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

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first" });
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

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});


export default router;