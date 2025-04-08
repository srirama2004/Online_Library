const mongoose = require("mongoose");

const currentReadSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  bookId: { type: String, required: true },
});

module.exports = mongoose.model("currentRead", currentReadSchema);