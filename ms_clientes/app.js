const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const clientesRoute = require('./src/routes/clientes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001',  // Asegúrate de que esta URL apunte a tu frontend
}));


// Conectar a la base de datos
connectDB();

app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Rutas
app.use('/api/clientes',clientesRoute);

// Iniciar el servidor
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
