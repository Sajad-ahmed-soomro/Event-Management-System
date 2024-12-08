const Event = require("../models/Event"); // Import Event model

// Get all events with optional filters
exports.getEvents = async (req, res) => {
  try {
    const { category, startDate, endDate, search } = req.query;
    let query = {};

    // Apply filters
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const events = await Event.find(query).sort({ date: 1 }); // Sort by date ascending
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
};
