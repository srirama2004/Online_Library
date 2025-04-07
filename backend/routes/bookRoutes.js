const express = require("express");
const router = express.Router();
const Book = require("../models/bookdescription"); // Import Model
const Order = require('../models/orders'); // adjust path as needed

// ➤ Add a new book
router.post("/add", async (req, res) => {
  try {
    console.log("inside add");
    const { bookId, title, abstract,category, image } = req.body;
    
    if (!bookId || !title || !abstract || !category || !image) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newBook = new Book({ bookId, title, abstract,category, image });
    await newBook.save();
    
    res.status(201).json({ message: "Book added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book", details: error.message });
  }
});

// ➤ Get all books
router.get("/all", async (req, res) => {
  try {
    console.log("inside all");
    const books = await Book.find();  // Fetch all books
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books", details: error.message });
  }
});
// GET books by category
router.get("/:category", async (req, res) => {
  try {
    
    const category = req.params.category;
    console.log("inside category",category);
    const books = await Book.find({ category }); // Fetch books based on category
    console.log(books);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books11", details: err.message });
  }
});
router.get("/top6", async (req, res) => {
  try {
    console.log("inside top6 ");
    const books = await Book.find({ bookId: { $gte: 1, $lte: 6 } }).sort({ bookId: 1 }).limit(6);
    console.log("Fetched books:", books);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top books", details: err.message });
  }
});
// 

router.get("/get/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log("Fetching book with ID:", bookId);

    const book = await Book.findOne({ bookId: Number(bookId) });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book", details: err.message });
  }
});


router.get('/user-orders/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log("Received request for purchased orders for userId:", userId);

  try {
    // Find all orders for this user where payment is successful
    const orders = await Order.find({ userId, status: 'paid' });
    console.log("Orders found:", orders);

    // Extract bookIds from orders (convert to numbers if necessary)
    const bookIds = orders.map(order => {
      const parsedId = parseInt(order.bookId);
      console.log(`Parsed bookId for order ${order._id}:`, parsedId);
      return parsedId;
    });
    console.log("Extracted book IDs:", bookIds);

    // Retrieve book details for these bookIds
    const books = await Book.find({ bookId: { $in: bookIds } });
    console.log("Fetched books corresponding to orders:", books);

    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching purchased books:", error);
    res.status(500).json({ message: 'Failed to fetch purchased books' });
  }
});
module.exports = router;
