// Import necessary modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Added cookie-parser
require('dotenv').config();

const app = express();
const port = 3000;

// Import MongoDB routes
const mongoRoutes = require('../routes/routes');

// Import MySQL routes
const mysqlRoutes = require('../routes/mysqlRoutes');

app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Use MongoDB routes
app.use('/api', mongoRoutes);

// Use MySQL routes
app.use('/mysql-api', mysqlRoutes);

// Basic /ping route with error handling
app.get('/ping', (req, res, next) => {
  try {
    res.send('Pong');
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Catch-all error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
  });
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The resource at ${req.originalUrl} was not found on this server.`,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
