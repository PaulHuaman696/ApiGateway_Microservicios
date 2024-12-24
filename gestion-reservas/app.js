const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const reservasRoute = require('./src/routes/reservas');
const mesasRoute = require('./src/routes/mesas');
const cors = require('cors');
const IPLocal = require('./src/utils/obtenerIpAsociado');

dotenv.config();

const app = express();
app.use(express.json());



app.use(cors({
  origin: `http://${IPLocal}:3001`,  // Asegúrate de que esta URL apunte a tu frontend
}));


// Conectar a la base de datos
connectDB();

app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Rutas
app.use('/api/reservas', reservasRoute);
app.use('/api/mesas', mesasRoute);

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
