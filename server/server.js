import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./DataBase/connect.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("API is running and connected to server");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});