import { useEffect, useState } from "react";
import axios from "axios";

const StarRating = ({ rating }) => {
  return (
    <div style={{ display: "flex", gap: "3px", margin: "6px 0" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: "1.1rem",
            color: i < rating ? "var(--gold)" : "#555",
          }}
        >
          {i < rating ? "★" : "☆"}
        </span>
      ))}
      <span style={{ fontSize: "0.85rem", color: "var(--cream)", marginLeft: "6px", alignSelf: "center" }}>
        {rating}/5
      </span>
    </div>
  );
};

export default function Reviews({ selectedMovie }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))?.username
  );
  const [currentRole, setCurrentRole] = useState(
    JSON.parse(localStorage.getItem("user"))?.role
  );

  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState("");
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("user"))?.username);
      setCurrentRole(JSON.parse(localStorage.getItem("user"))?.role);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!selectedMovie) return;
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/movies/${selectedMovie._id}/reviews`
        );
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [selectedMovie]);

  const submitReview = async () => {
    if (!comment) {
      alert("Fill out all fields");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5001/api/movies/${selectedMovie._id}/reviews`,
        { username: currentUser, rating, comment }
      );
      setReviews((prev) => [...prev, res.data]);
      setRating(5);
      setComment("");
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/movies/${selectedMovie._id}/reviews/${reviewId}`,
        { data: { username: currentUser } }
      );
      setReviews((prev) => prev.filter((rev) => rev._id !== reviewId));
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  };

  const editReview = async (reviewId) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/movies/${selectedMovie._id}/reviews/${reviewId}`,
        { username: currentUser, rating: editRating, comment: editComment }
      );
      setReviews((prev) =>
        prev.map((rev) => (rev._id === reviewId ? res.data : rev))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Error editing review:", err);
      alert("Failed to edit review");
    }
  };

  return (
    <section className="panel-section" id="reviews">
      <h2 className="section-title">Reviews</h2>

      {!selectedMovie ? (
        <p>Select a movie to see reviews</p>
      ) : (
        <>
          <div className="review-list">
            {reviews.length > 0 ? (
              reviews.map((rev, index) => (
                <div key={index} className="review-card">
                  {editingId === rev._id ? (
                    <>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={editRating}
                        onChange={(e) => setEditRating(e.target.value)}
                      />
                      <textarea
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                      />
                      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                        <button className="primary-btn" onClick={() => editReview(rev._id)}>Save</button>
                        <button className="secondary-btn" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3>{rev.username}</h3>
                      <StarRating rating={rev.rating} />
                      <p>{rev.comment}</p>
                      {(rev.username === currentUser || currentRole === "admin") && (
                        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                          <button
                            className="secondary-btn"
                            onClick={() => {
                              setEditingId(rev._id);
                              setEditRating(rev.rating);
                              setEditComment(rev.comment);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="small-btn"
                            onClick={() => deleteReview(rev._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          <div className="form-card" style={{ marginTop: "20px" }}>
            <h3>Write a Review</h3>
            {currentUser ? (
              <p>Posting as: <strong>{currentUser}</strong></p>
            ) : (
              <p style={{ color: "red" }}>You must be logged in to post a review.</p>
            )}
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <textarea
              placeholder="Your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="primary-btn" onClick={submitReview} disabled={!currentUser}>
              Submit Review
            </button>
          </div>
        </>
      )}
    </section>
  );
}