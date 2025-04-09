import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BookViewer.css";
import Menum from "./Menum";
import ReviewForm from "../Components/book_read/ReviewForm";

const BookViewer = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [book, setBook] = useState(null);
  const [ownsBook, setOwnsBook] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const bookContainerRef = useRef(null);
  const navigate = useNavigate();
  const { bookId } = useParams();
  const userId = localStorage.getItem('userId'); 

  const wordsPerPage = 100;

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/bookc/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book content:", error);
      }
    };
  
    const checkOwnership = async () => {
      try {
        const res = await fetch(`http://localhost:5000/rzpay/check/${userId}/${bookId}`);
        const data = await res.json();
  
        if (!data.owns) {
          navigate(`/book/${bookId}`); 
        } else {
          setOwnsBook(true);
        }
      } catch (err) {
        console.error("Error checking ownership:", err);
      }
    };
  
    checkOwnership();
    fetchBook();
  }, [bookId, userId, navigate]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      bookContainerRef.current.requestFullscreen().catch(err => {
        console.log("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (!book) {
    return <div>Loading book content...</div>;
  }

  const words = book.abstract.split(" ");
  const totalPages = Math.ceil(words.length / wordsPerPage);

  const getCurrentPageText = () => {
    const start = currentPage * wordsPerPage;
    const end = start + wordsPerPage;
    return words.slice(start, end).join(" ");
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Menum />
      <div style={{ marginTop: "80px" }}>
        <div className={`book-viewer ${isDarkMode ? "dark-mode" : "light-mode"}`} ref={bookContainerRef}>
          <div className="top-bar">
            <div className="right-buttons">
              <Button variant="secondary" onClick={() => setFontSize(fontSize + 2)}>➕</Button>
              <Button variant="secondary" onClick={() => setFontSize(fontSize > 14 ? fontSize - 2 : 14)}>➖</Button>
              <Button variant="secondary" onClick={toggleFullScreen}>⛶ Full Screen</Button>
              <Button variant="secondary" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
              </Button>
            </div>
          </div>

          <div className="book-container">
            <Container className="book-content">
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  <p className="book-text" style={{ fontSize: `${fontSize}px` }}>
                    {getCurrentPageText()}
                  </p>

                  <div className="pagination-controls">
                    <Button variant="secondary" onClick={goToPrevPage} disabled={currentPage === 0}>
                      ⬅️ Previous
                    </Button>
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <Button variant="secondary" onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
                      Next ➡️
                    </Button>
                  </div>

                  {/* ✅ Only show if user owns book AND is on last page */}
                  { currentPage === totalPages - 1 && (
                    <ReviewForm bookid={bookId} />
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookViewer;
