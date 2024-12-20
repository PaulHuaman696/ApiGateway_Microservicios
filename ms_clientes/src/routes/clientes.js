const express = require('express');
const { obtenerClientesActivos } = require('../controllers/clienteController');
const { crearCliente } = require('../controllers/clienteController');
const { modificarCliente } = require('../controllers/clienteController');
const { obtenerContadores } = require('../controllers/clienteController');
const router = express.Router();

// Ruta para obtener mesas disponibles
router.get('/', obtenerClientesActivos);

// Ruta para crear una nueva mesa
router.post('/', crearCliente);

router.put('/:id', modificarCliente);

// Ruta para obtener estadísticas de solicitudes
router.get('/consumo',obtenerContadores);

module.exports = router;
