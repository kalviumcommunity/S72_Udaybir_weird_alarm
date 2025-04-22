const express = require("express");
const router = express.Router();

const {
    getAlarms,
    getAlarmById,
    createAlarm,
    updateAlarm,
    deleteAlarm
} = require("../controllers/alarmController");

const {
    getUsers,
    login,
    logout
} = require("../controllers/userController");

// Alarm routes
router.get("/alarms", getAlarms);
router.get("/alarms/:id", getAlarmById);
router.post("/alarms", createAlarm);
router.put("/alarms/:id", updateAlarm);
router.delete("/alarms/:id", deleteAlarm);

// User routes
router.get("/users", getUsers);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
