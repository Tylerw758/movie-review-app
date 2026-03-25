import Movie from "../models/Movie.js";

// CREATE (Admin)
export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getMovies = async (req, res) => {
  const movies = await Movie.find().populate("genres");
  res.json(movies);
};

// GET ONE
export const getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate("genres");
  res.json(movie);
};

// UPDATE (Admin)
export const updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
};

// DELETE (Admin)
export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Movie deleted" });
};