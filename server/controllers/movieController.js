import Movie from "../models/Movie.js";
import Genre from "../models/Genre.js";

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const { search, genre, page = 1 } = req.query;
    const limit = 15;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (genre) {
      // Find the genre ObjectId by name first
      const genreDoc = await Genre.findOne({ name: genre });
      if (genreDoc) {
        filter.genreIds = genreDoc._id;
      }
    }

    const total = await Movie.countDocuments(filter);
    const movies = await Movie.find(filter)
      .populate("genreIds", "name description")
      .skip(skip)
      .limit(limit);

    res.json({ movies, total, page: Number(page), totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create movie
export const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      releaseYear,
      director,
      posterUrl,
      genreIds,
    } = req.body;

    const movie = new Movie({
      title,
      description,
      releaseYear,
      director,
      posterUrl,
      genreIds: Array.isArray(genreIds) ? genreIds : [],
      createdBy: req.user?._id || null,
    });

    const savedMovie = await movie.save();
    const populatedMovie = await Movie.findById(savedMovie._id).populate(
      "genreIds",
      "name description"
    );

    res.status(201).json(populatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update movie
export const updateMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      releaseYear,
      director,
      posterUrl,
      genreIds,
    } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        releaseYear,
        director,
        posterUrl,
        genreIds: Array.isArray(genreIds) ? genreIds : [],
      },
      { new: true, runValidators: true }
    ).populate("genreIds", "name description");

    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete movie
export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
