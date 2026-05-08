const Model = require('../models/userModel');

const getEstudiante = (req, res) => {
  const { codigoVinculo } = req.params;
  const estudiante = Model.getEstudianteByCode(codigoVinculo);
  if (!estudiante) return res.status(404).json({ message: 'Estudiante no encontrado con ese código' });

  const { password: _, ...safe } = estudiante;
  const resultado = Model.obtenerResultado(estudiante.codigoEstudiante);

  res.json({ estudiante: safe, resultado });
};

module.exports = { getEstudiante };
