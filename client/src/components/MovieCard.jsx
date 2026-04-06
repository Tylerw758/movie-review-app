export default function MovieCard({ movie, onSelect, onWatchlist }) {
  const genreNames =
    movie.genreIds?.map((genre) => genre?.name).filter(Boolean).join(", ") || "N/A";

  return (
    <div className="movie-ticket">
      <div className="ticket-left">
        <span className="ticket-stamp">NOW SHOWING</span>

        {movie.posterUrl && movie.posterUrl !== "image" ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="poster-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/movie-placeholder.png";
            }}
          />
        ) : (
          <div className="poster-placeholder">🎬</div>
        )}
      </div>

      <div className="ticket-divider"></div>

      <div className="ticket-right">
        <h3>{movie.title}</h3>
        <p><strong>Genre:</strong> {genreNames}</p>
        <p><strong>Year:</strong> {movie.releaseYear || "N/A"}</p>

        <div className="ticket-button-row">
          <button
            className="small-btn"
            onClick={() => {
              onSelect(movie);
              document
                .getElementById("movieDetails")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Details
          </button>

          <button
            className="small-btn"
            onClick={() => onWatchlist(movie)}
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}