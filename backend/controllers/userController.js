const items = []; // Temporary in-memory array

// Get all items
exports.getItems = (req, res) => {
    res.json(items);
};

// Get a single item by ID
exports.getItem = (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    item ? res.json(item) : res.status(404).json({ message: "Item not found" });
};

// Create a new item
exports.createItem = (req, res) => {
    const newItem = { id: items.length + 1, ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
};

// Update an item by ID
exports.updateItem = (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Item not found" });

    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
};

// Delete an item by ID
exports.deleteItem = (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Item not found" });

    items.splice(index, 1);
    res.json({ message: "Item deleted" });
};
