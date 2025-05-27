import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(false); // initially false
  const [books, setBooks] = useState([]);
  const [booksByCategory, setBooksByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmail] = useState(null);

  const checkInAndUpdateStreak = useCallback(async (email) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(`https://readlybackend.vercel.app/checkins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, date: today })
      });

      const data = await response.json();
      console.log('Check-in Response:', data);
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      checkInAndUpdateStreak(email);
    }
  }, [checkInAndUpdateStreak]);

  useEffect(() => {
    fetch("https://readlybackend.vercel.app/books/all")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching top books:", err));
  }, []);

  useEffect(() => {
    fetch(`https://readlybackend.vercel.app/books/${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setBooksByCategory(data))
      .catch((err) => console.error(`Error fetching books for ${selectedCategory}:`, err));
  }, [selectedCategory]);

  const filteredBooks = searchQuery
    ? books.filter(
        (book) =>
          book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : booksByCategory;

  const handleBookClick = (bookId) => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      navigate(`/book/${bookId}`);
    } else {
      navigate("/signin");
    }
  };

  // Show Splash only once
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 2000);
    }
  }, []);

  return (
    <>
      {showSplash ? (
        <div className="splash-screen">
          <img src="https://i.ibb.co/Nfvt492/Readly.png" alt="Readly Logo" className="splash-logo" />
        </div>
      ) : (
        <>
          <Menu searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="home-hero">
            <Container fluid className="home-container text-center">
              {!searchQuery && (
                <>
                  <div className="book-carousel">
                    <p className="carousel-title">Popular Books</p>
                    <Slider
                      centerMode={true}
                      centerPadding="0"
                      slidesToShow={5}
                      infinite={true}
                      speed={500}
                      arrows={true}
                      autoplay={true}
                      autoplaySpeed={2000}
                    >
                      {books.map((book, idx) => (
                        <div
                          key={idx}
                          className="carousel-item"
                          onClick={() => handleBookClick(book.bookId)}
                        >
                          <img
                            src={book.image}
                            alt={`Book ${idx + 1}`}
                            className="book-image"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>

                  <div className="mt-4">
                    {["General", "Drama", "Horror", "Thriller", "Fantasy", "Romantic"].map(
                      (category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "primary" : "dark"}
                          className="mx-2"
                          onClick={() => {
                            setSelectedCategory(category);
                            setSearchQuery("");
                          }}
                        >
                          {category}
                        </Button>
                      )
                    )}
                  </div>
                </>
              )}

              <Row className="mt-4">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <Col key={book._id} md={4} className="mb-4">
                      <Card
                        className="books1-card"
                        onClick={() => handleBookClick(book.bookId)}
                      >
                        <Card.Img
                          variant="top"
                          src={book.image}
                          className="book-image"
                        />
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p className="no-books">No books found.</p>
                )}
              </Row>
            </Container>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
