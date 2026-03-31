/*
  Connects URLs to Controller functions
*/

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
// Returns the currently logged-in user's info
router.get("/profile", authMiddleware, (req, res) => {
  res.json(req.user);
});

// Admin-only test route
// Good for checking if role protection works
router.get("/admin-test", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Welcome admin" });
});

export default router;