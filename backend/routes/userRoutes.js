// routes/userRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getUserDashboard } = require("../controllers/userController");
const User = require("../models/User");
const router = express.Router();
const {
  registerUser,
  registerSponsor,
  loginUser,
} = require("../controllers/userController");
router.post("/login", loginUser); // Add login route
router.post("/register", registerUser); // for normal users
router.post("/register/sponsor", registerSponsor); // for sponsors
router.get("/dashboard", protect, getUserDashboard);
// Route to get a user's booked events
router.get("/:userId/booked-events", async (req, res) => {
  try {
    // Find user by ID and populate the bookedEvents field
    const user = await User.findById(req.params.userId).populate(
      "profile.bookedEvents"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's booked events
    res.status(200).json({ bookedEvents: user.profile.bookedEvents });
  } catch (error) {
    console.error("Error fetching booked events:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
