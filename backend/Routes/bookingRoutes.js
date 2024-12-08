const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');

// Get all bookings
router.get('/', BookingController.getBookings);

// Get a specific booking by ID
router.get('/:id', BookingController.getBookingById);

// Update booking status (approve/reject/cancel)
router.patch('/:id', BookingController.updateBookingStatus);

module.exports = router;
