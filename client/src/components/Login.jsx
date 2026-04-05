import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ Manually fire storage event so Reviews.jsx picks up the new user
      window.dispatchEvent(new Event("storage"));

      console.log("Logged in user:", res.data);
      alert("Logged in!");
    } catch (err) {
      console.error("Login error", err);
      const message =
        err.response?.data?.message || err.message || "Login failed";
      alert(message);
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