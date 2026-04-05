import { useEffect, useState } from "react";
import axios from "axios";

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
  // Edit state
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

  // Fetch reviews when a movie is selected
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

  // Submit review
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

  // Delete review
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

  // Edit review
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
          {/* Existing Reviews */}
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
                      <button onClick={() => editReview(rev._id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <h3>{rev.username}</h3>
                      <p><strong>Rating:</strong> {rev.rating}/5</p>
                      <p>{rev.comment}</p>
                      {(rev.username === currentUser || currentRole === "admin") && (
                        <>
                          <button onClick={() => {
                            setEditingId(rev._id);
                            setEditRating(rev.rating);
                            setEditComment(rev.comment);
                          }}>
                            Edit
                          </button>
                          <button onClick={() => deleteReview(rev._id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {/* Add Review */}
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