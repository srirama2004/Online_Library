
const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const passport = require('passport');
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const newUser = new User({ email, password });
    await newUser.save();
    
    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json({ message: 'User signed in successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/signin' }),
  (req, res) => {
    
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    const userEmail = req.user.email;
    res.redirect(`http://localhost:3000/google-auth-success?token=${token}&userId=${req.user._id}&userEmail=${userEmail}`);

  }
);

module.exports = router;
