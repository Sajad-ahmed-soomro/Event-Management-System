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
// Get all sponsorship requests
exports.getSponsorshipRequests = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.user.id).populate(
      "sponsoredEvents.eventId"
    );
    if (!sponsor) return res.status(404).json({ message: "Sponsor not found" });
    res.status(200).json(sponsor.sponsoredEvents);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Make a payment for sponsorship
exports.makePayment = async (req, res) => {
  const { eventId, contributionAmount } = req.body;
  try {
    const sponsor = await Sponsor.findById(req.user.id);
    if (!sponsor) return res.status(404).json({ message: "Sponsor not found" });

    const event = sponsor.sponsoredEvents.find(
      (e) => e.eventId.toString() === eventId
    );
    if (!event)
      return res
        .status(404)
        .json({ message: "Event not found in sponsorships" });

    event.contributionAmount = contributionAmount;
    event.status = "Confirmed";
    sponsor.totalContributions += contributionAmount;

    await sponsor.save();
    res.status(200).json({ message: "Payment successful", event });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Check pending or refund statuses
exports.getPaymentStatus = async (req, res) => {
  try {
    const sponsor = await Sponsor.findById(req.user.id);
    if (!sponsor) return res.status(404).json({ message: "Sponsor not found" });

    const pendingPayments = sponsor.sponsoredEvents.filter(
      (e) => e.status === "Pending"
    );
    const refunds = sponsor.sponsoredEvents.filter(
      (e) => e.status === "Rejected"
    );

    res.status(200).json({ pendingPayments, refunds });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
