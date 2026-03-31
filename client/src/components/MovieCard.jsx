export default function MovieCard({ movie, onSelect, onWatchlist }) {
  return (
    <div className="movie-ticket">
      <div className="ticket-left">
        <span className="ticket-stamp">NOW SHOWING</span>
        <div className="poster-placeholder">🎬</div>
      </div>

      <div className="ticket-divider"></div>

      <div className="ticket-right">
        <h3>{movie.title}</h3>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Year:</strong> {movie.year}</p>

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