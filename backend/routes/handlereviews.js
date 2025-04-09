const express = require("express");
const router = express.Router();
const Review = require("../models/reviews"); 
const Book = require("../models/bookdescription"); 


router.get("/get/:bookId", async (req, res) => {
    const { bookId } = req.params;
  
    try {
      const reviews = await Review.find({ bookId: parseInt(bookId) }).sort({ createdAt: -1 });
  
      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found for this book." });
      }
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post('/add', async (req, res) => {
    try {
      const { id, username, rating, text } = req.body;
      bookId = id;
      
      const newReview = new Review({ bookId , username, rating, text });
      await newReview.save();
  
      
      const allReviews = await Review.find({ bookId });
  
      res.status(201).json(allReviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to post review' });
    }
  });
  


module.exports = router;