const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: { type: Number, required: true, unique: true },  // Unique book identifier
  title: { type: String, required: true },                // Book Title
  abstract: { type: String, required: true },
  category: { type: String, required: true },             // Book Category
  image: { type: String, required: true },                // Image URL or file path
  author: { type: String, default: "William" },           // Default author
  price: { type: Number, default: 0 }                     // Default price
}, { collection: "bookdescription" });  // Explicitly set collection name

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

