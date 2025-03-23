import React, { useState } from "react";
import { useParams } from "react-router-dom";
import books from "./book.json"; // Import JSON file directly
import "./styles.css";
import ReviewCard from "./ReviewCard";

const BookReview = () => {
  const { id } = useParams(); // Get book ID from URL params
  const book = books.find((b) => b._id === id);
  const [newReview, setNewReview] = useState({ rating: 0, text: "" });
  const [showModal, setShowModal] = useState(false);
  console.log(id);
  
  if (!book) return <p>Book not found</p>;

  const averageRating = book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the review
    console.log("New review:", newReview);
    setShowModal(false);
  };

  const handleButtonClick = () => {
    if (book.price === "Free") {
   
      console.log("Opening book to read");
    } else {
      
      console.log("Proceeding to purchase for", book.price);
    }
  };

  return (
    <div className="book_container">
      <div className="book_image">
        <img
          src="https://placehold.co/300x450"
          alt="Book cover"
          className="book_cover"
        />
        <div className="book_info">
          <div>
            <h1 className="book_title">{book.title}</h1>
            <h3 className="book_author">By {book.author}</h3>
            <div className="book_rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star ${star <= averageRating ? 'filled' : 'empty'}`}
                  >
                    {star <= averageRating ? '★' : '☆'}
                  </span>
                ))}
                <span className="rating-number">({averageRating.toFixed(1)})</span>
              </div>
            </div>
          </div>
          <button className="book_wishlist">❤️</button>
        </div>
        <div className="book_button">
          <button 
            className={book.price === "Free" ? "read-button" : "buy-button"}
            onClick={handleButtonClick}
          >
            {book.price === "Free" ? (
              <>Read Now</>
            ) : (
              <>Buy for {book.price}</>
            )}
          </button>
        </div>
      </div>
    
      <div className="book_details">
        <h4>Abstract</h4>
        <div className="abstract">
          {book.summary}
        </div>
        <br></br>
        <div className="review_header">
        <h4>Reviews</h4>
        <div className="write-review">
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
        </div>
      </div>
        {showModal && (
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
        )}
        
      
       

        <div className="reviews-container">
          {book.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookReview;
