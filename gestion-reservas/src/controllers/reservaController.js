const Reserva = require('../models/reserva');
const Mesa = require('../models/mesa');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] : ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'gestionReservas.log' })
  ],
});

// Contadores para las solicitudes
let contadorListarReservas = 0;
let contadorCrearReserva = 0;

// Crear reserva
// Lógica para crear una reserva
const crearReserva = async (req, res) => {

  contadorCrearReserva++;

  const { cliente, mesa, hora } = req.body;

  logger.info(`Crear Reserva:${cliente},${mesa},${hora}`);

  // Busca la mesa por su número
  const mesaEncontrada = await Mesa.findOne({ numero: mesa });

  // Si la mesa es encontrada, crea la reserva
  try {
    if (!mesaEncontrada) {
      return res.status(400).json({ error: 'Mesa no encontrada' });
    }
    const nuevaReserva = new Reserva({
      nombreCliente: cliente,
      fechaHora: hora,
      mesa: mesaEncontrada._id, // Usamos el ObjectId de la mesa
    });

    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);  // Devuelve la nueva reserva
    logger.info('Reserva Creada');
  } catch (error) {

    logger.error('Error al crear la reserva:');
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};


// Listar reservas
const listarReservas = async (req, res) => {
  
  try {
    contadorListarReservas++;
    const reservas = await Reserva.find().populate('mesa', 'numero capacidad disponible'); // También puedes obtener los datos de la mesa asociada
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
};

// Función para obtener el número de solicitudes
const obtenerContadores = (req, res) => {
  res.status(200).json({
    solicitudesListarReservas: contadorListarReservas,
    solicitudesCrearReserva: contadorCrearReserva,
    totalSolicitudes: contadorListarReservas + contadorCrearReserva,
  });
};

module.exports = { crearReserva, listarReservas, obtenerContadores};
