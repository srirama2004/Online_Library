import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { BsPerson } from 'react-icons/bs';
import pic from "../images/pic1.jpg";
import gatsby from "../images/greatGatsby.png";
import bird from "../images/killabird.png";
import onenine from "../images/1984.png";
import pride from "../images/pride.png";
import hobbit from "../images/hobbit.png";
import moby from "../images/moby.png";
import lotr from "../images/lotr.png";
import catcher from "../images/catcher.png";
import brave from "../images/brave.png";
import midnightLibrary from '../images/midnight.png'
import endsWithUs from '../images/itends.png'
import silentPatient from '../images/silent.png'
import manCalledOve from '../images/ove.png'
import verity from '../images/verity.png'
import lessonsInChemistry from '../images/lessons.png'
import hailMary from '../images/hailmary.png'

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('reads');
    const [hoveredTab, setHoveredTab] = useState(null);
    const navigate = useNavigate();

    const handleTabSelect = (tab) => {
        setActiveTab(tab);
    };

    // Initialize Bootstrap carousel after component fully renders
    useEffect(() => {
        // We need to load Bootstrap's JS here
        const loadBootstrapScript = () => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
            script.integrity = 'sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz';
            script.crossOrigin = 'anonymous';
            script.onload = () => {
                // Initialize the carousel once Bootstrap is loaded
                if (typeof window !== 'undefined' && window.bootstrap) {
                    const carouselElement = document.getElementById('booksCarousel');
                    if (carouselElement) {
                        new window.bootstrap.Carousel(carouselElement, {
                            interval: 5000, // Auto-slide every 5 seconds
                            wrap: true,    // Loop back to beginning
                            touch: true     // Enable touch swipe
                        });
                    }
                }
            };
            document.body.appendChild(script);
        };
        
        loadBootstrapScript();
        
        // Cleanup function to remove the script when component unmounts
        return () => {
            const bootstrapScript = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"]');
            if (bootstrapScript) {
                document.body.removeChild(bootstrapScript);
            }
        };
    }, [activeTab]);

    // Sample book data for the currently reading list
    const currentlyReadingBooks = [
      { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", progress: 45, image: gatsby },
      { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", progress: 68, image: bird },
      { id: 3, title: "1984", author: "George Orwell", progress: 23, image: onenine },
      { id: 4, title: "Pride and Prejudice", author: "Jane Austen", progress: 89, image: pride },
      { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", progress: 12, image: hobbit },
      { id: 6, title: "Moby Dick", author: "Herman Melville", progress: 37, image: moby },
      { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger", progress: 52, image: catcher },
      { id: 8, title: "The Lord of the Rings", author: "J.R.R. Tolkien", progress: 74, image: lotr },
      { id: 9, title: "Brave New World", author: "Aldous Huxley", progress: 41, image: brave },
    ];
    const wishListBooks = [
        { id: 1, title: "The Midnight Library", author: "Matt Haig", progress: 0, image: midnightLibrary },
        { id: 2, title: "It Ends with Us", author: "Colleen Hoover", progress: 0, image: endsWithUs },
        { id: 3, title: "The Silent Patient", author: "Alex Michaelides", progress: 0, image: silentPatient },
        { id: 4, title: "A Man Called Ove", author: "Fredrik Backman", progress: 0, image: manCalledOve },
        { id: 5, title: "Verity", author: "Colleen Hoover", progress: 0, image: verity },
        { id: 6, title: "Lessons in Chemistry", author: "Bonnie Garmus", progress: 0, image: lessonsInChemistry },
        { id: 7, title: "Project Hail Mary", author: "Andy Weir", progress: 0, image: hailMary },
      ];
    
    // Styles for the profile page
    const styles = {
        pageContainer: {
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#1e160f', // Light brown background
            padding: '0',
        },
        headerSection: {
            position: 'relative',
            width: '100%',
            height: '400px',
            overflow: 'hidden',
        },
        bookshelfImage: {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 20%', // Adjusts the focus 20% from the top
        },
        
        bookImage: {
            width: '100%',  // Fill the card width
            height: '280px', // Taller height for book images
            objectFit: 'cover',
            borderRadius: '5px 5px 0 0', // Rounded corners only on top
        },
        profileOverlay: {
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            textAlign: 'center',
            padding: '20px 0',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
        },
        profileIcon: {
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 10px',
        },
        userName: {
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '500',
            margin: '0 auto 100px',
        },
        navContainer: {
            backgroundColor: '#382e25', // Dark brown
            width: '100%',
            padding: '10px 0',
            position: 'sticky', // Makes it sticky
            top: 0, // Sticks to the top of the viewport
            zIndex: 100, // Ensures it stays above other elements
        },
        navTabs: {
            display: 'flex',
            justifyContent: 'space-around',
            maxWidth: '600px',
            margin: '0 auto',
        },
        navTab: {
            color: 'rgb(252, 250, 250)',
            padding: '8px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '500',
            textAlign: 'center',
            transition: 'all 0.3s ease',
        },
        activeTab: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        navTabHover: {
            transform: 'scale(1.1)',
        },
        contentArea: {
            padding: '30px',
            minHeight: '400px',
        },
        tabContent: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '20px',
            minHeight: '300px',
        },
        fullHeightImage: {
            width: "100%",
            height: "100%",
            objectFit: "fill",
        },
        progressContainer: {
            width: '100%',
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            overflow: 'hidden',
            height: '10px',
            marginTop: '10px',
            color:'black'
        },
        progressBar: {
            height: '100%',
            backgroundColor: '#5D3F37',
        },
        progressText: {
            fontSize: '0.8rem',
            marginTop: '5px',
            color: '#333',
            fontWeight: '500',
            textAlign: 'center',
        },
        bookCard: {
            border: 'none',
            borderRadius: '10px',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden', // To ensure border-radius works with image
            height: '100%',
            width: '200px',
            margin: '0 10px',
        },
        carouselContainer: {
            padding: '20px 0',
        },
        carouselInner: {
            padding: '20px 0',
        },
        carouselItem: {
            padding: '15px 0', 
        },
        bookCardContent: {
            padding: '15px',
        },
        // Fix the carousel control buttons
        carouselControl: {
            width: '5%',
            background: 'rgba(93, 64, 55, 0.3)',
            borderRadius: '50%',
            height: '40px',
            width: '40px', 
            margin: 'auto 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    };

    // Create the new carousel for the reads tab matching your screenshot layout
    const newReadsContent = (
        <div>
            <h3 className="text-center mb-4 text-white">Currently Reading</h3>
            <div id="booksCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner" style={styles.carouselInner}>
                    {Array.from({ length: Math.ceil(currentlyReadingBooks.length / 5) }, (_, i) => (
                        <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`} style={styles.carouselItem}>
                            <div className="d-flex justify-content-center">
                                {currentlyReadingBooks.slice(i * 5, (i + 1) * 5).map(book => (
                                    <div key={book.id} style={styles.bookCard}>
                                        <img 
                                            src={book.image} 
                                            alt={book.title} 
                                            style={styles.bookImage} 
                                        />
                                        <div style={styles.bookCardContent}>
                                            <h5 className="fs-6 text-center">{book.title}</h5>
                                            <p className="text-center text-muted small">{book.author}</p>
                                            <div style={styles.progressContainer}>
                                                <div style={{...styles.progressBar, width: `${book.progress}%`}}></div>
                                            </div>
                                            <div style={styles.progressText}>{book.progress}% completed</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#booksCarousel" data-bs-slide="prev" style={styles.carouselControl}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#booksCarousel" data-bs-slide="next" style={styles.carouselControl}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
     const wishListContent = (
        <div>
            <h3 className="text-center mb-4 text-white">Go read</h3>
            <div id="wishListCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner" style={styles.carouselInner}>
                    {Array.from({ length: Math.ceil(wishListBooks.length / 5) }, (_, i) => (
                        <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`} style={styles.carouselItem}>
                            <div className="d-flex justify-content-center">
                                {wishListBooks.slice(i * 5, (i + 1) * 5).map(book => (
                                    <div key={book.id} style={styles.bookCard}>
                                        <img 
                                            src={book.image} 
                                            alt={book.title} 
                                            style={styles.bookImage} 
                                        />
                                        <div style={styles.bookCardContent}>
                                            <h5 className="fs-6 text-center">{book.title}</h5>
                                            <p className="text-center text-muted small">{book.author}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#wishListCarousel" data-bs-slide="prev" style={styles.carouselControl}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#wishListCarousel" data-bs-slide="next" style={styles.carouselControl}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );

    // Content components for each tab
    const tabContents = {
        reads: newReadsContent, // Using the new carousel
        wishlist:wishListContent,
        completed: wishListContent,
        notifications: <div className="text-center p-5">Your library notifications appear here</div>,
    };

    return (
        <Container fluid style={styles.pageContainer} className="p-0">
            {/* Header with bookshelf background and profile icon */}
            <div style={{ position: 'relative' }}>
  {/* Back Button - Top Left */}
  <button 
    onClick={() => navigate('/')} 
    style={{
      position: 'absolute',
      top: 20,
      left: 20,
      backgroundColor: '#382e25',
      color: 'white',
      padding: '10px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      zIndex: 10
    }}
  >
    ← Back to Home
  </button>

  {/* Header Section */}
  <div style={styles.headerSection}>
    <img src={pic} alt="Library shelves" style={styles.fullHeightImage} />
    <div style={styles.profileOverlay}>
      <div style={styles.profileIcon}>
        <BsPerson size={50} color="#5D3F37" />
      </div>
      <div style={styles.userName}>UserName</div>
    </div>
  </div>
</div>


            {/* Navigation tabs */}
            <div style={styles.navContainer}>
                <Nav style={styles.navTabs}>
                    <div
                        style={{ 
                            ...styles.navTab, 
                            ...(activeTab === 'reads' ? styles.activeTab : {}),
                            ...(hoveredTab === 'reads' ? styles.navTabHover : {})
                        }}
                        onClick={() => handleTabSelect('reads')}
                        onMouseEnter={() => setHoveredTab('reads')}
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        Reads
                    </div>
                    <div
                        style={{ 
                            ...styles.navTab, 
                            ...(activeTab === 'wishlist' ? styles.activeTab : {}),
                            ...(hoveredTab === 'wishlist' ? styles.navTabHover : {})
                        }}
                        onClick={() => handleTabSelect('wishlist')}
                        onMouseEnter={() => setHoveredTab('wishlist')}
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        Wishlist
                    </div>
                    <div
                        style={{ 
                            ...styles.navTab, 
                            ...(activeTab === 'completed' ? styles.activeTab : {}),
                            ...(hoveredTab === 'completed' ? styles.navTabHover : {})
                        }}
                        onClick={() => handleTabSelect('completed')}
                        onMouseEnter={() => setHoveredTab('completed')}
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        Completed
                    </div>
                    <div
                        style={{ 
                            ...styles.navTab, 
                            ...(activeTab === 'notifications' ? styles.activeTab : {}),
                            ...(hoveredTab === 'notifications' ? styles.navTabHover : {})
                        }}
                        onClick={() => handleTabSelect('notifications')}
                        onMouseEnter={() => setHoveredTab('notifications')}
                        onMouseLeave={() => setHoveredTab(null)}
                    >
                        Notifications
                    </div>
                </Nav>
            </div>

            {/* Content area */}
            <div style={styles.contentArea}>
                <div style={styles.tabContent}>
                    {tabContents[activeTab]}
                </div>
            </div>
        </Container>
    );
};

export default ProfilePage;