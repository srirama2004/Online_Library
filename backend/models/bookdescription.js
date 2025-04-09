const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: { type: Number, required: true, unique: true },  
  title: { type: String, required: true },                
  abstract: { type: String, required: true },
  category: { type: String, required: true },             
  image: { type: String, required: true },                
  author: { type: String, default: "William" },           
  price: { type: Number, default: 0 }                     
}, { collection: "bookdescription" });  

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

