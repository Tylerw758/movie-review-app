import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import MovieList from "./MovieList";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AdminPanel from "./AdminPanel";
import Register from "./Register";

export default function Theater() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <Hero />
      <Register />
      <Login />
      <Dashboard />
      <MovieList />
      {user?.role === "admin" && <AdminPanel />}
    </>
  );
}
