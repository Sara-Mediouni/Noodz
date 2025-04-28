const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // plus d’array de tables ici 🎉
});

const RestoModel = mongoose.models.restaurant || mongoose.model('Restaurant', restaurantSchema);
module.exports = RestoModel;
