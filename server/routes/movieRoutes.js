import express from "express";

import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import Movie from "../models/Movie.js";
const router = express.Router();

// Get all movies
router.get("/", getMovies);

// Create movie
router.post("/", authMiddleware, roleMiddleware("admin"), createMovie);

// Update movie
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateMovie);

// Delete movie
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMovie);

export default router;

router.get("/:id/reviews", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie.reviews || []); 
  } catch (err) {
    console.error("GET REVIEWS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST a review
router.post("/:id/reviews", async (req, res) => {
  try {
    const { username, rating, comment } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    
    if (!movie.reviews) {
      movie.reviews = [];
    }

    const newReview = { username, rating, comment };

    movie.reviews.push(newReview);

    await movie.save();

    res.status(201).json(newReview);
  } catch (err) {
    console.error("POST REVIEW ERROR:", err); 
    res.status(500).json({ error: err.message });
  }
});