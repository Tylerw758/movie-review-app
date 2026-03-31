export default function Navbar() {
  return (
    <header className="site-header">
      <div className="header-left">
        <h1 className="logo">🎟 MovieReview Theater</h1>
        <p className="tagline">Classic reviews. Cozy cinema vibes.</p>
      </div>

      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#movies">Movies</a>
        <a href="#reviews">Reviews</a>
        <a href="#watchlist">Watchlist</a>
        <a href="#admin">Admin</a>
      </nav>
    </header>
  );
}