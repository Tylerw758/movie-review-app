import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  status: {
    type: String,
    enum: ["want", "watching", "completed", "dropped"],
    default: "want"
  },
  addedAt: { type: Date, default: Date.now }
});

// Prevent same user adding same movie twice
watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model("Watchlist", watchlistSchema);