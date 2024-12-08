const EventManager = require('../models/EventManager');  // Assuming you have an EventManager model
const Admin = require('../models/Admin'); // Assuming you have an Admin model



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


// Register a new Event Manager
exports.registerEventManager = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if email already exists
        const existingEventManager = await EventManager.findOne({ email });
        if (existingEventManager) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Create new Event Manager with "pending" status
        const newEventManager = new EventManager({
            name,
            email,
            password, // You should hash the password before saving it
            status: 'pending'
        });

        // Save to DB
        await newEventManager.save();

        // Notify Admin about the new Event Manager registration (you could implement this in a separate service)

        res.status(201).json({
            message: 'Event Manager registered successfully. Waiting for admin approval.',
            eventManager: newEventManager
        });

    } catch (error) {
        console.error(error);
        console.log('error1');
        res.status(500).json({ message: 'Server error' });
    }
};

// You can add other controller methods like approving the Event Manager, etc.
