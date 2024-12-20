const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/config/db');
const menuController = require('./src/controllers/menuController');
const pedidoController = require('./src/controllers/pedidoController');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.get('/menus', menuController.getMenus);
app.post('/menus', menuController.createMenu);
app.get('/pedidos', pedidoController.getPedidos);
app.post('/pedidos', pedidoController.createPedido);

// Puerto de ejecución
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
