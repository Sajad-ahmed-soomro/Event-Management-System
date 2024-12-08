const EventManager = require('../models/EventManager');  // Assuming you have an EventManager model

// Get the manager by ID
exports.getManagerById = async (req, res) => {
  try {
    const manager = await EventManager.findById(req.params.id); // Find manager by ID
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    res.json(manager); // Return the manager object
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all managers
exports.getAllManagers = async (req, res) => {
  try {
    const managers = await EventManager.find(); // Fetch all managers
    if (!managers || managers.length === 0) {
      return res.status(404).json({ message: 'No managers found' });
    }
    res.json(managers);  // Return all managers
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
