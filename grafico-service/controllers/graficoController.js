// grafico-service/controllers/graficoController.js
const axios = require('axios');  // Para hacer solicitudes a otros microservicios
const mongoose = require('mongoose');

// Simularemos el consumo con datos estáticos o consultas a una base de datos
let consumoData = {
  reservas: 0,
  mesas: 0,
};

// Esta función obtendrá el número de solicitudes a los servicios de reservas
const obtenerConsumo = async (req, res) => {
  try {
    // Hacer peticiones a los otros microservicios para obtener los datos de consumo
    const responseReservas = await axios.get('http://localhost:4000/api/reservas');
    const responseMesas = await axios.get('http://localhost:4000/api/mesas');
    
    // Suponiendo que la cantidad de solicitudes es simplemente el número de resultados
    consumoData.reservas = responseReservas.data.length; // Aquí deberías contar las solicitudes
    consumoData.mesas = responseMesas.data.length; // Lo mismo para mesas

    return res.json({
      message: 'Datos de consumo obtenidos correctamente.',
      consumo: consumoData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los datos de consumo' });
  }
};

module.exports = { obtenerConsumo };
