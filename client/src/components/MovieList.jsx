import { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [tab, setTab] = useState("want");

  useEffect(() => {
    const fetchMovies = async () => {
      try{
      const res = await getMovies();
      setMovies(res.data);
      }catch (err) {
        console.error("Error loading movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "all" || movie.genres?.includes(genre);
    return matchesSearch && matchesGenre;
  });

  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m._id === movie._id)) {
      setWatchlist([...watchlist, { ...movie, status: "want" }]);
      alert(`${movie.title} added to watchlist`);
    }
  };

  const displayedWatchlist = watchlist.filter((m) =>
    tab === "want" ? m.status === "want" : m.status === "watched"
  );

  return (
    <>
      {/* MOVIES SECTION */}
      <section className="panel-section" id="movies">
        <div className="section-title-wrap">
          <h2 className="section-title">Now Showing</h2>
        </div>

        {/* SEARCH + FILTER */}
        <div className="toolbar">
          <input
            placeholder="Search movies..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setGenre(e.target.value)}>
            <option value="all">All Genres</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Romance">Romance</option>
            <option value="Western">Romance</option>
            <option value="Short">Romance</option>
          </select>
        </div>

        {/* MOVIE GRID */}
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onSelect={setSelectedMovie}
              onWatchlist={addToWatchlist}
            />
          ))}
        </div>
      </section>

      {/* MOVIE DETAILS */}
      <section className="panel-section" id="movieDetails">
        <div className="details-card">
          <div className="details-poster">🎞</div>

          <div className="details-info">
            {selectedMovie ? (
              <>
                <h3>{selectedMovie.title}</h3>
                <p><strong>Genre:</strong> {selectedMovie.genres?.join(", ")}</p>
                <p><strong>Year:</strong> {selectedMovie.year}</p>
                <p><strong>Rating:</strong> {selectedMovie.imdb?.rating}</p>
              </>
            ) : (
              <h3>Select a movie ticket</h3>
            )}
          </div>
        </div>
      </section>

      {/* WATCHLIST */}
      <section className="panel-section" id="watchlist">
        <h2 className="section-title">Watchlist</h2>

        <div className="watchlist-tabs">
          <button onClick={() => setTab("want")}>Want</button>
          <button onClick={() => setTab("watched")}>Watched</button>
        </div>

        <div className="watchlist-content">
          {displayedWatchlist.map((movie) => (
            <div key={movie._id} className="watchlist-card">
              <h3>{movie.title}</h3>
              <p>Status: {movie.status}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}