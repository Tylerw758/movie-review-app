import { useEffect, useState } from "react";
import { createMovie, getMovies, updateMovie, deleteMovie } from "../services/api";

export default function AdminPanel() {
  const token = localStorage.getItem("token");

  const [movie, setMovie] = useState({
    title: "",
    year: "",
    genres: "",
    plot: ""
  });

  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const movieData = {
        title: movie.title,
        year: Number(movie.year),
        genres: movie.genres.split(",").map((g) => g.trim()),
        plot: movie.plot
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
        year: "",
        genres: "",
        plot: ""
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
      year: movieToEdit.year || "",
      genres: movieToEdit.genres ? movieToEdit.genres.join(", ") : "",
      plot: movieToEdit.plot || ""
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
          name="year"
          placeholder="Year"
          value={movie.year}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="genres"
          placeholder="Genres (comma separated)"
          value={movie.genres}
          onChange={handleChange}
          required
        />

        <textarea
          name="plot"
          placeholder="Plot description"
          value={movie.plot}
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
        year: "",
        genres: "",
        plot: ""
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
              <strong>{m.title}</strong> ({m.year})
            </p>

            <button onClick={() => handleEdit(m)}>Edit</button>
            <button onClick={() => handleDelete(m._id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}