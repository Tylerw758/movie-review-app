import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// test
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/movies", movieRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));