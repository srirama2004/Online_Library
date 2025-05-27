const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
require("./config/passport");

// Route imports
const bookRoutes = require("./routes/bookRoutes");
const handlereviews = require("./routes/handlereviews");
const handlePayement = require("./routes/handlerRzorpay");
const wishlistRoutes = require("./routes/handleWIshlist");
const currentReadRoutes = require("./routes/handleCurrentRead");
const authRoutes = require("./routes/auth");
const CheckIn = require("./routes/checkins");
const bookc = require("./routes/bookcroutes");

const app = express();

// ✅ Enable logging for debug
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ Parse JSON before cors
app.use(express.json());

// ✅ CORS setup
const corsOptions = {
  origin: "https://online-library-l4oi.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};
app.use(cors(corsOptions));

// ✅ Handle preflight requests
app.options("*", cors(corsOptions));

// ✅ Session & Passport setup
app.use(session({
  secret: process.env.SESSION_SECRET || "session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none", // for cross-site cookies
    secure: true      // required for HTTPS
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/books", bookRoutes);
app.use("/reviews", handlereviews);
app.use("/rzpay", handlePayement);
app.use("/wishlist", wishlistRoutes);
app.use("/currentRead", currentReadRoutes);
app.use("/api/auth", authRoutes);
app.use("/checkins", CheckIn);
app.use("/bookc", bookc);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected!"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
