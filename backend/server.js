const express = require('express');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const managerRoutes = require('./routes/managerRoutes'); // Import manager routes
const sponsorRoutes = require('./routes/sponsorRoutes'); // Import sponsor routes
const eventManagerRoutes = require('./routes/managerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); // <-- Add this
const resourceRoutes = require('./routes/resourceRoutes');


require('dotenv').config();
const cors = require('cors');  // Import CORS package

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());  // Enable CORS to allow requests from the frontend
app.use(express.json());  // Middleware to parse JSON requests

// Routes
app.use('/api/events', eventRoutes);  // Use eventRoutes for API requests
app.use('/api/managers', managerRoutes);  // Use managerRoutes for manager-related API requests
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/event-manager', eventManagerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);  // <-- Add this route
app.use('/api/resources', resourceRoutes);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
