// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const passport = require('passport');
const jwt = require('jsonwebtoken');

// SIGNUP Endpoint
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();
    // Return success with the new user's ID
    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SIGNIN Endpoint
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Compare passwords (in production, use bcrypt.compare to check hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // If credentials are valid, return success with the user ID
    res.status(200).json({ message: 'User signed in successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/signin' }),
  (req, res) => {
    // Generate JWT token
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    // Redirect to frontend with token
    // Get user email for displaying in profile
    const userEmail = req.user.email;

    // Redirect directly to profile page with userId and email as query parameters
    // res.redirect(`http://localhost:3001/profile?userId=${req.user._id}&userEmail=${userEmail}`);
    // res.redirect(`http://localhost:3000/profile#userId=${req.user._id}&userEmail=${req.user.email}`);
 
    res.redirect(`http://localhost:3001/google-auth-success?token=${token}&userId=${req.user._id}&userEmail=${userEmail}`);
    // res.redirect(`http://localhost:3001/profile?token=${token}&userId=${req.user._id}`);
  }
);

module.exports = router;
