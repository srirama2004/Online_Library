import React from 'react';
import './styles.css';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : 'empty'}`}
        >
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );

  return (
    <div className="review-card grid-layout">
      <div className="review-content">{review.text}</div>
      <div className="review-footer flipped">
      <div className="username">{review.username}</div>
        <div className="stars-section">{renderStars(review.rating)}</div>
        
      </div>
    </div>
  );
};

export default ReviewCard;
