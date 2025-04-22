const { pool } = require('../mysql');

// Get all alarms or filter by created_by user ID
const getAlarms = async (req, res) => {
  try {
    const { created_by } = req.query;
    let query = 'SELECT * FROM alarms';
    let params = [];
    if (created_by) {
      query += ' WHERE created_by = ?';
      params.push(created_by);
    }
    const [rows] = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new alarm
const createAlarm = async (req, res) => {
  try {
    const { name, description, created_by } = req.body;
    const [result] = await pool.query(
      'INSERT INTO alarms (name, description, created_by) VALUES (?, ?, ?)',
      [name, description, created_by]
    );
    const [rows] = await pool.query('SELECT * FROM alarms WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAlarms,
  createAlarm
};
