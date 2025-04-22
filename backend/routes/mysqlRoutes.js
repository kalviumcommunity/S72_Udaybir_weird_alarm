const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser
} = require('../../backend/controllers/mysqlUserController');

const {
  getAlarms,
  createAlarm
} = require('../../backend/controllers/mysqlAlarmController');

// User routes
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);

// Alarm routes
router.get('/alarms', getAlarms);
router.post('/alarms', createAlarm);

module.exports = router;
