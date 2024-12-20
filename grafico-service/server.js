// grafico-service/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const graficoRoutes = require('./routes/graficoRoutes');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({

  origin: 'http://localhost:3001',  // Asegúrate de que esta URL apunte a tu frontend
}));

connectDB();

app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Rutas
app.use('/api/grafico/services', graficoRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Microservicio de gráficos corriendo en http://localhost:${PORT}`);
});

