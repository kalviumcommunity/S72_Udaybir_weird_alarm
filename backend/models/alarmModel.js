const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = 'weird_alarm';
const collectionName = 'alarms';

// Get all alarms
const getAlarms = async () => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const alarms = await collection.find({}).toArray();
        return alarms;
    } finally {
        await client.close();
    }
};

// Get alarm by ID
const getAlarmById = async (id) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const alarm = await collection.findOne({ _id: id });
        return alarm;
    } finally {
        await client.close();
    }
};

// Create new alarm
const createAlarm = async (alarmData) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(alarmData);
        return result.ops[0];
    } finally {
        await client.close();
    }
};

// Update alarm
const updateAlarm = async (id, updateData) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.findOneAndUpdate(
            { _id: id },
            { $set: updateData },
            { returnDocument: 'after' }
        );
        return result.value;
    } finally {
        await client.close();
    }
};

// Delete alarm
const deleteAlarm = async (id) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({ _id: id });
        return result.deletedCount > 0;
    } finally {
        await client.close();
    }
};

module.exports = {
    getAlarms,
    getAlarmById,
    createAlarm,
    updateAlarm,
    deleteAlarm
};
