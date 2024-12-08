const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedbackController');

// Get feedback for a specific event
router.get('/event/:eventId', FeedbackController.getFeedbackForEvent);

// Delete feedback
router.delete('/:id', FeedbackController.deleteFeedback);

module.exports = router;
