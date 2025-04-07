const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS

const passport = require('passport');
const session = require('express-session');

const bookRoutes = require("./routes/bookRoutes"); // Import routes
const handlereviews = require("./routes/handlereviews"); // Import routes
const handlePayement = require("./routes/handlerRzorpay"); // Import routes
const wishlistRoutes = require("./routes/handleWIshlist");//C:\Users\user\Desktop\VI sem\FC\Prooject\Online_Library\backend\routes\handleWIshlist.js
const authRoutes = require('./routes/auth');


require("dotenv").config();
 // Import Model
require('./config/passport');


const app = express();

// Express session for passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'session_secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json()); 
app.use("/books", bookRoutes); 
app.use("/reviews", handlereviews);
app.use("/rzpay", handlePayement);  // Use book routes
app.use("/wishlist", wishlistRoutes);
app.use('/api/auth', authRoutes);


// ➤ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.error("MongoDB connection error:", err));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

