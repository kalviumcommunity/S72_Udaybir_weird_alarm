const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Parse JSON bodies
app.use(express.json());

// Database setup
const { connectDB } = require('./backend/db');

// Basic /ping route with error handling
app.get('/ping', (req, res, next) => {
  try {
    res.send('Pong');
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// MongoDB connection status route
app.get('/', async (req, res, next) => {
  try {
    // Try connecting to MongoDB
    await client.connect();
    const database = client.db('your-database-name');
    const status = await database.command({ ping: 1 });
    res.json({
      message: 'Connected to MongoDB',
      status: status,
    });
  } catch (error) {
    next(error); // Pass any error to the error-handling middleware
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

// Start the server after DB connection
async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
