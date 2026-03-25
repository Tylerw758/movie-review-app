import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    releaseYear: Number,
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }]
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);