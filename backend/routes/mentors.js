const express = require('express');
const Mentor = require('../models/Mentor');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.getAll();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/by-area/:area', async (req, res) => {
  try {
    const mentors = await Mentor.findByAreaOfExpertise(req.params.area);
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;