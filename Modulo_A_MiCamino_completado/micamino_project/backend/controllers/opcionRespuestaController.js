// ============================================================
// CONTROLADOR: Opcion_Respuesta (tabla MAESTRA) - endpoints CRUDL backend.
// ============================================================

const OpcionRespuestaModel = require('../models/OpcionRespuestaModel');

const OpcionRespuestaController = {
  // CU-07 | RF-007 | E01 - listar()
  async listar(req, res) {
    try {
      // Permite filtrar por pregunta usando ?id_pregunta=
      if (req.query.id_pregunta) {
        return res.json(await OpcionRespuestaModel.listarPorPregunta(req.query.id_pregunta));
      }
      return res.json(await OpcionRespuestaModel.listar());
    } catch (error) {
      console.error('Error al listar opciones:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar opciones.' });
    }
  },

  // CU-07 | RF-007 | E02 - obtener()
  async obtener(req, res) {
    try {
      const opcion = await OpcionRespuestaModel.obtenerPorId(req.params.id);
      if (!opcion) return res.status(404).json({ mensaje: 'Opción no encontrada.' });
      return res.json(opcion);
    } catch (error) {
      console.error('Error al obtener opción:', error);
      return res.status(500).json({ mensaje: 'Error interno al obtener la opción.' });
    }
  },

  // CU-07 | RF-007 | E03 - crear()
  async crear(req, res) {
    try {
      const { id_pregunta, texto } = req.body;
      if (!id_pregunta || !texto) {
        return res.status(400).json({ mensaje: 'id_pregunta y texto son obligatorios.' });
      }
      const id = await OpcionRespuestaModel.crear(req.body);
      return res.status(201).json({ mensaje: 'Opción creada correctamente.', opcion: await OpcionRespuestaModel.obtenerPorId(id) });
    } catch (error) {
      console.error('Error al crear opción:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ mensaje: 'La pregunta indicada (id_pregunta) no existe.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al crear la opción.' });
    }
  },

  // CU-07 | RF-007 | E04 - actualizar()
  async actualizar(req, res) {
    try {
      const filas = await OpcionRespuestaModel.actualizar(req.params.id, req.body);
      if (filas === 0) return res.status(404).json({ mensaje: 'Opción no encontrada.' });
      return res.json({ mensaje: 'Opción actualizada correctamente.', opcion: await OpcionRespuestaModel.obtenerPorId(req.params.id) });
    } catch (error) {
      console.error('Error al actualizar opción:', error);
      return res.status(500).json({ mensaje: 'Error interno al actualizar la opción.' });
    }
  },

  // CU-07 | RF-007 | E05 - eliminar()
  async eliminar(req, res) {
    try {
      const filas = await OpcionRespuestaModel.eliminar(req.params.id);
      if (filas === 0) return res.status(404).json({ mensaje: 'Opción no encontrada.' });
      return res.json({ mensaje: 'Opción eliminada correctamente.' });
    } catch (error) {
      console.error('Error al eliminar opción:', error);
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({ mensaje: 'No se puede eliminar: la opción está referenciada por respuestas.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al eliminar la opción.' });
    }
  }
};

module.exports = OpcionRespuestaController;
