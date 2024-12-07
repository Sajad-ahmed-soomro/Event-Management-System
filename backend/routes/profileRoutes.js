const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const Sponsor = require("../models/Sponsor");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

// Route for getting the user's profile
router.get("/profile", isAuthenticated, async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const sponsor = await Sponsor.findOne({ email: req.user.email });

    if (sponsor) {
      return res.redirect("/sponsor-dashboard");
    } else {
      return res.redirect("/user-dashboard");
    }
  } catch (error) {
    return res.status(500).send({ message: "Error fetching user data" });
  }
});

module.exports = router;
