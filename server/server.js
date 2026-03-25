import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";


import movieRoutes from "./routes/movieRoutes.js";

app.use("/api/movies", movieRoutes);


dotenv.config();

const app = express();

import reviewRoutes from "./routes/reviewRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";

app.use("/api/reviews", reviewRoutes);
app.use("/api/genres", genreRoutes);




// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server AFTER DB connects
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});