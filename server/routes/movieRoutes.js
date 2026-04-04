import express from "express";

import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";

const router = express.Router();

// Get all movies
router.get("/", getMovies);

// Create movie
router.post("/", createMovie);

// Update movie
router.put("/:id", updateMovie);

// Delete movie
router.delete("/:id", deleteMovie);

export default router;