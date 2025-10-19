const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const candidateRoutes = require('./routes/candidateRoutes');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To accept JSON data in the body

// API Routes
app.use('/api/candidates', candidateRoutes);

app.get('/', (req, res) => {
  res.send('Gemini ATS API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
