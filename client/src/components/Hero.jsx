export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <h2>Welcome to the Theater</h2>
        <p>
          Discover films, read reviews, and save your favorites like a stack of vintage movie tickets.
        </p>
        <button className="primary-btn">Now Showing</button>
      </div>
    </section>
  );
}

<button
  className="primary-btn"
  onClick={() =>
    document
      .getElementById("movies")
      .scrollIntoView({ behavior: "smooth" })
  }
>
  Now Showing
</button>