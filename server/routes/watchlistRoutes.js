import express from "express";
import Watchlist from "../models/Watchlist.js";
import User from "../models/User.js";

const router = express.Router();

// GET user's watchlist
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const watchlist = await Watchlist.find({ userId: user._id }).populate("movieId");
    res.json(watchlist);
  } catch (err) {
    console.error("GET WATCHLIST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST add movie to watchlist
router.post("/", async (req, res) => {
  try {
    const { username, movieId } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const existing = await Watchlist.findOne({ userId: user._id, movieId });
    if (existing) return res.status(400).json({ message: "Already in watchlist" });

    const entry = new Watchlist({ userId: user._id, movieId, status: "want" });
    await entry.save();

    await entry.populate("movieId");

    res.status(201).json(entry);
  } catch (err) {
    console.error("ADD WATCHLIST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH update status
router.patch("/:entryId", async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["want", "watching", "completed", "dropped"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const entry = await Watchlist.findByIdAndUpdate(
      req.params.entryId,
      { status },
      { new: true }
    ).populate("movieId");

    if (!entry) return res.status(404).json({ message: "Entry not found" });

    res.json(entry);
  } catch (err) {
    console.error("UPDATE WATCHLIST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE remove from watchlist
router.delete("/:entryId", async (req, res) => {
  try {
    const entry = await Watchlist.findByIdAndDelete(req.params.entryId);
    if (!entry) return res.status(404).json({ message: "Entry not found" });

    res.json({ message: "Removed from watchlist" });
  } catch (err) {
    console.error("DELETE WATCHLIST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;