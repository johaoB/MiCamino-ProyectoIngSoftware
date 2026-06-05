const UserModel = require('../models/userModel');

const getEstudiantes = async (req, res) => {
  try {
    const inst = decodeURIComponent(req.params.institucion);
    const estudiantes = await UserModel.getEstudiantesByInst(inst);
    res.json(estudiantes);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getEstudiantes };
