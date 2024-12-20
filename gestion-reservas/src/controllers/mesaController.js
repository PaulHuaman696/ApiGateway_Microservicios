const Mesa = require('../models/mesa');

// Contadores para las solicitudes
let contadorListarMesas = 0;
let contadorCrearMesa = 0;

// Obtener mesas disponibles
const obtenerMesasDisponibles = async (req, res) => {
  try {
    contadorListarMesas++;
    const mesas = await Mesa.find({ disponible: true });
    res.json(mesas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mesas' });
  }
};

// Crear mesa
const crearMesa = async (req, res) => {

  contadorCrearMesa++;

  const { numero, capacidad, disponible } = req.body;

  // Convertir 'disponible' a booleano si es necesario
  const disponibleBoolean = disponible === 'sí' ? true : (disponible === 'no' ? false : disponible);

  try {
    // Verificar si ya existe una mesa con el mismo número
    const mesaExistente = await Mesa.findOne({ numero });

    if (mesaExistente) {
      // Si ya existe una mesa con el número, enviar un error
      return res.status(400).json({ error: 'Ya existe una mesa con ese número' });
    }

    // Si no existe, crear la nueva mesa
    const nuevaMesa = new Mesa({
      numero,
      capacidad,
      disponible: disponibleBoolean, // Asegurarse de que el valor sea un booleano
    });
    
    await nuevaMesa.save();

    // Responder con mensaje de éxito y detalles de la mesa creada
    res.status(201).json({
      message: 'Mesa creada exitosamente',
      mesa: nuevaMesa,
    });
  } catch (err) {
    console.error('Error al crear la mesa:', err);
    res.status(500).json({ error: 'Error al crear la mesa' });
  }
};

// Modificar mesa
const modificarMesa = async (req, res) => {
  const { id } = req.params;  // Obtenemos el ID de la mesa a modificar desde los parámetros de la URL
  const { numero, capacidad, disponible } = req.body;  // Obtenemos los nuevos valores desde el cuerpo de la solicitud

  try {
    // Buscamos la mesa por su ID y actualizamos los campos especificados
    const mesaModificada = await Mesa.findByIdAndUpdate(
      id,
      { numero, capacidad, disponible },
      { new: true }  // Esto hace que devuelva el documento actualizado
    );

    if (!mesaModificada) {
      return res.status(404).json({ error: 'Mesa no encontrada' });
    }

    // Respondemos con la mesa modificada
    res.json(mesaModificada);
  } catch (err) {
    res.status(500).json({ error: 'Error al modificar la mesa' });
  }

};

// Función para obtener el número de solicitudes
const obtenerContadores = (req, res) => {
  res.status(200).json({
    solicitudesListarMesas: contadorListarMesas,
    solicitudesCrearMesa: contadorCrearMesa,
    totalSolicitudes: contadorListarMesas + contadorCrearMesa,
  });
};

module.exports = { obtenerMesasDisponibles, crearMesa, modificarMesa, obtenerContadores};
