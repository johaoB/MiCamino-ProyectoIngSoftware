// ============================================================
// CONTROLADOR: Cuestionario (tabla MAESTRA) - endpoints CRUDL backend.
// ============================================================

const CuestionarioModel = require('../models/CuestionarioModel');

const CuestionarioController = {
  // CU-07 | RF-007 | E01 - listar()
  async listar(req, res) {
    try {
      return res.json(await CuestionarioModel.listar());
    } catch (error) {
      console.error('Error al listar cuestionarios:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar cuestionarios.' });
    }
  },

  // CU-07 | RF-007 | E07 - obtenerActivo()
  async obtenerActivo(req, res) {
    try {
      const activo = await CuestionarioModel.obtenerActivo();
      if (!activo) return res.status(404).json({ mensaje: 'No hay cuestionario activo.' });
      return res.json(activo);
    } catch (error) {
      console.error('Error al obtener cuestionario activo:', error);
      return res.status(500).json({ mensaje: 'Error interno al consultar el cuestionario activo.' });
    }
  },

  // CU-07 | RF-007 | E02 - obtener()
  async obtener(req, res) {
    try {
      const cuestionario = await CuestionarioModel.obtenerPorId(req.params.id);
      if (!cuestionario) return res.status(404).json({ mensaje: 'Cuestionario no encontrado.' });
      return res.json(cuestionario);
    } catch (error) {
      console.error('Error al obtener cuestionario:', error);
      return res.status(500).json({ mensaje: 'Error interno al obtener el cuestionario.' });
    }
  },

  // CU-07 | RF-007 | E03 - crear()
  async crear(req, res) {
    try {
      const { nombre, version, id_pregunta } = req.body;
      if (!nombre || !version || !id_pregunta) {
        return res.status(400).json({ mensaje: 'nombre, version e id_pregunta son obligatorios.' });
      }
      const id = await CuestionarioModel.crear(req.body);
      return res.status(201).json({ mensaje: 'Cuestionario creado correctamente.', cuestionario: await CuestionarioModel.obtenerPorId(id) });
    } catch (error) {
      console.error('Error al crear cuestionario:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ mensaje: 'La pregunta inicial (id_pregunta) no existe.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al crear el cuestionario.' });
    }
  },

  // CU-07 | RF-007 | E04 - actualizar()
  async actualizar(req, res) {
    try {
      const filas = await CuestionarioModel.actualizar(req.params.id, req.body);
      if (filas === 0) return res.status(404).json({ mensaje: 'Cuestionario no encontrado.' });
      return res.json({ mensaje: 'Cuestionario actualizado correctamente.', cuestionario: await CuestionarioModel.obtenerPorId(req.params.id) });
    } catch (error) {
      console.error('Error al actualizar cuestionario:', error);
      return res.status(500).json({ mensaje: 'Error interno al actualizar el cuestionario.' });
    }
  },

  // CU-07 | RF-007 | E05 - eliminar()
  async eliminar(req, res) {
    try {
      const filas = await CuestionarioModel.eliminar(req.params.id);
      if (filas === 0) return res.status(404).json({ mensaje: 'Cuestionario no encontrado.' });
      return res.json({ mensaje: 'Cuestionario eliminado correctamente.' });
    } catch (error) {
      console.error('Error al eliminar cuestionario:', error);
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({ mensaje: 'No se puede eliminar: el cuestionario tiene intentos asociados.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al eliminar el cuestionario.' });
    }
  }
};

module.exports = CuestionarioController;
