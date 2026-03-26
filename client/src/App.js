import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div style={{color: "red"}}>Hello World!</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;