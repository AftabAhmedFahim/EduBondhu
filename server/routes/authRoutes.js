import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST route for signup (your existing code)
router.post("/signup", async (req, res) => {
  try {
    const { fullName, address, contact, role, email, password } = req.body;

    const newUser = new User({
      fullName,
      address,
      contact,
      role,
      email,
      password
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// NEW: GET route to fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Get all users but exclude passwords
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;