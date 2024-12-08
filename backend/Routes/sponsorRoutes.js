const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');

// Route to get all sponsors
router.get('/', sponsorController.getAllSponsors);

// Route to get sponsor by ID
router.get('/:id', sponsorController.getSponsorById);

module.exports = router;
