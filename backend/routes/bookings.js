

const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { studentId, mentorId, duration, dateTime } = req.body;
    const bookingId = await Booking.create(studentId, mentorId, duration, dateTime);
    res.status(201).json({ id: bookingId });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    console.log('Fetching all bookings...');
    const bookings = await Booking.all();
    console.log('Bookings fetched:', bookings);
    res.json(bookings);
  } catch (error) {
    console.error('Error in /all route:', error);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

router.get('/mentor/:mentorId', async (req, res) => {
  try {
    const bookings = await Booking.getForMentor(req.params.mentorId);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching mentor bookings:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;