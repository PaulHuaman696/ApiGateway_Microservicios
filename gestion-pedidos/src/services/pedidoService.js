const express = require('express');
const { crearReserva } = require('../controllers/reservaController');
const router = express.Router();

router.post('/', crearReserva);

module.exports = router;
