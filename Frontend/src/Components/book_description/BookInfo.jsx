import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import ReviewCard from "./ReviewCard";


const BookReview = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [newReview, setNewReview] = useState({ rating: 0, text: "" });
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:5000/books/get/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("New review:", newReview);
    setShowModal(false);
  };

  const handleButtonClick = () => {
    if (book?.price === 0) {
      console.log("Opening book to read");
    } else {
      console.log("Proceeding to purchase for", book?.price);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found</p>;

  const averageRating =
    book.reviews?.length > 0
      ? book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length
      : 0;

  return (
    <div className="book_container">
      <div className="book_image">
        <img
          src={book.image}
          alt="Book cover"
          className="book_cover"
        />
        <div className="book_info">
          <div className="book_sub_info_1">
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
        <div className="book_button" onClick={() => navigate("/bookviewer")}>
          <button 
            className={book.price === "Free" ? "read-button" : "buy-button"}
            onClick={handleButtonClick}
          >
            {book.price === 0 ? (
              <>Read Now</>
            ) : (
              <>Buy for {book.price}</>
            )}
          </button>
        </div>
      </div>

      <div className="book_details">
        <h4>Abstract</h4>
        <div className="abstract" style={{ textAlign: "justify" }}>
          {book.abstract}
        </div>
        <br />
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
          {book.reviews?.length > 0 ? (
            book.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookReview;
