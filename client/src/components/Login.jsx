import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("token", res.data.token);
      alert("Logged in!");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <section className="panel-section" id="login">
      <div className="form-card">
        <h2>Login</h2>

        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </section>
  );
}