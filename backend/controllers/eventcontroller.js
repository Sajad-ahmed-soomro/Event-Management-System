
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

    // Create a map to track the found sponsors by name
    const foundSponsorsMap = sponsors.reduce((map, sponsor) => {
      // If the sponsor's name already exists in the map, increment its count
      if (map[sponsor.name]) {
        map[sponsor.name].push(sponsor._id);
      } else {
        map[sponsor.name] = [sponsor._id];
      }
      return map;
    }, {});
    
    const missingSponsors = [];
    
    // Check for each sponsor name in sponsorsNames if it's found
    for (let name of sponsorsNames) {
      if (!foundSponsorsMap[name] || foundSponsorsMap[name].length === 0) {
        missingSponsors.push(name);
      } else {
        // For each sponsor name found, we can pop an ID and assign it
        foundSponsorsMap[name].pop(); // Remove used ID
      }
    }
    
    // If there are any missing sponsors, return an error
    if (missingSponsors.length > 0) {
      console.log(`Sponsors not found: ${missingSponsors.join(', ')}`);
      return res.status(400).json({
        error: `Some sponsors were not found: ${missingSponsors.join(', ')}`
      });
    }
    
    // If all sponsors are found, map the found IDs for further processing
    const sponsorIds = Object.values(foundSponsorsMap).flat();
    

    // Create the new event
    const newEvent = new Event({
      title,
      category,
      date,
      location,
      managerId: manager._id,  // Use the manager's ObjectId
      sponsors: sponsorIds,  // Use the sponsors' ObjectIds
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
const updateEvent = async (req, res) => {
  try {
    const { title, category, date, location, managerName, sponsorsNames } = req.body;

    // Find the manager by name
    const manager = await Manager.findOne({ name: managerName });
    if (!manager) {
      return res.status(400).json({ error: 'Manager not found with the provided name.' });
    }

    // Find sponsors by their names
    const sponsors = await Sponsor.find({ name: { $in: sponsorsNames } });

    // Create a map to track the found sponsors by name
    const foundSponsorsMap = sponsors.reduce((map, sponsor) => {
      map[sponsor.name] = sponsor._id;
      return map;
    }, {});
    
    const missingSponsors = [];

    // Check for each sponsor name in sponsorsNames if it's found
    for (let name of sponsorsNames) {
      if (!foundSponsorsMap[name]) {
        missingSponsors.push(name);
      }
    }

    // If there are any missing sponsors, return an error
    if (missingSponsors.length > 0) {
      return res.status(400).json({
        error: `Sponsors not found: ${missingSponsors.join(', ')}`
      });
    }

    // Map the found sponsors' IDs
    const sponsorIds = sponsors.map(sponsor => sponsor._id);

    // Prepare the updated event data
    const updatedEventData = {
      title,
      category,
      date,
      location,
      managerId: manager._id,  // Use the manager's ObjectId
      sponsors: sponsorIds,  // Use the sponsors' ObjectIds
    };

    // Find and update the event
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updatedEventData, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);  // Log the error
    res.status(500).json({ error: 'Failed to update event', details: error.message });
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
