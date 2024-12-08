const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ticketType: { type: String, required: true }, // Regular, VIP
    paymentStatus: { type: String, default: 'Pending' }, // Pending, Completed, Failed
    bookingStatus: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Rejected'], // You can extend statuses based on requirements
        default: 'Pending' 
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
