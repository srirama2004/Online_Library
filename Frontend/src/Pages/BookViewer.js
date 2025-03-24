import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./BookViewer.css"; // Ensure CSS file is updated
import bookCover from "../Components/g1.jpg"; // Example book image
import { useNavigate } from "react-router-dom"; 
const BookViewer = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(18); // Default font size
  const bookContainerRef = useRef(null);
const navigate = useNavigate(); 
  // Apply dark mode styling to body
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      bookContainerRef.current.requestFullscreen().catch(err => {
        console.log("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className={`book-viewer ${isDarkMode ? "dark-mode" : "light-mode"}`} ref={bookContainerRef}>
      {/* Fixed Header Buttons */}
      <div className="top-bar">
        <Button variant="secondary" className="back-btn" onClick={() => navigate("/profile")}>← Back</Button>
        <div className="right-buttons">
          <Button variant="secondary" onClick={() => setFontSize(fontSize + 2)}>➕</Button>
          <Button variant="secondary" onClick={() => setFontSize(fontSize > 14 ? fontSize - 2 : 14)}>➖</Button>
          <Button variant="secondary" onClick={toggleFullScreen}>⛶ Full Screen</Button>
          <Button 
            variant="secondary" 
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </Button>
        </div>
      </div>

      {/* Scrollable Book Content */}
      <div className="book-container">
        <Container className="book-content">
          <h1 className="book-title">The Lost Kingdom</h1>
          <img src={bookCover} alt="Book Cover" className="book-cover" />
          
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <p className="book-text" style={{ fontSize: `${fontSize}px` }}>
                The sun was setting beyond the ancient ruins of Eldoria, painting the sky in hues of orange and purple. 
                A lone traveler, cloaked in a deep blue robe, approached the forgotten gates. The wind howled through 
                the empty archways, whispering secrets of the past. Every step he took echoed against the stone walls, 
                as if the ghosts of history were watching.
              </p>

              <p className="book-text" style={{ fontSize: `${fontSize}px` }}>
                Deep inside the ruined city, the traveler uncovered a hidden chamber beneath the palace. The air was thick 
                with dust and mystery. On the walls, inscriptions in an ancient language hinted at a forgotten power. He 
                traced his fingers over the carvings, feeling a strange warmth beneath them. A moment later, a golden light 
                illuminated the room, revealing a hidden door.
              </p>

              <p className="book-text" style={{ fontSize: `${fontSize}px` }}>
                As he stepped through, a magnificent sight unfolded before him. A vast underground city lay hidden beneath 
                the ruins, untouched by time. Towers of crystal and silver stretched toward the ceiling, glowing softly. 
                The traveler knew he had uncovered something extraordinary—an entire civilization lost to history.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BookViewer;
