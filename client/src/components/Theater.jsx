import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import MovieList from "./MovieList";
import Dashboard from "./Dashboard";
import AdminPanel from "./AdminPanel";
import Footer from "./Footer";
export default function Theater() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />
      <Hero />
      <Dashboard />
      <MovieList />
      {user?.role === "admin" && <AdminPanel />}
      <Footer />
    </>
  );
}
