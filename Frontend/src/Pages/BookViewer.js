import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";
import "./BookViewer.css";
import Menum from "./Menum";
const BookViewer = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(18);
  const [book, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // 📄 track which page
  const bookContainerRef = useRef(null);
  const navigate = useNavigate();
 const { userId, bookId1 } = useParams();
  const wordsPerPage = 100; // 📄 words you want per "page"
const bookId=2;
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log(userId,bookId);
        const response = await axios.get(`http://localhost:5000/bookc/${bookId}`);
        setBook(response.data);
       
      } catch (error) {
        console.error("Error fetching book content:", error);
      }
    };

    fetchBook();
  }, [bookId]);

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

  // 🧠 Split abstract into words
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
  
      {/* Added a wrapper div with margin */}
      <div style={{ marginTop: "80px" }}>  
        <div className={`book-viewer ${isDarkMode ? "dark-mode" : "light-mode"}`} ref={bookContainerRef}>
          {/* Top Bar */}
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
  
          {/* Book Content */}
          <div className="book-container">
            <Container className="book-content">
              <h1 className="book-title">{book.bookId}</h1>
              
              <Row>
                <Col md={{ span: 8, offset: 2 }}>
                  <p className="book-text" style={{ fontSize: `${fontSize}px` }}>
                    {getCurrentPageText()}
                  </p>
  
                  {/* Pagination */}
                  <div className="pagination-controls">
                    <Button variant="secondary" onClick={goToPrevPage} disabled={currentPage === 0}>
                      ⬅️ Previous
                    </Button>
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <Button variant="secondary" onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
                      Next ➡️
                    </Button>
                  </div>
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
