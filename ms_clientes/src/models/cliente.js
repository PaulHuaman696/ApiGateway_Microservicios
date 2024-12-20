const mongoose = require('mongoose');

// Definición del esquema para el cliente
const clienteSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true, 
    trim: true, // Elimina espacios innecesarios al inicio y final
    minlength: 2, // Longitud mínima
    maxlength: 50 // Longitud máxima
  },
  correo: { 
    type: String, 
    required: true, 
    unique: true, // Cada correo debe ser único
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validación básica para correos
  },
  telefono: { 
    type: String, 
    required: true, 
    match: /^\d{9,15}$/ // Ejemplo: entre 9 y 15 dígitos
  },
  direccion: { 
    type: String, 
    trim: true, 
    maxlength: 100 // Longitud máxima opcional
  },
  registradoEn: { 
    type: Date, 
    default: Date.now // Fecha de registro
  },
  activo: { 
    type: Boolean, 
    default: true // Si el cliente está activo
  }
});

module.exports = mongoose.model('Cliente', clienteSchema);
