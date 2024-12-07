
const mongoose = require('mongoose');
const Manager = require('../models/EventManager');  // Assuming you have a Manager model
const Sponsor = require('../models/Sponsor');  // Assuming you have a Sponsor model
const Event = require('../models/Event');  // Assuming you have an Event model

const createEvent = async (req, res) => {
  try {
    const { title, category, date, location, managerName, sponsorsNames } = req.body;

    // Find the manager by name
    const manager = await Manager.findOne({ name: managerName });
    if (!manager) {
        console.log('error1');
      return res.status(400).json({ error: 'Manager not found with the provided name.' });
    }

    // Find sponsors by their names
    const sponsors = await Sponsor.find({ name: { $in: sponsorsNames } });
    if (sponsors.length !== sponsorsNames.length) {
        console.log('error2');
      return res.status(400).json({ error: 'Some sponsors were not found.' });
    }

    // Create the new event
    const newEvent = new Event({
      title,
      category,
      date,
      location,
      managerId: manager._id,  // Use the manager's ObjectId
      sponsors: sponsors.map(sponsor => sponsor._id),  // Use the sponsors' ObjectIds
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created and awaiting approval', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);  // Log the error
    res.status(500).json({ error: 'Failed to create event', details: error.message });
  }
};


module.exports = { createEvent };



// READ: Get all events (show only approved events for Event Manager)
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ approvalStatus: 'Accepted' });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// READ: Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// UPDATE: Update event details (Admin Approval)
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// DELETE: Remove an event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
