const express = require("express");
const currentRead = require("../models/currentRead"); // Import the Wishlist model
const Book = require("../models/bookdescription"); // Import the Book model
const router = express.Router();

// Add or Remove Book from CurrentRead (Toggle)
router.post("/toggle", async (req, res) => {
    const { userId, bookId } = req.body;
    try {
      const existing = await currentRead.findOne({ userId, bookId });
      if (existing) {
        // Book is already in current reads
        return res.status(200).json({ message: "Already in CurrentReads", reading: true });
      } else {
        const newCurrentRead = new currentRead({ userId, bookId });
        await newCurrentRead.save();
        return res.status(200).json({ message: "Added to CurrentReads", reading: true });
      }
    } catch (err) {
      console.error("CurrentReads toggle error:", err);
      res.status(500).json({ error: "Failed to toggle currentReads" });
    }
  });
  

// Check if a book is wished
router.get("/check/:userId/:bookId", async (req, res) => {
    const { userId, bookId } = req.params;
    try {
      const read = await currentRead.findOne({ userId, bookId });
      res.status(200).json({ read: !!read });
    } catch (err) {
      res.status(500).json({ error: "Failed to check CurrentRead" });
    }
  });
  

// GET all current reads for a user
router.get("/all/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching current reads for userId:", userId);
  try {
    const readlistItems = await currentRead.find({ userId });
    console.log("CurrentRead items:", readlistItems);
    // Extract bookIds (convert to numbers if needed)
    const bookIds = readlistItems.map(item => parseInt(item.bookId));
    console.log("Extracted book IDs:", bookIds);
    // Retrieve book details from the Book model
    const books = await Book.find({ bookId: { $in: bookIds } });
    console.log("Fetched current read books:", books);
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching current reads:", err);
    res.status(500).json({ error: "Failed to fetch current reads" });
  }
});



module.exports = router;