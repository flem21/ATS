const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: true,
    enum: ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'],
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: [String],
  },
  resumeText: {
    type: String,
  },
}, {
  // Add timestamps to know when a candidate was created or updated
  timestamps: true,
});

// Mongoose automatically looks for the plural, lowercased version of your model name.
// Thus, for the model 'Candidate', it will use the 'candidates' collection in the database.
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
