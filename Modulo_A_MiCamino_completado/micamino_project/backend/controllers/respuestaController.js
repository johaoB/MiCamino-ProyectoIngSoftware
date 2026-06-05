// ============================================================
// CONTROLADOR: Respuesta (tabla TRANSACCIONAL)
// CRUDL backend + REGLA DE NEGOCIO de validación de opción/pregunta.
// ============================================================

const RespuestaModel = require('../models/RespuestaModel');

const RespuestaController = {
  // CU-07 | RF-009 | E01 - listar()
  async listar(req, res) {
    try {
      return res.json(await RespuestaModel.listar());
    } catch (error) {
      console.error('Error al listar respuestas:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar respuestas.' });
    }
  },

  // CU-07 | RF-009 | E02 - obtener()
  async obtener(req, res) {
    try {
      const respuesta = await RespuestaModel.obtenerPorId(req.params.id);
      if (!respuesta) return res.status(404).json({ mensaje: 'Respuesta no encontrada.' });
      return res.json(respuesta);
    } catch (error) {
      console.error('Error al obtener respuesta:', error);
      return res.status(500).json({ mensaje: 'Error interno al obtener la respuesta.' });
    }
  },

  // CU-07 | RF-009 | E03 - crear()
  async crear(req, res) {
    try {
      const { id_intento, id_pregunta, id_opcion } = req.body;
      if (!id_intento || !id_pregunta) {
        return res.status(400).json({ mensaje: 'id_intento e id_pregunta son obligatorios.' });
      }

      // ── REGLA DE NEGOCIO (código real) ───────────────────────
      // Si se envía una opción, debe pertenecer a la pregunta respondida.
      if (id_opcion != null) {
        const valida = await RespuestaModel.opcionPerteneceAPregunta(id_opcion, id_pregunta);
        if (!valida) {
          return res.status(400).json({
            mensaje: 'Regla de negocio: la opción seleccionada no pertenece a la pregunta indicada.'
          });
        }
      }
      // ─────────────────────────────────────────────────────────

      const id = await RespuestaModel.crear(req.body);
      return res.status(201).json({ mensaje: 'Respuesta registrada correctamente.', respuesta: await RespuestaModel.obtenerPorId(id) });
    } catch (error) {
      console.error('Error al crear respuesta:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ mensaje: 'El intento, pregunta u opción indicada no existe.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al registrar la respuesta.' });
    }
  },

  // CU-07 | RF-009 | E04 - actualizar()
  async actualizar(req, res) {
    try {
      const filas = await RespuestaModel.actualizar(req.params.id, req.body);
      if (filas === 0) return res.status(404).json({ mensaje: 'Respuesta no encontrada.' });
      return res.json({ mensaje: 'Respuesta actualizada correctamente.', respuesta: await RespuestaModel.obtenerPorId(req.params.id) });
    } catch (error) {
      console.error('Error al actualizar respuesta:', error);
      return res.status(500).json({ mensaje: 'Error interno al actualizar la respuesta.' });
    }
  },

  // CU-07 | RF-009 | E05 - eliminar()
  async eliminar(req, res) {
    try {
      const filas = await RespuestaModel.eliminar(req.params.id);
      if (filas === 0) return res.status(404).json({ mensaje: 'Respuesta no encontrada.' });
      return res.json({ mensaje: 'Respuesta eliminada correctamente.' });
    } catch (error) {
      console.error('Error al eliminar respuesta:', error);
      return res.status(500).json({ mensaje: 'Error interno al eliminar la respuesta.' });
    }
  }
};

module.exports = RespuestaController;
