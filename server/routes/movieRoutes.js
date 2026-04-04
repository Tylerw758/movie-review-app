import express from "express";

import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

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
