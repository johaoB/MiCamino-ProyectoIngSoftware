// ============================================================
// CONTROLADOR: Pregunta (tabla MAESTRA) - endpoints CRUDL backend.
// ============================================================

const PreguntaModel = require('../models/PreguntaModel');

const PreguntaController = {
  // CU-07 | RF-011 | E01 - listar()
  async listar(req, res) {
    try {
      return res.json(await PreguntaModel.listar());
    } catch (error) {
      console.error('Error al listar preguntas:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar preguntas.' });
    }
  },

  // CU-07 | RF-011 | E02 - obtener()
  async obtener(req, res) {
    try {
      const pregunta = await PreguntaModel.obtenerPorId(req.params.id);
      if (!pregunta) return res.status(404).json({ mensaje: 'Pregunta no encontrada.' });
      return res.json(pregunta);
    } catch (error) {
      console.error('Error al obtener pregunta:', error);
      return res.status(500).json({ mensaje: 'Error interno al obtener la pregunta.' });
    }
  },

  // CU-07 | RF-011 | E03 - crear()
  async crear(req, res) {
    try {
      const { texto, tipo, orden, id_area } = req.body;
      if (!texto || !tipo || orden == null || !id_area) {
        return res.status(400).json({ mensaje: 'texto, tipo, orden e id_area son obligatorios.' });
      }
      const id = await PreguntaModel.crear(req.body);
      return res.status(201).json({ mensaje: 'Pregunta creada correctamente.', pregunta: await PreguntaModel.obtenerPorId(id) });
    } catch (error) {
      console.error('Error al crear pregunta:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ mensaje: 'El área indicada (id_area) no existe.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al crear la pregunta.' });
    }
  },

  // CU-07 | RF-011 | E04 - actualizar()
  async actualizar(req, res) {
    try {
      const filas = await PreguntaModel.actualizar(req.params.id, req.body);
      if (filas === 0) return res.status(404).json({ mensaje: 'Pregunta no encontrada.' });
      return res.json({ mensaje: 'Pregunta actualizada correctamente.', pregunta: await PreguntaModel.obtenerPorId(req.params.id) });
    } catch (error) {
      console.error('Error al actualizar pregunta:', error);
      return res.status(500).json({ mensaje: 'Error interno al actualizar la pregunta.' });
    }
  },

  // CU-07 | RF-011 | E05 - eliminar()
  async eliminar(req, res) {
    try {
      const filas = await PreguntaModel.eliminar(req.params.id);
      if (filas === 0) return res.status(404).json({ mensaje: 'Pregunta no encontrada.' });
      return res.json({ mensaje: 'Pregunta eliminada correctamente.' });
    } catch (error) {
      console.error('Error al eliminar pregunta:', error);
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({ mensaje: 'No se puede eliminar: la pregunta está referenciada por opciones, cuestionarios o respuestas.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al eliminar la pregunta.' });
    }
  }
};

module.exports = PreguntaController;
