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
      navigate("/"); // ✅ redirect to main app after login
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
      setIsLogin(true); // switch to login tab
      setUsername("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center" 
    }}>
      <section className="panel-section">
        <div className="form-card">

          {/* Toggle tabs */}
          <div className="watchlist-tabs" style={{ marginBottom: "20px", justifyContent: "center" }}>
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
            {isLogin ? "Login" : "Register"}
          </h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={isLogin ? handleLogin : handleRegister}
          >
            {isLogin ? "Login" : "Register"}
          </button>

        </div>
      </section>
    </div>
  );
}