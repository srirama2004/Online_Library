import React from "react";
import { Button, Nav } from "react-bootstrap";
import "./Menu.css";
import bgImage from "../Components/libb1.jpg";

function Menu({ searchQuery, setSearchQuery }) {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay">
        <Nav className="ms-auto">
          <Button className="auth-btn">Login</Button>
          <Button className="auth-btn">Sign In</Button>
        </Nav>
      </div>
      
      {/* Search Section */}
      <div className="search-container">
        <h1 className="library-heading">LIBRARY SEARCH</h1>
        <div className="search-bar">
          <input
            type="text"
            className="form-control w-50 mx-2"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update state
          />
          <button className="btn btn-dark" style={{ color: "white" }}>Search</button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
