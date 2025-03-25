import React from "react";
import { Button, Nav } from "react-bootstrap";
import "./Menu.css";
import bgImage from "../Components/libb1.jpg";
import { useNavigate } from "react-router-dom"; 
function Menu({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate(); 
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay">
        <Nav className="ms-auto">
          <Button className="auth-btn"onClick={() => navigate("/signin")}>Login</Button>
          <Button className="auth-btn"onClick={() => navigate("/signup")}>Sign Up</Button>
        </Nav>
      </div> 
      {/* Search Section */}
      <div className="search-container">
        <h1 className="library-heading">ONLINE LIBRARY</h1>
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
