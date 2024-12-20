const Cliente = require('../models/cliente');

// Contadores para las solicitudes
let contadorListarClientes = 0;
let contadorCrearCliente = 0;

// Obtener clientes activos
const obtenerClientesActivos = async (req, res) => {
  try {
    contadorListarClientes++;
    // Busca los clientes que estén activos
    const clientes = await Cliente.find({ activo: true });
    res.json(clientes);
  } catch (err) {
    // Manejo de errores
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

// Crear cliente
const crearCliente = async (req, res) => {
  contadorCrearCliente++;
  const { nombre, correo, telefono, direccion } = req.body;
  try {
    // Crear un nuevo cliente con los datos proporcionados
    const nuevoCliente = new Cliente({ nombre, correo, telefono, direccion });
    await nuevoCliente.save(); // Guardar en la base de datos
    res.status(201).json(nuevoCliente); // Devolver el cliente creado con estado 201
  } catch (err) {
    // Manejar errores
    res.status(500).json({ error: 'Error al crear el cliente', detalles: err.message });
  }
};

// Modificar cliente
const modificarCliente = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del cliente desde los parámetros de la URL
  const { nombre, correo, telefono, direccion, activo } = req.body; // Obtenemos los nuevos valores desde el cuerpo de la solicitud

  try {
    // Buscamos el cliente por su ID y actualizamos los campos especificados
    const clienteModificado = await Cliente.findByIdAndUpdate(
      id,
      { nombre, correo, telefono, direccion, activo }, // Campos a actualizar
      { new: true, runValidators: true } // Devuelve el documento actualizado y ejecuta las validaciones del modelo
    );

    if (!clienteModificado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Respondemos con el cliente modificado
    res.json(clienteModificado);
  } catch (err) {
    // Manejo de errores
    res.status(500).json({ error: 'Error al modificar el cliente', detalles: err.message });
  }
};

// Función para obtener el número de solicitudes
const obtenerContadores = (req, res) => {
  res.status(200).json({
    solicitudesListarClientes: contadorListarClientes,
    solicitudesCrearCliente: contadorCrearCliente,
    totalSolicitudes: contadorListarClientes + contadorCrearCliente,
  });
};

module.exports = { obtenerClientesActivos, crearCliente, modificarCliente, obtenerContadores};
