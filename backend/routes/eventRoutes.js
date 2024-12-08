// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // Ensure this path is correct

// Fetch all events (GET request)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
});

// Example of backend route in eventRoutes.js
router.post("/sponsor", async (req, res) => {
  try {
    // Handle the event sponsorship logic here
    const { eventId, contributionAmount } = req.body;
    // Logic to handle sponsorship
    res.status(200).json({ message: "Event sponsored successfully" });
  } catch (error) {
    console.error("Error sponsoring event:", error);
    res.status(500).json({ message: "Error sponsoring event" });
  }
});
module.exports = router;
