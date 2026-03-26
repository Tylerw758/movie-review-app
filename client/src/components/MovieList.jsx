import React, { useEffect, useState } from "react";
import { getMovies } from "../services/api";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await getMovies();
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies List</h1>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}