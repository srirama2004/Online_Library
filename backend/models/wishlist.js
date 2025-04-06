const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);