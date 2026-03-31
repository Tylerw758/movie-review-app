import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import MovieList from "./MovieList";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Reviews from "./Reviews";
import Watchlist from "./Watchlist";
import AdminPanel from "./AdminPanel";

export default function Theater() {
  return (
    <>
      <Navbar />
      <Hero />
      <Login />
      <Dashboard />
      <MovieList />
      <Reviews />
      <Watchlist />
      <AdminPanel />
    </>
  );
}