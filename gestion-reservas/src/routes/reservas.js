const express = require('express');
const { crearReserva } = require('../controllers/reservaController');
const { listarReservas } = require('../controllers/reservaController');
const { obtenerContadores } = require('../controllers/reservaController');
const router = express.Router();


router.post('/', crearReserva);
router.get('/', listarReservas);

// Ruta para obtener estadísticas de solicitudes
router.get('/consumo',obtenerContadores);

module.exports = router;
