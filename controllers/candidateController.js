const Candidate = require('../models/candidateModel');

// @desc    Get all candidates
// @route   GET /api/candidates
// @access  Public
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({}).sort({ createdAt: -1 }); // sort by newest
    // In Mongoose 6+, the `_id` field is an object. Convert it to a string for frontend compatibility.
    const transformedCandidates = candidates.map(c => ({...c.toObject(), id: c._id.toString()}));
    res.json(transformedCandidates);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new candidate
// @route   POST /api/candidates
// @access  Public
const createCandidate = async (req, res) => {
  try {
    const { name, email, phone, role, stage, notes, resumeText } = req.body;

    const candidateExists = await Candidate.findOne({ email });

    if (candidateExists) {
      return res.status(400).json({ message: 'Candidate with this email already exists' });
    }
    
    const avatarUrl = `https://picsum.photos/seed/${Date.now()}/100`;
    const applicationDate = new Date().toISOString();

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      role,
      stage,
      notes,
      resumeText,
      avatarUrl,
      applicationDate,
    });
    
    const newCandidate = {...candidate.toObject(), id: candidate._id.toString()};
    res.status(201).json(newCandidate);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a candidate
// @route   PUT /api/candidates/:id
// @access  Public
const updateCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);

        if (candidate) {
            // Update fields that are passed in the request body
            candidate.name = req.body.name || candidate.name;
            candidate.email = req.body.email || candidate.email;
            candidate.phone = req.body.phone || candidate.phone;
            candidate.role = req.body.role || candidate.role;
            candidate.stage = req.body.stage || candidate.stage;
            candidate.notes = req.body.notes || candidate.notes;
            candidate.resumeText = req.body.resumeText || candidate.resumeText;

            const updatedCandidate = await candidate.save();
            const transformedCandidate = {...updatedCandidate.toObject(), id: updatedCandidate._id.toString()};
            res.json(transformedCandidate);
        } else {
            res.status(404).json({ message: 'Candidate not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
  getCandidates,
  createCandidate,
  updateCandidate,
};
