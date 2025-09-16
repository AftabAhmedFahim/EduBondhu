import express from "express";
import Post from "../models/Post.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// Create a new post
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { content, author, userId } = req.body;
    if (!content || !author || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const post = new Post({ content, author, userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
});

export default router;