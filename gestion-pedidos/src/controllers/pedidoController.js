const Pedido = require('../models/pedido');

const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('menuId');
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPedido = async (req, res) => {
  const { cliente, menuId, cantidad, estado } = req.body;
  try {
    const newPedido = new Pedido({ cliente, menuId, cantidad, estado });
    await newPedido.save();
    res.status(201).json(newPedido);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Exporta más funciones según sea necesario
module.exports = { getPedidos, createPedido };
