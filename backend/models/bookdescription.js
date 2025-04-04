const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: { type: Number, required: true, unique: true },  // Unique book identifier
  title: { type: String, required: true },                // Book Title
  abstract: { type: String, required: true },
  category:{type:String,required:true},             // Summary of the book
  image: { type: String, required: true }                 // Image URL or file path
}, { collection: "bookdescription" });  // Explicitly set collection name

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
