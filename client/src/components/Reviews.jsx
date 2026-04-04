import { useEffect, useState } from "react";
import axios from "axios";

export default function Reviews({ selectedMovie }) {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

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
    console.log("Submitting review:");
    if (!username || !comment) {
      alert("Fill out all fields");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5001/api/movies/${selectedMovie._id}/reviews`,
        {
          username,
          rating,
          comment,
        }
      );

      // Update UI instantly
      setReviews((prev) => [...prev, res.data]);

      // Reset form
      setUsername("");
      setRating(5);
      setComment("");
    } catch (err) {
      console.error("Error submitting review:", err);
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
                  <h3>{rev.username}</h3>
                  <p><strong>Rating:</strong> {rev.rating}/5</p>
                  <p>{rev.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {/* Add Review */}
          <div className="form-card" style={{ marginTop: "20px" }}>
            <h3>Write a Review</h3>

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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

            <button className="primary-btn" onClick={submitReview}>
              Submit Review
            </button>
          </div>
        </>
      )}
    </section>
  );
}