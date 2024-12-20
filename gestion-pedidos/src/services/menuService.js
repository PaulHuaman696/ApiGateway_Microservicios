const express = require('express');
const { obtenerMesasDisponibles } = require('../controllers/mesaController');
const router = express.Router();

router.get('/', obtenerMesasDisponibles);

module.exports = router;
