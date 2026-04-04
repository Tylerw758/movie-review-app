import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import MovieList from "./MovieList";
import Login from "./Login";
import Dashboard from "./Dashboard";

import AdminPanel from "./AdminPanel";

export default function Theater() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <Hero />
      <Login />
      <Dashboard />
      <MovieList />
      {user?.role === "admin" && <AdminPanel />}
    </>
  );
}
