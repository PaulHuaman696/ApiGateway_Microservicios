const Menu = require('../models/menu');

const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMenu = async (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;
  try {
    const newMenu = new Menu({ nombre, descripcion, precio, imagen });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Exporta más funciones según sea necesario
module.exports = { getMenus, createMenu };

