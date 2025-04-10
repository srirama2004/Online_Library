import React, { useState } from "react";
import "./styles.css";

const ReviewForm = ({ bookid }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const name = localStorage.getItem('userEmail')?.split('@')[0];
  const email=localStorage.getItem('userEmail');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Submit the review
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

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const data = await response.json();
      console.log("Review submitted. All reviews:", data);

      // 2. Delete only from currentRead
      const deleteCurrentRead = await fetch(`http://localhost:5000/currentRead/delete/${email}/${bookid}`, {
        method: "DELETE",
      });

      if (!deleteCurrentRead.ok) {
        throw new Error("Failed to delete from currentRead");
      }
      console.log(`Book ID ${bookid} deleted from currentRead`);

      // 3. Clear the form
      setText("");
      setRating(0);
      setMessage("Review submitted and removed from Current Reads!");
      
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
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

      {/* Show success or error message */}
      {message && <p className="form-message">{message}</p>}
    </form>
  );
};

export default ReviewForm;
