// Get all alarms
const getAlarms = async (req, res) => {
    try {
        const alarms = await getAlarms();
        res.status(200).json(alarms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get alarm by ID
const getAlarmById = async (req, res) => {
    try {
        const alarm = await getAlarmById(req.params.id);
        if (!alarm) {
            return res.status(404).json({ message: 'Alarm not found' });
        }
        res.status(200).json(alarm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new alarm
const createAlarm = async (req, res) => {
    try {
        const newAlarm = await createAlarm(req.body);
        res.status(201).json(newAlarm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update alarm
const updateAlarm = async (req, res) => {
    try {
        const updatedAlarm = await updateAlarm(req.params.id, req.body);
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
        const deletedAlarm = await deleteAlarm(req.params.id);
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
