import React, { useState } from "react";
import Slider from "react-slick";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import Menu from "./Menu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import g1 from "../Components/g1.jpg";
import g2 from "../Components/g2.jpg";
import g3 from "../Components/g3.jpg";
import h1 from "../Components/h1.jpg";
import h2 from "../Components/h2.jpg";
import r1 from "../Components/r1.jpg";
import r2 from "../Components/r2.jpg";
import d1 from "../Components/d1.jpg";
import d2 from "../Components/d2.jpg";
import f1 from "../Components/f1.jpg";
import f2 from "../Components/f2.jpg";
import t1 from "../Components/t1.jpg";
import t2 from "../Components/t2.png";
import { useNavigate } from "react-router-dom"; 
function Home() {
  const books = [g1, f2, t1, g3, h1, d1];
  const navigate = useNavigate(); 
  // Category-based book data
  const bookCategories = {
    General: [
      { image: g1, title: "General Book 1", description: "A great general book1." },
      { image: g2, title: "General Book 2", description: "Another general book2." },
      { image: g3, title: "General Book 3", description: "Another general book3." },
      { image: d2, title: "Drama Book 2", description: "A powerful drama novel2." },
      { image: h1, title: "Horror Book 1", description: "A terrifying horror tale1." },
      { image: t2, title: "Thriller Book 2", description: "A gripping mystery2." },
    ],
    Drama: [
      { image: d1, title: "Drama Book 1", description: "A deep emotional story1." },
      { image: d2, title: "Drama Book 2", description: "A powerful drama novel2." },
    ],
    Horror: [
      { image: h1, title: "Horror Book 1", description: "A terrifying horror tale1." },
      { image: h2, title: "Horror Book 2", description: "A spine-chilling horror story2." },
    ],
    Thriller: [
      { image: t1, title: "Thriller Book 1", description: "A suspenseful thriller1." },
      { image: t2, title: "Thriller Book 2", description: "A gripping mystery2." },
    ],
    Fantasy: [
      { image: f1, title: "Fantasy Book 1", description: "A magical adventure1." },
      { image: f2, title: "Fantasy Book 2", description: "A world of wonder and magic2." },
    ],
    Romantic: [
      { image: r1, title: "Romantic Book 1", description: "A heartwarming love story1." },
      { image: r2, title: "Romantic Book 2", description: "A tale of love and passion2." },
    ],
  };

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState("General");

  // **Global Search State**
  const [searchQuery, setSearchQuery] = useState("");

  // Get books based on the selected category
  const books1 = bookCategories[selectedCategory];

  // Get all books from all categories for searching
  const allBooks = Object.values(bookCategories).flat();

  // Filter books based on the search query
  const filteredBooks = searchQuery
    ? allBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : books1;

  return (
    <>
      {/* Pass search state and setter to Menu.js */}
      <Menu searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="home-hero">
        <Container fluid className="home-container text-center">
          {/* Hide Carousel & Categories when searching */}
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
                      <img src={book} alt={`Book ${idx + 1}`} className="book-image" />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Category Buttons */}
              <div className="mt-4">
                {Object.keys(bookCategories).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "primary" : "dark"}
                    className="mx-2"
                    onClick={() => {
                      setSelectedCategory(category);
                      setSearchQuery(""); // Reset search when category changes
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </>
          )}
          {/* Display Books as Separate Cards Below */}
          <Row className="mt-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, idx) => (
                <Col key={idx} md={4} className="mb1-4">
                  <Card className="books1-card" onClick={() => navigate("/book/1")}>
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