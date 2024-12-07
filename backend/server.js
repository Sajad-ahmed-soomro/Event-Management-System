const express = require('express');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
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

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
