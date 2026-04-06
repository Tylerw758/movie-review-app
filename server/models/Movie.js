import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    releaseYear: {
      type: Number,
      default: null,
    },
    director: {
      type: String,
      default: "",
      trim: true,
    },
    posterUrl: {
      type: String,
      default: "",
      trim: true,
    },
    nowShowing: {
      type: Boolean,
      default: false,
    },
    genreIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviews: [
      {
        username: String,
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);