import Genre from "../models/Genre.js";

// Get all genres
export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create genre
export const createGenre = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Genre name is required" });
    }

    const existingGenre = await Genre.findOne({ name: name.trim() });
    if (existingGenre) {
      return res.status(400).json({ message: "Genre already exists" });
    }

    const genre = new Genre({
      name: name.trim(),
      description: description || "",
    });

    const savedGenre = await genre.save();
    res.status(201).json(savedGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
