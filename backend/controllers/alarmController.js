const { getAlarms: getAlarmsFromModel, createAlarm: createAlarmInModel, getAlarmById: getAlarmByIdFromModel, updateAlarm: updateAlarmInModel, deleteAlarm: deleteAlarmInModel } = require("../models/alarmModel");

// Get all alarms with optional filtering by created_by
const getAlarms = async (req, res) => {
    try {
        const filter = {};
        if (req.query.created_by) {
            filter.created_by = req.query.created_by;
        }
        const alarms = await getAlarmsFromModel(filter);
        res.status(200).json(alarms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get alarm by ID
const getAlarmById = async (req, res) => {
    try {
        const alarm = await getAlarmByIdFromModel(req.params.id);
        if (!alarm) {
            return res.status(404).json({ message: 'Alarm not found' });
        }
        res.status(200).json(alarm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new alarm, including created_by
const createAlarm = async (req, res) => {
    try {
        const { name, time, created_by } = req.body;
        if (!name || !time || !created_by) {
            return res.status(400).json({ error: "Missing required fields: name, time, and created_by are required." });
        }
        const newAlarm = await createAlarmInModel(req.body);
        res.status(201).json(newAlarm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update alarm
const updateAlarm = async (req, res) => {
    try {
        const updatedAlarm = await updateAlarmInModel(req.params.id, req.body);
        if (!updatedAlarm) {
            return res.status(404).json({ message: 'Alarm not found' });
        }
        res.status(200).json(updatedAlarm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete alarm
const deleteAlarm = async (req, res) => {
    try {
        const deletedAlarm = await deleteAlarmInModel(req.params.id);
        if (!deletedAlarm) {
            return res.status(404).json({ message: 'Alarm not found' });
        }
        res.status(200).json({ message: 'Alarm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAlarms,
    getAlarmById,
    createAlarm,
    updateAlarm,
    deleteAlarm
};
