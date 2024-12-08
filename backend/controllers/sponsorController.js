const Sponsor = require('../models/Sponsor');  // Assuming you have a Sponsor model

// Controller method to get a sponsor by ID
exports.getSponsorById = async (req, res) => {
  const { id } = req.params;
  try {
    const sponsor = await Sponsor.findById(id);
    if (!sponsor) {
      return res.status(404).json({ error: 'Sponsor not found' });
    }
    res.status(200).json(sponsor); // Return the sponsor object
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sponsor' });
  }
};

// Get all sponsors
exports.getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find(); // Fetch all sponsors
    if (!sponsors || sponsors.length === 0) {
      return res.status(404).json({ error: 'No sponsors found' });
    }
    res.status(200).json(sponsors);  // Return all sponsors
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};
