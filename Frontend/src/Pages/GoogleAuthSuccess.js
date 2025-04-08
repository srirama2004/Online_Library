import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userId = params.get('userId');
    const userEmail=params.get('userEmail');

    if (token && userId) {
      // Store token and userId in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', userEmail); // Store user email if needed
      // Redirect to profile page
      navigate('/profile');
    } else {
      navigate('/signin');
    }
  }, [location, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="ms-3">Completing authentication...</p>
    </div>
  );
};

export default GoogleAuthSuccess;

