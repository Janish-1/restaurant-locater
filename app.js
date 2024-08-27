const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/config'); // Import database configuration
const morgan = require('morgan'); // Import morgan for logging
const fs = require('fs');
const path = require('path');

// Import routes
const restaurantRoutes = require('./routes/restaurantRoutes');
const authRoutes = require('./routes/authRoutes');

const PORT = 3001;
const app = express();

// Create a write stream (in append mode) for the log file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// Use morgan for logging with combined format
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

// Connect to MongoDB
connectDB(); // Call the function to establish MongoDB connection

// Use routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server Status: OK on port ${PORT}`);
});
