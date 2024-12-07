const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google OAuth login route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route for Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { user, token } = req.user;

    // Send user data and token as response or redirect
    res.status(200).json({
      success: true,
      message: "Google login successful",
      user,
      token,
    });
  }
);

module.exports = router;
