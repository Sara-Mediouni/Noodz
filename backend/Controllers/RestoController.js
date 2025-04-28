const RestoModel = require('../Models/Restaurant');

// Add a new table
exports.addTable = async (req, res) => {
  try {
    const newTable = req.body;
    const resto = await RestoModel.findOne(); // Assuming one restaurant document

    if (!resto) {
      const created = new RestoModel({ tables: [newTable] });
      await created.save();
      return res.status(201).json(created);
    }

    resto.tables.push(newTable);
    await resto.save();
    res.status(201).json(resto);
  } catch (error) {
    res.status(500).json({ message: 'Error adding table', error });
  }
};

// Get all tables
exports.getAllTables = async (req, res) => {
  try {
    const resto = await RestoModel.findOne();
    if (!resto) return res.status(404).json({ message: 'No restaurant found' });
    res.json(resto.tables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tables', error });
  }
};

// Update a specific table by ID
exports.updateTable = async (req, res) => {
  try {
    const { tableId } = req.params;
    const table = req.body;

    const resto = await RestoModel.findOne();
    if (!resto) return res.status(404).json({ message: 'No restaurant found' });

    const updateTable = resto.tables.id(tableId);
    if (!table) return res.status(404).json({ message: 'Table not found' });

    Object.assign(updateTable, table);
    await resto.save();
    res.json({ message: 'Table updated', table });
  } catch (error) {
    res.status(500).json({ message: 'Error updating table', error });
  }
};
exports.getTableById = async (req, res) => {
  try {
    const { tableId } = req.params;
   
    const resto = await RestoModel.findOne();
    if (!resto) return res.status(404).json({ message: 'No restaurant found' });

    const table = resto.tables.id(tableId);
    if (!table) return res.status(404).json({ message: 'Table not found' });
    
  
    res.json({ message: 'Table', table });
  } catch (error) {
    res.status(500).json({ message: 'Error getting table', error });
  }
};
// Delete a specific table by ID
exports.deleteTable = async (req, res) => {
  try {
    const { tableId } = req.params;

    const resto = await RestoModel.findOne();
    if (!resto) return res.status(404).json({ message: 'No restaurant found' });

    const tables = resto.tables.id(tableId);
    if (!tables) return res.status(404).json({ message: 'Table not found' });

    tables.remove()
    await resto.save();
    res.json({ message: 'Table deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting table', error });
  }
};
