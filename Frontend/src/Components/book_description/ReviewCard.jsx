import React from 'react';
import './styles.css';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`star ${star <= rating ? 'filled' : 'empty'}`}
          >
            {star <= rating ? '★' : '☆'}
          </span>
        ))}
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="user-rating-line">
            <span className="username">{review.username}</span>
            {renderStars(review.rating)}
          </div>
        </div>
      </div>
      <div className="review-content">
        {review.text}
      </div>
    </div>
  );
};

export default ReviewCard; 