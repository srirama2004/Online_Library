const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true } // "YYYY-MM-DD" format
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;
