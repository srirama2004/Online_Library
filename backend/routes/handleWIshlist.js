const express = require("express");
const Wishlist = require("../models/wishlist");
const Book = require("../models/bookdescription"); 
const router = express.Router();


router.post("/toggle", async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const existing = await Wishlist.findOne({ userId, bookId });

    if (existing) {
      await Wishlist.deleteOne({ userId, bookId });
      return res.status(200).json({ message: "Removed from wishlist", wished: false });
    } else {
      const newWish = new Wishlist({ userId, bookId });
      await newWish.save();
      return res.status(200).json({ message: "Added to wishlist", wished: true });
    }
  } catch (err) {
    console.error("Wishlist toggle error:", err);
    res.status(500).json({ error: "Failed to toggle wishlist" });
  }
});


router.get("/check/:userId/:bookId", async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    const wished = await Wishlist.findOne({ userId, bookId });
    res.status(200).json({ wished: !!wished });
  } catch (err) {
    res.status(500).json({ error: "Failed to check wishlist" });
  }
});

router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching wishlist for userId:", userId);
  try {
    
    const wishlistItems = await Wishlist.find({ userId });
    console.log("Wishlist items:", wishlistItems);

    
    const bookIds = wishlistItems.map(item => parseInt(item.bookId));
    console.log("Extracted book IDs:", bookIds);

    
    const books = await Book.find({ bookId: { $in: bookIds } });
    console.log("Fetched wishlist books:", books);

    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});


module.exports = router;