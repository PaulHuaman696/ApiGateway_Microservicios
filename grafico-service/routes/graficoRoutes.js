// microservicio-graficos/routes/grafico.js

const express = require('express');
const router = express.Router();
const axios = require('axios');

// Ruta para obtener el consumo de servicios de otros microservicios
router.get('/consumo-servicios', async (req, res) => {
  try {
    // Hacer solicitudes a ambos microservicios para obtener los datos de consumo
    const [reservaResponse, mesaResponse] = await Promise.all([
      axios.get('http://localhost:4000/api/reservas/consumo'), // Datos de consumo de reservas
      axios.get('http://localhost:4000/api/mesas/consumo') // Datos de consumo de mesas
    ]);

    // Procesar los datos de ambos microservicios
    const reservasData = reservaResponse.data;
    const mesasData = mesaResponse.data;

    // Combinar los datos de consumo en un solo objeto
    const serviciosConsumo = [
      {
        servicio: 'Listar Reservas',
        consumo: reservasData.solicitudesListarReservas,
      },
      {
        servicio: 'Crear Reserva',
        consumo: reservasData.solicitudesCrearReserva,
      },
      {
        servicio: 'Listar Mesas',
        consumo: mesasData.solicitudesListarMesas,
      },
      {
        servicio: 'Crear Mesa',
        consumo: mesasData.solicitudesCrearMesa,
      }
    ];

    // Enviar la respuesta de la API de ms_grafico de vuelta al cliente
    res.json(serviciosConsumo);
    
  } catch (error) {
    console.error('Error al obtener o combinar los datos de consumo de servicios:', error);
    res.status(500).json({ message: 'Error al obtener o combinar los datos de consumo de servicios' });
  }
});

module.exports = router;
