import express from "express";
import { getGenres, createGenre } from "../controllers/genreController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getGenres);
router.post("/", authMiddleware, roleMiddleware("admin"), createGenre);

export default router;
