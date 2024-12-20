const express = require('express');
const { obtenerMesasDisponibles } = require('../controllers/mesaController');
const { crearMesa } = require('../controllers/mesaController');
const { modificarMesa } = require('../controllers/mesaController');
const { obtenerContadores } = require('../controllers/mesaController')
const router = express.Router();

// Ruta para obtener mesas disponibles
router.get('/', obtenerMesasDisponibles);

// Ruta para crear una nueva mesa
router.post('/', crearMesa);

router.put('/:id', modificarMesa)

router.get('/consumo',obtenerContadores);

module.exports = router;
