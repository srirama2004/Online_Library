const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema({
  email: { type: String, required: true },   
  date: { type: String, required: true }      
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;
