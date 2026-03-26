import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  genre: String,
  description: String
});

export default mongoose.model("Movie", movieSchema);