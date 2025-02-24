const express = require("express");
const router = express.Router();
const { getAlarms, getAlarmById, createAlarm, updateAlarm, deleteAlarm } = require("../controllers/alarmController");

// CRUD routes
router.get("/alarms", getAlarms);          // Get all alarms
router.get("/alarms/:id", getAlarmById);   // Get alarm by ID
router.post("/alarms", createAlarm);       // Create new alarm
router.put("/alarms/:id", updateAlarm);    // Update alarm
router.delete("/alarms/:id", deleteAlarm); // Delete alarm

module.exports = router;
