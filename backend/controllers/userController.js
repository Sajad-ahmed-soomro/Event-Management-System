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
const bcrypt = require("bcryptjs"); // Ensure bcrypt is imported

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email belongs to a sponsor
    const sponsor = await Sponsor.findOne({ email });
    if (sponsor) {
      return res.status(200).json({
        success: true,
        message: "Login successful as Sponsor",
        userType: "sponsor",
        token: generateToken(sponsor._id),
      });
    }

    // Check if the email belongs to a normal user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Verify password for normal user
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful as User",
      userType: "user",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming req.user is set by `protect`
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      status: user.status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
