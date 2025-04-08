const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema({
  email: { type: String, required: true },   // changed userId -> email
  date: { type: String, required: true }      // "YYYY-MM-DD" format
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;
