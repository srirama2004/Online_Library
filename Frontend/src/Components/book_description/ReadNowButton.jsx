import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReadNowButton = ({ userId, bookId }) => {
  const [reading, setReading] = useState(false);
  const navigate = useNavigate();

  
  const checkCurrentRead = async () => {
    try {
      const res = await fetch(`http://localhost:5000/currentread/check/${userId}/${bookId}`);
      const data = await res.json();
      
      setReading(data.read);
    } catch (err) {
      console.error("Failed to check current read status:", err);
    }
  };

  
  const startOrContinueReading = async () => {
    try {
      const res = await fetch(`http://localhost:5000/currentread/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bookId }),
      });
      const data = await res.json();
      
      setReading(data.reading);
      navigate(`/bookviewer/${bookId}`);
    } catch (err) {
      console.error("Failed to start/continue reading:", err);
    }
  };

  useEffect(() => {
    checkCurrentRead();
  }, [userId, bookId]);

  return (
    <button
      className="book_read"
      onClick={startOrContinueReading}
      style={{ backgroundColor: '#382e25', color: '#fff', border: 'none' }}
    >
      {reading ? "Continue Reading" : "Read Now"}
    </button>

  );
};

export default ReadNowButton;
