import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {!token && <Link to="/login">Login</Link>}
      {!token && <Link to="/register">Register</Link>}
      {token && <button onClick={handleLogout}>Logout</button>}
      {localStorage.getItem("role") === "admin" && <Link to="/admin">Admin</Link>}
    </nav>
  );
}