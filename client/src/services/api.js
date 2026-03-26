import axios from "axios";

const API_URL = "http://localhost:5000"; 

// Auth
export const loginUser = (credentials) =>
  axios.post(`${API_URL}/auth/login`, credentials);

export const registerUser = (credentials) =>
  axios.post(`${API_URL}/auth/register`, credentials);

// Movies
export const getMovies = () =>
  axios.get(`${API_URL}/movies`);

export const getMovieById = (id) =>
  axios.get(`${API_URL}/movies/${id}`);

export const createMovie = (movie, token) =>
  axios.post(`${API_URL}/movies`, movie, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateMovie = (id, movie, token) =>
  axios.put(`${API_URL}/movies/${id}`, movie, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteMovie = (id, token) =>
  axios.delete(`${API_URL}/movies/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });