import { useEffect, useState } from "react";

const WishlistButton = ({ userId, bookId }) => {
  const [wished, setWished] = useState(false);

  const checkWishlist = async () => {
    try {
      const res = await fetch(`https://readlybackend.vercel.app/wishlist/check/${userId}/${bookId}`);
      const data = await res.json();
      setWished(data.wished);
    } catch (err) {
      console.error("Failed to check wishlist:", err);
    }
  };

  const toggleWishlist = async () => {
    try {
      const res = await fetch(`https://readlybackend.vercel.app/wishlist/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, bookId }),
      });
      const data = await res.json();
      setWished(data.wished);
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
    }
  };

  useEffect(() => {
    checkWishlist();
  }, [userId, bookId]);

  return (
    <button className="book_wishlist" onClick={toggleWishlist}>
      {wished ? "💖" : "🤍"}
    </button>
  );
};

export default WishlistButton;
