import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./CheckInPage.css";

const CheckInPage = () => {
  const [checkIns, setCheckIns] = useState({});
  const [email, setEmail] = useState("");  // email instead of userId

  useEffect(() => {
    // Normally you would get email from auth login
    const loggedInEmail = localStorage.getItem('userEmail');
    if (loggedInEmail) {
    setEmail(loggedInEmail);
    
      fetchCheckIns(loggedInEmail);
    }
  }, []);

  const fetchCheckIns = async (userEmail) => {
    try {
      
      const res = await axios.get(`http://localhost:5000/checkins/${userEmail}`);
      setCheckIns(res.data);
    } catch (error) {
      console.error("Error fetching check-ins:", error);
    }
  };
  const calculateStreak = () => {
    let streak = 0;
    let date = new Date();
    while (true) {
      const dateKey = date.toISOString().split("T")[0];
      if (checkIns[dateKey]) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const today = new Date();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const checkedIn = checkIns[dateKey];
    return (
      <div key={day} className={`calendar-day ${checkedIn ? 'checked-in' : ''}`}>
        {day}
      </div>
    );
  });

  return (
    <div className="check-in-page">
      <h1>📅 Daily Check-In</h1>
      <p>🔥 Current Streak: {calculateStreak()} days</p>
      <div className="calendar-container">
        {calendarDays}
      </div>
    </div>
  );
};

export default CheckInPage;
