const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 

const passport = require('passport');
const session = require('express-session');
const bookRoutes = require("./routes/bookRoutes"); 
const handlereviews = require("./routes/handlereviews"); 
const handlePayement = require("./routes/handlerRzorpay"); 
const wishlistRoutes = require("./routes/handleWIshlist");
const currentReadRoutes = require("./routes/handleCurrentRead"); 
const authRoutes = require('./routes/auth');
const CheckIn = require('./routes/checkins');
const bookc = require('./routes/bookcroutes');

require("dotenv").config();
 
require('./config/passport');


const app = express();
app.use(cors({
  origin: "https://online-library-l4oi.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'session_secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); 
app.use("/books", bookRoutes); 
app.use("/reviews", handlereviews);
app.use("/rzpay", handlePayement);  
app.use("/wishlist", wishlistRoutes);
app.use("/currentRead", currentReadRoutes); 
app.use('/api/auth', authRoutes);
app.use('/checkins',CheckIn);
app.use('/bookc',bookc);

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.error("MongoDB connection error:", err));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

