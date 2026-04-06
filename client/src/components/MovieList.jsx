import { useEffect, useState } from "react";
import { getMovies, getGenres } from "../services/api";
import MovieCard from "./MovieCard";
import Reviews from "./Reviews";
import axios from "axios";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [tab, setTab] = useState("want");

  const currentUser = JSON.parse(localStorage.getItem("user"))?.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await getMovies();
        setMovies(movieRes.data);
        console.log("Movies loaded:", movieRes.data);
      } catch (err) {
        console.error("Error loading movies:", err);
      }

      try {
        const genreRes = await getGenres();
        setGenres(genreRes.data);
        console.log("Genres loaded:", genreRes.data);
      } catch (err) {
        console.error("Error loading genres:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/watchlist/${currentUser}`
        );
        setWatchlist(res.data);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
      }
    };

    fetchWatchlist();
  }, [currentUser]);

  const filteredMovies = movies.filter((movie) => {
    const movieGenres =
      movie.genreIds?.map((g) => g?.name).filter(Boolean) || [];

    const matchesSearch =
      movie.title?.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      genre === "all" || movieGenres.includes(genre);

    return matchesSearch && matchesGenre;
  });

  const nowShowingMovies = filteredMovies.filter(
    (movie) => movie.nowShowing === true
  );

  const featuredMovies =
    nowShowingMovies.length > 0
      ? nowShowingMovies.slice(0, 4)
      : filteredMovies.slice(0, 4);

  const addToWatchlist = async (movie) => {
    if (!currentUser) {
      alert("You must be logged in to use the watchlist");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5001/api/watchlist",
        {
          username: currentUser,
          movieId: movie._id,
        }
      );

      setWatchlist((prev) => [...prev, res.data]);
      alert(`${movie.title} added to watchlist`);
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Already in your watchlist!");
      } else {
        console.error("Error adding to watchlist:", err);
      }
    }
  };

  const updateStatus = async (entryId, newStatus) => {
    try {
      const res = await axios.patch(
        `http://localhost:5001/api/watchlist/${entryId}`,
        { status: newStatus }
      );

      setWatchlist((prev) =>
        prev.map((entry) =>
          entry._id === entryId ? res.data : entry
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const removeFromWatchlist = async (entryId) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/watchlist/${entryId}`
      );

      setWatchlist((prev) =>
        prev.filter((entry) => entry._id !== entryId)
      );
    } catch (err) {
      console.error("Error removing from watchlist:", err);
    }
  };

  const filteredWatchlist = watchlist.filter(
    (entry) => entry.status === tab
  );

  const selectedGenres =
    selectedMovie?.genreIds
      ?.map((g) => g?.name)
      .filter(Boolean)
      .join(", ") || "N/A";

  return (
    <>
      <section className="panel-section" id="movies">
        <div className="section-title-wrap">
          <h2 className="section-title">Now Showing</h2>
        </div>

        <div className="toolbar">
          <input
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          >
            <option value="all">All Genres</option>
            {genres.map((g) => (
              <option key={g._id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="movie-grid">
          {featuredMovies.length > 0 ? (
            featuredMovies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onSelect={setSelectedMovie}
                onWatchlist={addToWatchlist}
              />
            ))
          ) : (
            <p>No movies match your filters.</p>
          )}
        </div>
      </section>

      <section className="panel-section" id="movieDetails">
        <div className="details-card">
          <div className="details-info">
            {selectedMovie ? (
              <>
                <h3>{selectedMovie.title}</h3>
                <p><strong>Genre:</strong> {selectedGenres}</p>
                <p><strong>Year:</strong> {selectedMovie.releaseYear || "N/A"}</p>
                <p><strong>Director:</strong> {selectedMovie.director || "N/A"}</p>
                <p><strong>Description:</strong> {selectedMovie.description || "N/A"}</p>
              </>
            ) : (
              <h3>Select a movie ticket</h3>
            )}
          </div>
        </div>
      </section>

      <Reviews selectedMovie={selectedMovie} />

      <section className="panel-section" id="watchlist">
        <h2 className="section-title">Watchlist</h2>

        <div className="watchlist-tabs">
          {["want", "watching", "completed", "dropped"].map((s) => (
            <button
              key={s}
              className={tab === s ? "tab-btn active-tab" : "tab-btn"}
              onClick={() => setTab(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>

        <div className="watchlist-content">
          {filteredWatchlist.length > 0 ? (
            filteredWatchlist.map((entry) => (
              <div key={entry._id} className="watchlist-card">
                <h3>{entry.movieId?.title || "Untitled Movie"}</h3>

                <select
                  value={entry.status}
                  onChange={(e) =>
                    updateStatus(entry._id, e.target.value)
                  }
                >
                  <option value="want">Want</option>
                  <option value="watching">Watching</option>
                  <option value="completed">Completed</option>
                  <option value="dropped">Dropped</option>
                </select>

                <button
                  onClick={() => removeFromWatchlist(entry._id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No movies in this category.</p>
          )}
        </div>
      </section>
    </>
  );
}