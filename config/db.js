const mongoose = require('mongoose');
const Candidate = require('../models/candidateModel');
const { seedCandidates } = require('../utils/seedData');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Seed the database
    const count = await Candidate.countDocuments();
    if (count === 0) {
      await Candidate.insertMany(seedCandidates);
      console.log('Database has been seeded with initial data.');
    }
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
