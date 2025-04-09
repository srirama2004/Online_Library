
import React, { useState } from "react";
import ReviewCard from "./ReviewCard";

const ReviewSection = ({ bookId, reviews, setReviews }) => {
  const [newReview, setNewReview] = useState({ rating: 0, text: "" });
  const [showModal, setShowModal] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const payload = {
      bookId,
      username: "Test",
      rating: newReview.rating,
      text: newReview.text,
    };

    try {
      const response = await fetch('http://localhost:5000/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to submit review');

      const updatedReviews = await response.json();
      setReviews(updatedReviews);
      setShowModal(false);
      setNewReview({ rating: 0, text: "" });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="reviews-section">
      <div className="review_header">
        <h4>Reviews</h4>
        {/* <div className="write-review">
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                type="button" 
                className="star-button"
                style={{color: num <= newReview.rating ? '#ffd700' : '#d3d3d3'}}
                onClick={() => {
                  setNewReview({...newReview, rating: num});
                  setShowModal(true);
                }}
              >
                {num <= newReview.rating ? '★' : '☆'}
              </button>
            ))}
          </div>
        </div> */}
      </div>

      {/* {showModal && (
        <div className="review-modal">
          <div className="modal-content">
            <textarea
              value={newReview.text}
              onChange={(e) => setNewReview({...newReview, text: e.target.value})}
              placeholder="Write your review here..."
            />
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleSubmitReview}>Submit</button>
            </div>
          </div>
        </div>
      )} */}

      <div className="reviews-container ">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;