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
      token: generateToken(sponsor._id),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Add a new sponsored event
// Add a new sponsored event
exports.sponsorNewEvent = async (req, res) => {
  const { sponsorId, eventId, contributionAmount } = req.body;

  try {
    // Find the sponsor by ID
    const sponsor = await Sponsor.findById(sponsorId);
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Add the new event to the sponsor's sponsoredEvents
    sponsor.sponsoredEvents.push({
      eventId,
      contributionAmount,
      status: "Pending", // Default status
    });

    // Update the sponsor's totalContributions
    sponsor.totalContributions += contributionAmount;

    // Add the sponsor to the event's sponsors list
    event.sponsors.push(sponsorId);

    // Save both the sponsor and event
    await sponsor.save();
    await event.save();

    // Make sure to use .populate() or select the fields you want to return if necessary
    const updatedSponsor = await Sponsor.findById(sponsorId).populate(
      "sponsoredEvents.eventId"
    );
    const updatedEvent = await Event.findById(eventId).populate("sponsors");

    // Send back the updated sponsor and event data in the response
    res.status(201).json({
      message: "Event sponsored successfully",
      sponsor: updatedSponsor, // Include the updated sponsor object
      event: updatedEvent, // Include the updated event object
    });
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
