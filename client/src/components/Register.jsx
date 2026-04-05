import React, { useState } from "react";
import { registerUser } from "../services/api"; 

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({ username, password });
      alert("User created! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

return (
  <section className="panel-section" id="register">
    <div className="form-card">
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="primary-btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  </section>
);
}