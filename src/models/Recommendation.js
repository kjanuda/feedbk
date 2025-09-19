const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: { type: String }, // <-- store Gmail profile picture
  organization: { type: String },
  feedback: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Recommendation", recommendationSchema);
