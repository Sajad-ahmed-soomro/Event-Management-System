const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventcontroller');



router.post('/create', eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;