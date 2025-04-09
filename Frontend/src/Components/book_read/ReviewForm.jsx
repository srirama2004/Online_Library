import React, { useState } from "react";
import "./styles.css";

const ReviewForm = ({ bookid }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const name = localStorage.getItem('userEmail').split('@')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/reviews/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bookid,
          username: name, 
          rating: rating,
          text: text,
        }),
      });

      const data = await response.json();
      console.log("Review submitted. All reviews:", data);
      
      
      setText("");
      setRating(0);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2 className="review-form-title">Leave a Review</h2>

      <textarea
        className="review-textarea"
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              className={`star ${starValue <= (hover || rating) ? "filled" : ""}`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          );
        })}
      </div>

      <button type="submit" className="submit-button">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
