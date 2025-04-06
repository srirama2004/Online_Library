// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  bookId: { type: Number, required: true }, // Link to the book
  username: { type: String, default: "Anonymous" },
  rating: { type: Number, required: true },
  text: { type: String, required: true }
}, { timestamps: true, collection: "reviews" });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
