// // backend/models/User.js
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true } // Store hashed passwords in production
// });

// module.exports = mongoose.model('User', UserSchema);


// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('User', UserSchema);
