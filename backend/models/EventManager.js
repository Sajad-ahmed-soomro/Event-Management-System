const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt

const eventManagerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    assignedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    status: { type: String, default: 'Active' },
    notifications: [
        {
            notificationId: { type: mongoose.Schema.Types.ObjectId },
            message: { type: String },
            sentOn: { type: Date, default: Date.now },
            status: { type: String, default: 'Unread' }
        }
    ]
});

// Pre-save hook to hash the password before saving
eventManagerSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // Skip hashing if the password hasn't been modified
    }

    try {
        // Hash the password with 10 rounds of salt
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword; // Set the hashed password
        next(); // Proceed with saving the document
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

module.exports = mongoose.model('EventManager', eventManagerSchema);
