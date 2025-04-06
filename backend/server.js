const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS


const bookRoutes = require("./routes/bookRoutes"); // Import routes
const handlereviews = require("./routes/handlereviews"); // Import routes
const handlePayement = require("./routes/handlerRzorpay"); // Import routes
const wishlistRoutes = require("./routes/handleWIshlist");



require("dotenv").config();
 // Import Model


const app = express();
app.use(cors());
app.use(express.json()); 
app.use("/books", bookRoutes); 
app.use("/reviews", handlereviews);
app.use("/rzpay", handlePayement);  // Use book routes
app.use("/wishlist", wishlistRoutes);
// ➤ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

