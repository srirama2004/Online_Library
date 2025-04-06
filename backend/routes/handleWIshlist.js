const express = require("express");
const Wishlist = require("../models/wishlist");

const router = express.Router();

// Add or Remove Book from Wishlist (Toggle)
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

// Check if a book is wished
router.get("/check/:userId/:bookId", async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    const wished = await Wishlist.findOne({ userId, bookId });
    res.status(200).json({ wished: !!wished });
  } catch (err) {
    res.status(500).json({ error: "Failed to check wishlist" });
  }
});

module.exports = router;