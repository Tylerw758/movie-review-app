import express from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);

router.post("/", authMiddleware, roleMiddleware("admin"), createMovie);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateMovie);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMovie);

export default router;