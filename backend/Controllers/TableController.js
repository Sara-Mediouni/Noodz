const Table = require('../Models/Table');

// ➕ Create a table
exports.createTable = async (req, res) => {
  try {
    const newTable = new Table(req.body);
    await newTable.save();
    res.status(201).json({ message: 'Table created', table: newTable });
  } catch (error) {
    res.status(500).json({ message: 'Error creating table', error });
  }
};
exports.getTable = async (req, res) => {
  try {
    const id = req.params.id;
    const table=await Table.findById(id);
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ message: 'Error creating table', error });
  }
};

// 📥 Get all tables
exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tables', error });
  }
};

// 🔁 Update a table
exports.updateTable = async (req, res) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTable) return res.status(404).json({ message: 'Table not found' });
    res.json({ message: 'Table updated', table: updatedTable });
  } catch (error) {
    res.status(500).json({ message: 'Error updating table', error });
  }
};

// ❌ Delete a table
exports.deleteTable = async (req, res) => {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id);
    if (!deletedTable) return res.status(404).json({ message: 'Table not found' });
    res.json({ message: 'Table deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting table', error });
  }
};
