const express = require("express");
const connectDB = require("./config/db"); // Import the database connection function
require("dotenv").config();
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const eventManagerRoutes = require("./routes/eventManagerRoutes");
const eventStatusRoutes = require("./routes/eventStatusRoutes");
const userManageRoutes = require("./routes/userManageRoutes"); // Adjust the path as necessary
const reportRoutes = require("./routes/reportRoutes");
const jwt = require("jsonwebtoken");
const passport = require("./passport");
const session = require("express-session"); // Import express-session
const { authenticateToken } = require("./middlewares/adminAuth");

const app = express();
const port = process.env.PORT || 5000; // Default to 5000 if PORT is not specified

app.use(cors());
// Connect to the MongoDB database
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.static("uploads")); // Serve static files like images

// Session middleware
app.use(
  session({
    secret: "your-session-secret", // Define a secret for session
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js
app.use(passport.initialize()); // Initialize passport first
app.use(passport.session()); // Use passport session after initialization

// Routes
app.use("/api/admin", adminRoutes); // Admin routes
app.use("/api/manageUser", userManageRoutes); // User management routes
app.use("/api/event-status", eventStatusRoutes); // Event status routes
app.use("/api/eventManagers", eventManagerRoutes); // Event Managers routes
app.use("/api/report", reportRoutes); // Report routes

// JWT Verification
app.get("/api/verifyjwt", authenticateToken, (req, res) => {
  res.json({ success: true });
});

// Google authentication route
app.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google callback route
app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirect on failure
  }),
  (req, res) => {
    // Successful authentication, redirect to the dashboard
    res.redirect("/user");
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
