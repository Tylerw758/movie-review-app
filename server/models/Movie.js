import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  genres: [String],
  plot: String
});

export default mongoose.model("Movie", movieSchema);