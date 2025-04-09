
const express = require("express");
const router = express.Router();
const BookContent = require("../models/bookcontent"); 

router.post("/add", async (req, res) => {
  try {
    console.log("inside add cotnent ");
    const { bookId, abstract } = req.body;
    
    if (!bookId || !abstract ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newBookc = new BookContent({ bookId, abstract });
    await newBookc.save();
    
    res.status(201).json({ message: "Book added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book", details: error.message });
  }
});

router.get("/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await BookContent.findOne({ bookId: bookId });
    if (book) {
      console.log("inside bookc",book);
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
