import { Routes, Route, Navigate } from "react-router-dom";
import Theater from "./components/Theater";
import AuthPage from "./components/AuthPage";
import "./MovieReview.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      {/* If not logged in, redirect to /login */}
      <Route path="/" element={user ? <Theater /> : <Navigate to="/login" />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
}

export default App;