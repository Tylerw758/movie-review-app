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
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}