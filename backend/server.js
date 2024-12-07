const express = require('express');
<<<<<<< HEAD
const connectDB = require('./config/db'); // Import the database connection function
require('dotenv').config();
const eventRoutes = require('./Routes/eventRoutes');

const app = express();
const port = process.env.PORT || 5000; // Default to 5000 if PORT is not specified

// Connect to the MongoDB database
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json
=======
const app = express();
const port = 5000; // You can change this port if needed
>>>>>>> 822a880231444033b513ff17040fef3f9319cc3f

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

<<<<<<< HEAD
// Routes
app.use('/api/events', eventRoutes);

=======
>>>>>>> 822a880231444033b513ff17040fef3f9319cc3f
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
