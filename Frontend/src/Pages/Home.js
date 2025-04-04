import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Menu from "./Menu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [books, setTopBooks] = useState([]);
  const [booksByCategory, setBooksByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/books/all")
      .then((res) => res.json())
      .then((data) => setTopBooks(data))
      .catch((err) => console.error("Error fetching top books:", err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/books/${selectedCategory}`)
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


  return (
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
                    <div key={idx} className="carousel-item" onClick={() => navigate("/book/1")}>
                      <img src={book.image} alt={`Book ${idx + 1}`} className="book-image" />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="mt-4">
                {["General", "Drama", "Horror", "Thriller", "Fantasy", "Romantic"].map((category) => (
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
                ))}
              </div>
            </>
          )}
          <Row className="mt-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <Col key={book._id} md={4} className="mb-4">
                  <Card className="books1-card" onClick={() => navigate(`/book/${book.bookId}`)}>
                    <Card.Img variant="top" src={book.image} className="book-image" />
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
  );
}

export default Home;
