const Sponsor = require("../models/Sponsor");
const Event = require("../models/Event");
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
      sponsorId: sponsor._id, // Include the sponsorId in the response
      token: generateToken(sponsor._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Add a new sponsored event

exports.sponsorNewEvent = async (req, res) => {
  const { sponsorId, eventId, contributionAmount } = req.body;
  try {
    // Find the sponsor and event
    const sponsor = await Sponsor.findById(sponsorId);
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update sponsor's data
    sponsor.sponsoredEvents.push({
      eventId,
      contributionAmount,
      status: "Pending",
    });
    console.log("Updated sponsor before save:", sponsor);

    sponsor.totalContributions += contributionAmount;

    // Update event's data
    event.sponsors.push(sponsorId);

    // Save both entities
    await sponsor.save();
    await event.save();

    // Fetch updated sponsor with populated fields
    const updatedSponsor = await Sponsor.findById(sponsorId).populate(
      "sponsoredEvents.eventId"
    );

    // Fetch updated event with populated fields
    const updatedEvent = await Event.findById(eventId).populate("sponsors");

    res.status(201).json({
      message: "Event sponsored successfully FROM FUNCTION",
      sponsor: updatedSponsor,
      event: updatedEvent,
    });
    console.log("Updated Sponsor:", updatedSponsor);
    console.log("Updated Event:", updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all sponsored events for a sponsor
exports.getSponsoredEvents = async (req, res) => {
  const { sponsorId } = req.params;

  try {
    const sponsor = await Sponsor.findById(sponsorId).populate(
      "sponsoredEvents.eventId"
    );
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    res.status(200).json(sponsor.sponsoredEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
