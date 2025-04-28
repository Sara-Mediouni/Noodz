const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  name: { type: String, required: true },       // ex: "T1"
  chairs: { type: Number, required: true },
  cx: { type: Number, required: true },
  cy: { type: Number, required: true },
  type: { type: String, required: true },
  reserved: { type: Boolean, default: false },
  reservedUntil:{ type: Date, required: false },
 // restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
});

const TableModel = mongoose.models.table || mongoose.model('Table', tableSchema);
module.exports = TableModel;
