// server.js (or app.js)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes"); // Add this
const passport = require("./passport"); // Passport configuration
const session = require("express-session");
const authRoutes = require("./routes/authRoutes"); // Add Google auth routes
const profileRoutes = require("./routes/profileRoutes"); // Add this import
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {});

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/sponsors", sponsorRoutes); // Add sponsor routes

app.use("/api/auth", authRoutes); // Use Google auth routes
app.use("/api/profile", profileRoutes);
app.use(
  session({
    secret: "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",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
