const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const { registerEventManager } = require('../controllers/managerController');

// Route to get all managers
router.get('/', managerController.getAllManagers);

// Route to get manager by ID
router.get('/:id', managerController.getManagerById);




// Route for registering an Event Manager
router.post('/register', registerEventManager);

module.exports = router;


module.exports = router;
