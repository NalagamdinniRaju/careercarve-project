const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, areaOfInterest } = req.body;
    const studentId = await Student.create(name, areaOfInterest);
    res.status(201).json({ id: studentId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;