const express = require('express');
const router = express.Router();
const controller = require('../Controllers/RestoController');

router.post('/tables', controller.addTable);
router.get('/tables', controller.getAllTables);
router.get('/tablebyid/:tableId', controller.getTableById);
router.put('/tables/:tableId', controller.updateTable);
router.delete('/tables/:tableId', controller.deleteTable);

module.exports = router;
