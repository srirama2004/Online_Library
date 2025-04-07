const express = require("express");
const router = express.Router();
const CheckIn = require("../models/Checkin.js"); 

// POST - User checks in
router.post('/', async (req, res) => {
  const { userId, date } = req.body;
  try {
    const alreadyCheckedIn = await CheckIn.findOne({ userId, date });
    if (alreadyCheckedIn) {
      return res.status(400).json({ message: "Already checked in today" });
    }
    const checkIn = new CheckIn({ userId, date });
    await checkIn.save();
    res.status(201).json(checkIn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch all check-ins for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(userId+" checkin inside ");
    const checkIns = await CheckIn.find({ userId });
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

