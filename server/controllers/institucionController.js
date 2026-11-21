const UserModel = require('../models/userModel');

const getEstudiantes = async (req, res) => {
  try {
    const inst = decodeURIComponent(req.params.institucion);
    const estudiantes = await UserModel.getEstudiantesByInst(inst);
    res.json(estudiantes);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Error interno del servidor' }); }
};

module.exports = { getEstudiantes };
