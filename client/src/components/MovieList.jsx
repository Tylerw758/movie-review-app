import React, { useEffect, useState } from "react";
import { getMovies } from "../services/api";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
  async function fetchMovies() {
    try {
      const res = await getMovies();
      console.log("DATA FROM BACKEND:", res.data); 
      setMovies(res.data);
    } catch (err) {
      console.error("ERROR:", err);
    }
  }
  fetchMovies();
}, []);

return (
  <div>
    <h1>Movies List</h1>
    <pre>{JSON.stringify(movies, null, 2)}</pre>
  </div>
);
/*
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
*/}
