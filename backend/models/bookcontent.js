const mongoose = require("mongoose");

const bookContentSchema = new mongoose.Schema({
  bookId: { type: Number, required: true, unique: true },
  abstract: { type: String, required: true }
}, { collection: "bookcontent" });

const BookContent = mongoose.model("Bookc", bookContentSchema);
module.exports = BookContent;
