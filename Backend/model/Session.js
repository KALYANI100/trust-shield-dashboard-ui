const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  userAgent: { type: String },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
});

module.exports = mongoose.model('Session', SessionSchema);
