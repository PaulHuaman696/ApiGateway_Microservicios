const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  cantidad: { type: Number, required: true },
  estado: { type: String, enum: ['pendiente', 'en preparación', 'listo'], default: 'pendiente' },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pedido', pedidoSchema);

