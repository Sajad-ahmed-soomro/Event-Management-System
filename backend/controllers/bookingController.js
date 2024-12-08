// BookingController.js
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');

// Get all bookings for an event manager
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('eventId')
      .populate('userId')
      .exec();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get booking details by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('eventId')
      .populate('userId')
      .exec();
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update booking status (approve/reject/cancel)
exports.updateBookingStatus = async (req, res) => {
  const { bookingStatus } = req.body; // 'Confirmed', 'Rejected', 'Cancelled'
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.bookingStatus = bookingStatus;

    await booking.save();
    res.json({ message: `Booking status updated to ${bookingStatus}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get bookings for a specific event
exports.getBookingsForEvent = async (req, res) => {
  try {
    // Find all bookings where eventId matches the eventId parameter
    const bookings = await Booking.find({ eventId: req.params.eventId })
      .populate('userId')  // Populate userId to show client details
      .populate('eventId') // Populate eventId to show event details
      .exec();

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this event' });
    }

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};
