import express from "express";
import mongoose from "mongoose";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import User from "../models/User.js";
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

  // DELETE a review
router.delete("/:movieId/reviews/:reviewId", async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;
    const { username } = req.body;

    if (!mongoose.Types.ObjectId.isValid(reviewId) || !mongoose.Types.ObjectId.isValid(movieId)) {
  return res.status(400).json({ message: "Invalid ID" });
}


    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const review = movie.reviews.id(reviewId); // works if each review has _id
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Optional: check if username matches (basic auth check)
   const requestingUser = await User.findOne({ username });
    if (review.username !== username && requestingUser?.role !== "admin") {
    return res.status(403).json({ message: "Not allowed to delete this review" });
}
    movie.reviews.pull({ _id: reviewId });
    await movie.save(); 

    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error("DELETE REVIEW ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// Edit a review
router.put("/:movieId/reviews/:reviewId", async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;
    const { rating, comment, username } = req.body;

    if (!mongoose.Types.ObjectId.isValid(movieId) || !mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const review = movie.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Make sure the user owns the review
    const requestingUser = await User.findOne({ username });
    if (review.username !== username && requestingUser?.role !== "admin") {
    return res.status(403).json({ message: "Not allowed to edit this review" });
}

    // Update the fields
    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;

    await movie.save();
    res.json(review);
  } catch (err) {
    console.error("EDIT REVIEW ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;