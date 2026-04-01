export default function Navbar() {

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out");

    // optional refresh so UI updates
    window.location.reload();
  };

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

        {/* Show logout only if user is logged in */}
        {user && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
        
      </nav>
    </header>
  );
}