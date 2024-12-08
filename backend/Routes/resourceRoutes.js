const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Staff Routes
router.get('/staff/event/:eventId', resourceController.getStaffByEvent);
router.post('/staff', resourceController.addStaff);
router.delete('/staff/:staffId', resourceController.deleteStaff);

// Equipment Routes
router.get('/equipment/event/:eventId', resourceController.getEquipmentByEvent);
router.post('/equipment', resourceController.addEquipment);
router.delete('/equipment/:equipmentId', resourceController.deleteEquipment);

// Venue Routes
router.get('/venues/event/:eventId', resourceController.getVenuesByEvent);
router.post('/venues', resourceController.addVenue);
router.delete('/venues/:venueId', resourceController.deleteVenue);

module.exports = router;
