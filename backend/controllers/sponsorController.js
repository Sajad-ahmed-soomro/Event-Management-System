const Sponsor = require("../models/Sponsor");
const generateToken = require("../utils/generateToken");

// Login for sponsors
exports.loginSponsor = async (req, res) => {
  const { email } = req.body;

  try {
    const sponsor = await Sponsor.findOne({ email });
    if (!sponsor) {
      return res.status(404).json({
        success: false,
        message: "Sponsor not found. Please register first.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful as Sponsor",
      token: generateToken(sponsor._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
