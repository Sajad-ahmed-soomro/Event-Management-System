// controllers/userController.js
const User = require("../models/User");
const Sponsor = require("../models/Sponsor");
const generateToken = require("../utils/generateToken");

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};

// Register a new sponsor (vendor)
exports.registerSponsor = async (req, res) => {
  const { name, email, contactNumber } = req.body;

  try {
    const sponsorExists = await Sponsor.findOne({ email });
    if (sponsorExists)
      return res.status(400).json({ message: "Sponsor already exists" });

    const sponsor = await Sponsor.create({ name, email, contactNumber });
    res.status(201).json({
      message: "Sponsor registered successfully",
      token: generateToken(sponsor._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to register sponsor", error });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Match the provided password with the stored hashed password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with a token if successful
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error });
  }
};
