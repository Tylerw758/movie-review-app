import { useEffect, useState } from "react";
import {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getGenres,
} from "../services/api";

export default function AdminPanel() {
  const token = localStorage.getItem("token");

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    releaseYear: "",
    director: "",
    posterUrl: "",
    genreIds: [],
  });

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data.movies || []); // ✅ fixed
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await getGenres();
      setGenres(res.data);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleGenreChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setMovie({
      ...movie,
      genreIds: selectedOptions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const movieData = {
        title: movie.title,
        description: movie.description,
        releaseYear: Number(movie.releaseYear),
        director: movie.director,
        posterUrl: movie.posterUrl,
        genreIds: movie.genreIds,
      };

      if (editingId) {
        await updateMovie(editingId, movieData, token);
        alert("Movie updated successfully!");
      } else {
        await createMovie(movieData, token);
        alert("Movie added successfully!");
      }

      setMovie({
        title: "",
        description: "",
        releaseYear: "",
        director: "",
        posterUrl: "",
        genreIds: [],
      });

      setEditingId(null);
      fetchMovies();
    } catch (err) {
      console.error("Movie submit error:", err);
      alert("Failed to save movie");
    }
  };

  const handleEdit = (movieToEdit) => {
    setMovie({
      title: movieToEdit.title || "",
      description: movieToEdit.description || "",
      releaseYear: movieToEdit.releaseYear || "",
      director: movieToEdit.director || "",
      posterUrl: movieToEdit.posterUrl || "",
      genreIds: movieToEdit.genreIds
        ? movieToEdit.genreIds.map((g) => g._id)
        : [],
    });
    setEditingId(movieToEdit._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id, token);
      alert("Movie deleted successfully!");
      fetchMovies();
    } catch (err) {
      console.error("Delete movie error:", err);
      alert("Failed to delete movie");
    }
  };

  return (
    <section className="panel-section" id="admin">
      <h2 className="section-title">Admin Panel</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movie.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={movie.releaseYear}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movie.director}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="posterUrl"
          placeholder="Poster URL"
          value={movie.posterUrl}
          onChange={handleChange}
        />

        <select
          multiple
          name="genreIds"
          value={movie.genreIds}
          onChange={handleGenreChange}
          required
        >
          {genres.map((genre) => (
            <option key={genre._id} value={genre._id}>
              {genre.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Movie description"
          value={movie.description}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Movie" : "Add Movie"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setMovie({
                title: "",
                description: "",
                releaseYear: "",
                director: "",
                posterUrl: "",
                genreIds: [],
              });
              setEditingId(null);
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="admin-movie-list">
        <h3>Manage Movies</h3>
        {movies.map((m) => (
          <div key={m._id} className="admin-movie-item">
            <p>
              <strong>{m.title}</strong> ({m.releaseYear})
            </p>
            <button onClick={() => handleEdit(m)}>Edit</button>
            <button onClick={() => handleDelete(m._id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}