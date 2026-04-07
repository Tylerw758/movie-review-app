import { useState } from "react";
import { loginUser, registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Login failed";
      alert(message);
    }
  };

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Please fill out all fields");
      return;
    }
    try {
      await registerUser({ username, password });
      alert("Account created! Please log in.");
      setIsLogin(true);
      setUsername("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const frames = Array.from({ length: 18 });

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--charcoal)",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Film strip - left */}
      <div style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "90px",
        height: "100vh",
        background: "var(--dark-brown)",
        borderRight: "3px solid var(--gold)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: "scrollDown 6s linear infinite",
        zIndex: 0,
      }}>
        {frames.map((_, i) => (
          <div key={i} style={{
            width: "60px",
            height: "60px",
            margin: "10px 0",
            border: "3px solid var(--gold)",
            borderRadius: "4px",
            background: i % 3 === 0
              ? "var(--burgundy)"
              : i % 3 === 1
              ? "var(--soft-red)"
              : "var(--dark-brown)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            opacity: 0.6,
          }}>
            {["🎬", "🎞", "🎭", "⭐", "🍿", "🎥"][i % 6]}
          </div>
        ))}
      </div>

      {/* Film strip - right */}
      <div style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "90px",
        height: "100vh",
        background: "var(--dark-brown)",
        borderLeft: "3px solid var(--gold)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation: "scrollUp 6s linear infinite",
        zIndex: 0,
      }}>
        {frames.map((_, i) => (
          <div key={i} style={{
            width: "60px",
            height: "60px",
            margin: "10px 0",
            border: "3px solid var(--gold)",
            borderRadius: "4px",
            background: i % 3 === 0
              ? "var(--dark-brown)"
              : i % 3 === 1
              ? "var(--burgundy)"
              : "var(--soft-red)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            opacity: 0.6,
          }}>
            {["🎥", "🍿", "⭐", "🎭", "🎞", "🎬"][i % 6]}
          </div>
        ))}
      </div>

      {/* Login/Register card */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "420px", padding: "0 20px" }}>
        <div className="form-card">

          {/* Logo */}
          <h1 style={{
            textAlign: "center",
            color: "var(--gold)",
            fontFamily: "Cinzel, serif",
            fontSize: "1.8rem",
            marginBottom: "6px",
          }}>
            🎬 The Theater
          </h1>
          <p style={{ textAlign: "center", color: "var(--cream)", marginBottom: "24px", fontSize: "0.9rem" }}>
            Your personal movie experience
          </p>

          {/* Tabs */}
          <div className="watchlist-tabs" style={{ justifyContent: "center", marginBottom: "20px" }}>
            <button
              className={isLogin ? "tab-btn active-tab" : "tab-btn"}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={isLogin ? "tab-btn" : "tab-btn active-tab"}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "12px", width: "100%" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "20px", width: "100%" }}
          />

          <button
            className="primary-btn"
            style={{ width: "100%" }}
            onClick={isLogin ? handleLogin : handleRegister}
          >
            {isLogin ? "Login" : "Register"}
          </button>

        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes scrollDown {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        @keyframes scrollUp {
          0%   { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}