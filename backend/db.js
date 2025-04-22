const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/weird_alarm';
let db = null;

async function connectDB() {
  if (db) return db;
  
  const client = new MongoClient(mongoURI);
  try {
    await client.connect();
    db = client.db();
    console.log('MongoDB connected successfully');
    return db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

function getDb() {
  if (!db) throw new Error('Database not connected');
  return db;
}

module.exports = {
  connectDB,
  getDb
};
