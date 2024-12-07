const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const Sponsor = require("../models/Sponsor");
const router = express.Router();

// Route for getting the user's profile
router.get("/profile", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    // Check if the user is a sponsor
    const sponsor = await Sponsor.findOne({ email: req.user.email });

    if (sponsor) {
      // If sponsor, send sponsor profile page
      return res.redirect("/sponsor-dashboard");
    } else {
      // If regular user, send user profile page
      return res.redirect("/user-dashboard");
    }
  } catch (error) {
    return res.status(500).send({ message: "Error fetching user data" });
  }
});

module.exports = router;
