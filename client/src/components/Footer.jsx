export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Film strip decoration */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        marginBottom: "20px",
        overflowX: "hidden",
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            minWidth: "40px",
            height: "30px",
            border: "2px solid var(--gold)",
            borderRadius: "3px",
            background: i % 2 === 0 ? "var(--burgundy)" : "var(--dark-brown)",
            opacity: 0.7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem",
          }}>
            {["🎬", "🎞", "⭐", "🍿"][i % 4]}
          </div>
        ))}
      </div>

      <h2 style={{
        fontFamily: "Cinzel, serif",
        color: "var(--gold)",
        fontSize: "1.5rem",
        marginBottom: "8px",
      }}>
        🎬 The Theater
      </h2>

      <p style={{ color: "var(--cream)", fontSize: "0.9rem", marginBottom: "6px" }}>
        Your personal movie experience
      </p>

      <p style={{ color: "#a89070", fontSize: "0.8rem" }}>
        © {year} The Theater. All rights reserved.
      </p>
    </footer>
  );
}