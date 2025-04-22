const { getDb } = require('../db');
const collectionName = 'users';

// Get all users
const getUsers = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection(collectionName);
        const users = await collection.find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection(collectionName);
        const user = await collection.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(req.body);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection(collectionName);
        const result = await collection.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { returnDocument: 'after' }
        );
        if (!result.value) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(result.value);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login user and set username cookie
const login = (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }
    res.cookie('username', username, { httpOnly: true });
    res.json({ message: 'Login successful' });
};

// Logout user and clear username cookie
const logout = (req, res) => {
    res.clearCookie('username');
    res.json({ message: 'Logout successful' });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout
};
