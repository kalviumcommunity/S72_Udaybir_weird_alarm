// Import necessary modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = 3000;

// Import routes
const mongoRoutes = require('../routes/routes');
const mysqlRoutes = require('../routes/mysqlRoutes');
const authRoutes = require('../routes/auth'); // 👈 Auth route

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // 👈 Required for cookies
}));
app.use(express.json());
app.use(cookieParser());

// Use routes
app.use('/api', mongoRoutes);
app.use('/mysql-api', mysqlRoutes);
app.use('/api/auth', authRoutes); // 👈 Auth endpoint

// Basic /ping route
app.get('/ping', (req, res, next) => {
  try {
    res.send('Pong');
  } catch (error) {
    next(error);
  }
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The resource at ${req.originalUrl} was not found on this server.`,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
