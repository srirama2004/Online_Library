import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import ReviewSection from "./ReviewSection";

const BookReview = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
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

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/reviews/get/${id}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchBook();
    fetchReviews();
  }, [id]);

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
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
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
        <ReviewSection bookId={id} reviews={reviews} setReviews={setReviews} />
      </div>
    </div>
  );
};

export default BookReview;
