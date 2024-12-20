const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  imagen: { type: String },
});

module.exports = mongoose.model('Menu', menuSchema);

