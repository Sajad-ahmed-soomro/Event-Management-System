const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  condition: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
});

module.exports = mongoose.model('Equipment', equipmentSchema);
