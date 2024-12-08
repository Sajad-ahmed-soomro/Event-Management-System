const Staff = require('../models/Staff'); // Assuming you have a Staff model
const Equipment = require('../models/Equipment'); // Assuming you have an Equipment model
const Venue = require('../models/Venue'); // Assuming you have a Venue model

// GET all staff for a specific event
exports.getStaffByEvent = async (req, res) => {
  try {
    const staff = await Staff.find({ eventId: req.params.eventId });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff data' });
  }
};

// GET all equipment for a specific event
exports.getEquipmentByEvent = async (req, res) => {
  try {
    const equipment = await Equipment.find({ eventId: req.params.eventId });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching equipment data' });
  }
};

// GET all venues for a specific event
exports.getVenuesByEvent = async (req, res) => {
  try {
    const venues = await Venue.find({ eventId: req.params.eventId });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching venue data' });
  }
};

// POST (Add) new staff for a specific event
exports.addStaff = async (req, res) => {
    const { name, role, eventId, contactInfo } = req.body; // Include contactInfo in the destructuring
    try {
      const newStaff = new Staff({
        name,
        role,
        eventId,
        contactInfo, // Add contactInfo field to the new staff document
      });

      console.log(newStaff);
  
      await newStaff.save();
      res.status(201).json(newStaff);
    } catch (error) {
      res.status(500).json({ message: 'Error adding staff' });
    }
  };
  

// POST (Add) new equipment for a specific event
exports.addEquipment = async (req, res) => {
  const { name, quantity,condition, eventId } = req.body;
  try {
    const newEquipment = new Equipment({ name, quantity,condition, eventId });

    console.log(newEquipment);
    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(500).json({ message: 'Error adding equipment' });
  }
};

// POST (Add) new venue for a specific event
exports.addVenue = async (req, res) => {
  const { name, location, capacity, eventId } = req.body;
  try {
    const newVenue = new Venue({ name, location, capacity, eventId });
    await newVenue.save();
    res.status(201).json(newVenue);
  } catch (error) {
    res.status(500).json({ message: 'Error adding venue' });
  }
};

// DELETE a staff member
exports.deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.staffId);
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting staff' });
  }
};

// DELETE an equipment item
exports.deleteEquipment = async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.equipmentId);
    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting equipment' });
  }
};

// DELETE a venue
exports.deleteVenue = async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.venueId);
    res.status(200).json({ message: 'Venue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting venue' });
  }
};
