import React, { useState, useEffect } from "react";
import { Button, Nav } from "react-bootstrap";
import "./Menu.css";
import bgImage from "../Components/libb1.jpg";
import { useNavigate } from "react-router-dom"; 

function Menu({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    setUserEmail(null);
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile'); 
  };

  return (
    <div className="hero-section" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay">
        <Nav className="justify-content-end p-3">
          {userEmail ? (
            <div className="d-flex align-items-center gap-3" style={{ marginTop: '30px' }}>
              {/* Clickable Email */}
              <span
                onClick={handleProfileClick}
                style={{ 
                  cursor: 'pointer', 
                  color: 'white', 
                  fontWeight: 'bold', 
                  textDecoration: 'underline' 
                }}
              >
                {userEmail}
              </span>

              {/* Logout Button */}
              <Button variant="danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button href="/signin" className="auth-btn">Sign In</Button>
          )}
        </Nav>
      </div>

      {/* Search Section */}
      <div className="search-container">
        <h1 className="library-heading">ONLINE LIBRARY</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn">Search</button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
