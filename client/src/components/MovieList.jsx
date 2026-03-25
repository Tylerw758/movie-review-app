import React, { useState, useEffect } from "react";
import { getMovies } from "./services/api";
import { Link } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies();
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}