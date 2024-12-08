// routes/userRoutes.js
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getUserDashboard } = require("../controllers/userController");
const User = require("../models/User");
const Feedback = require("../models/Feedback");
const Event = require("../models/Event");
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
// Add feedback for a booked event
router.post("/:userId/event/:eventId/feedback", async (req, res) => {
  const { userId, eventId } = req.params;
  const { content, rating } = req.body;

  try {
    // Create a new feedback
    const feedback = new Feedback({
      userId,
      eventId,
      content,
      rating,
    });

    // Save the feedback to the database
    await feedback.save();

    // Update the event with the feedback
    const event = await Event.findById(eventId);
    console.log("Eeeventtt iddddd:", event);
    res.status(200).json({ message: "Feedback added successfully", feedback });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
