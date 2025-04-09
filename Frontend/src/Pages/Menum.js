import React, { useState, useEffect } from "react";
import { Button, Nav } from "react-bootstrap";
import "./Menum.css";
import bgImage from "../Components/libb1.jpg";
import { useNavigate } from "react-router-dom"; 

function Menum({ searchQuery, setSearchQuery }) {
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
    <div className="hero-section1" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay">
        <Nav className="justify-content-end p-3">
          {userEmail ? (
            <div className="d-flex align-items-center gap-3" style={{ marginTop: '70px' }}>
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
    </div>
  );
}

export default Menum;
