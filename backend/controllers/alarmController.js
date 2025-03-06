const { getAlarms: getAlarmsFromModel } = require("../models/alarmModel");

// Get all alarms
const getAlarms = async (req, res) => {
    try {
        const alarms = await getAlarmsFromModel();
        res.status(200).json(alarms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const { getAlarmById: getAlarmByIdFromModel } = require("../models/alarmModel");

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

const { createAlarm: createAlarmInModel } = require("../models/alarmModel");

// Create new alarm
const createAlarm = async (req, res) => {
    try {
        const newAlarm = await createAlarmInModel(req.body);
        res.status(201).json(newAlarm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const { updateAlarm: updateAlarmInModel } = require("../models/alarmModel");

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

const { deleteAlarm: deleteAlarmInModel } = require("../models/alarmModel");

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
