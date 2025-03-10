const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
const routes = require('./routes/routes');

// Middleware
app.use(express.json());

// MongoDB client setup
let client;
async function connectToMongoDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    client = new MongoClient(process.env.MONGODB_URI.trim(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Connect to MongoDB before starting server
console.log('Attempting to connect to MongoDB...');
connectToMongoDB().then(() => {
  console.log('MongoDB connection established');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Use routes
app.use('/api', routes);

// Health check route
app.get('/ping', (req, res) => {
  res.send('Pong');
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Weird Alarm API',
    status: 'running',
    version: '1.0.0'
  });
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
console.log('Starting server on port:', port);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
  }
});
