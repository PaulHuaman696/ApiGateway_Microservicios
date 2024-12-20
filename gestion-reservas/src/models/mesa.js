const mongoose = require('mongoose');

const mesaSchema = new mongoose.Schema({
  numero: { type: Number, required: true, unique: true },
  capacidad: { type: Number, required: true },
  disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Mesa', mesaSchema);
