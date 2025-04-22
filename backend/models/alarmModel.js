const { getDb } = require('../db');
const collectionName = 'alarms';

// Get all alarms with optional filter
const getAlarms = async (filter = {}) => {
    const db = getDb();
    const collection = db.collection(collectionName);
    const alarms = await collection.find(filter).toArray();
    return alarms;
};

// Get alarm by ID
const getAlarmById = async (id) => {
    const db = getDb();
    const collection = db.collection(collectionName);
    const alarm = await collection.findOne({ _id: id });
    return alarm;
};

// Create new alarm
const createAlarm = async (alarmData) => {
    const db = getDb();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(alarmData);
    return result.ops[0];
};

// Update alarm
const updateAlarm = async (id, updateData) => {
    const db = getDb();
    const collection = db.collection(collectionName);
    const result = await collection.findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        { returnDocument: 'after' }
    );
    return result.value;
};

// Delete alarm
const deleteAlarm = async (id) => {
    const db = getDb();
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: id });
    return result.deletedCount > 0;
};

module.exports = {
    getAlarms,
    getAlarmById,
    createAlarm,
    updateAlarm,
    deleteAlarm
};
