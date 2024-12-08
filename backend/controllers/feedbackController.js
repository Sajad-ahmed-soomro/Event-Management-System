const Feedback = require('../models/Feedback');

// Get all feedbacks for a specific event
exports.getFeedbackForEvent = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ eventId: req.params.eventId })
      .populate('userId', 'name email') // Get user details (name, email)
      .populate('eventId', 'title') // Get event title
      .exec();
    
    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ message: 'No feedback found for this event' });
    }

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
};

// Delete feedback
// Delete feedback by ID using findByIdAndDelete
exports.deleteFeedback = async (req, res) => {
    try {
      const feedbackId = req.params.id;
  
      // Attempt to delete feedback using Mongoose's findByIdAndDelete
      console.log(feedbackId);
      const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);
      console.log(deletedFeedback);
  
      if (!deletedFeedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
  
      res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting feedback' });
    }
  };
  
