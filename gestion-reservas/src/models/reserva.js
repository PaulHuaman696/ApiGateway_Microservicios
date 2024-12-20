const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  nombreCliente: { type: String, required: true },
  fechaHora: { type: Date, required: true },
  mesa: { type: mongoose.Schema.Types.ObjectId, ref: 'Mesa', required: true }
});

module.exports = mongoose.model('Reserva', reservaSchema);

