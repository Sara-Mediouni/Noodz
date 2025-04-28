const express = require('express');
const router = express.Router();
const tableController = require('../Controllers/TableController');

router.post('/', tableController.createTable);
router.get('/:id', tableController.getTable);
router.get('/', tableController.getAllTables);
router.put('/:id', tableController.updateTable);
router.delete('/:id', tableController.deleteTable);

module.exports = router;
