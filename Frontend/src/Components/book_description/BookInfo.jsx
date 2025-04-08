import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import ReviewSection from "./ReviewSection";
import RazorpayButton from "./RazorPayButton";
import WishlistButton from "./WishlistButton";
import ReadNowButton from "./ReadNowButton";

const BookReview = () => {

  // const userId = "123"; // Replace this with actual logged-in user ID
  const userId = localStorage.getItem("userId");


  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  const [ownsBook, setOwnsBook] = useState(false); // ✅ Check ownership
  

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


    const checkOwnership = async () => {
      try {
        const res = await fetch(`http://localhost:5000/rzpay/check/${userId}/${id}`);
        const data = await res.json();
        setOwnsBook(data.owns);
      } catch (err) {
        console.error("Error checking ownership:", err);
      }
    };

    checkOwnership();
    fetchBook();
    fetchReviews();
  }, [id]);

  const handleButtonClick = () => {
    if (book?.price === 0 || ownsBook) {
      navigate("/bookviewer"); // ✅ Allow read
    } else {
      console.log("Proceeding to purchase for", book?.price);
      // open Razorpay flow or go to checkout
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
          <WishlistButton userId={userId} bookId={id} />      
            </div>
        <div className="book_button">
         
            {(book.price === 0 || ownsBook )? (
              < ReadNowButton userId={userId} bookId={id} /> 
            ) : (
              <RazorpayButton amount={book.price} bookId={id} user={{
                id: userId}} onSuccess={handleButtonClick} ></RazorpayButton>
            )}
         
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
