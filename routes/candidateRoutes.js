const express = require('express');
const router = express.Router();
const {
  getCandidates,
  createCandidate,
  updateCandidate,
} = require('../controllers/candidateController');

// Route for getting all candidates and creating a new one
router.route('/').get(getCandidates).post(createCandidate);

// Route for updating a single candidate by their ID
router.route('/:id').put(updateCandidate);

module.exports = router;
