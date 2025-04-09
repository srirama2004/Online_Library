const express = require("express");
const router = express.Router();
const CheckIn = require("../models/Checkin.js");

// POST - User checks in
router.post('/', async (req, res) => {
  const { email, date } = req.body;   // changed userId -> email
  try {
    const alreadyCheckedIn = await CheckIn.findOne({ email, date });
    if (alreadyCheckedIn) {
     
      return res.status(400).json({ message: "Already checked in today" });
    }
    const checkIn = new CheckIn({ email, date });
    await checkIn.save();
    res.status(201).json(checkIn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch all check-ins for a user
router.get('/:email', async (req, res) => {   // changed userId -> email
  const { email } = req.params;
  try {
    console.log(email + " checkin inside ");
    const checkIns = await CheckIn.find({ email });
    const formatted = {};
    checkIns.forEach(ci => {
      formatted[ci.date] = true;
    });
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
