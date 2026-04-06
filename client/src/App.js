import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Theater from "./components/Theater";
import AuthPage from "./components/AuthPage";
import "./MovieReview.css";

function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const syncUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", syncUser);
    window.addEventListener("focus", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={user ? <Theater /> : <Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <AuthPage />} />
    </Routes>
  );
}

export default App;