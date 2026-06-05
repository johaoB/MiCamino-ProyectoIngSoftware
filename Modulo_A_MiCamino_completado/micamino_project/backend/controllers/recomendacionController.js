// ============================================================
// CONTROLADOR: Recomendacion (tabla TRANSACCIONAL) - CRUDL backend.
// ============================================================

const RecomendacionModel = require('../models/RecomendacionModel');

// Máximo de carreras recomendadas por resultado (regla de negocio).
const MAX_RECOMENDACIONES_POR_RESULTADO = 3;

const RecomendacionController = {
  // CU-07 | RF-014 | E01 - listar()
  async listar(req, res) {
    try {
      return res.json(await RecomendacionModel.listar());
    } catch (error) {
      console.error('Error al listar recomendaciones:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar recomendaciones.' });
    }
  },

  // CU-07 | RF-014 | E02 - obtener()
  async obtener(req, res) {
    try {
      const recomendacion = await RecomendacionModel.obtenerPorId(req.params.id);
      if (!recomendacion) return res.status(404).json({ mensaje: 'Recomendación no encontrada.' });
      return res.json(recomendacion);
    } catch (error) {
      console.error('Error al obtener recomendación:', error);
      return res.status(500).json({ mensaje: 'Error interno al obtener la recomendación.' });
    }
  },

  // CU-07 | RF-014 | E03 - crear()
  async crear(req, res) {
    try {
      const { id_resultado, id_carrera } = req.body;
      if (!id_resultado || !id_carrera) {
        return res.status(400).json({ mensaje: 'id_resultado e id_carrera son obligatorios.' });
      }

      // ── REGLA DE NEGOCIO (código real) ───────────────────────
      // No se generan más de MAX_RECOMENDACIONES_POR_RESULTADO carreras por resultado.
      const existentes = await RecomendacionModel.contarPorResultado(id_resultado);
      if (existentes >= MAX_RECOMENDACIONES_POR_RESULTADO) {
        return res.status(409).json({
          mensaje: `Regla de negocio: un resultado no puede tener más de ${MAX_RECOMENDACIONES_POR_RESULTADO} carreras recomendadas.`
        });
      }
      // ─────────────────────────────────────────────────────────

      const id = await RecomendacionModel.crear(req.body);
      return res.status(201).json({ mensaje: 'Recomendación creada correctamente.', recomendacion: await RecomendacionModel.obtenerPorId(id) });
    } catch (error) {
      console.error('Error al crear recomendación:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ mensaje: 'El resultado o la carrera indicada no existe.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al crear la recomendación.' });
    }
  },

  // CU-07 | RF-014 | E04 - actualizar()
  async actualizar(req, res) {
    try {
      const filas = await RecomendacionModel.actualizar(req.params.id, req.body);
      if (filas === 0) return res.status(404).json({ mensaje: 'Recomendación no encontrada.' });
      return res.json({ mensaje: 'Recomendación actualizada correctamente.', recomendacion: await RecomendacionModel.obtenerPorId(req.params.id) });
    } catch (error) {
      console.error('Error al actualizar recomendación:', error);
      return res.status(500).json({ mensaje: 'Error interno al actualizar la recomendación.' });
    }
  },

  // CU-07 | RF-014 | E05 - eliminar()
  async eliminar(req, res) {
    try {
      const filas = await RecomendacionModel.eliminar(req.params.id);
      if (filas === 0) return res.status(404).json({ mensaje: 'Recomendación no encontrada.' });
      return res.json({ mensaje: 'Recomendación eliminada correctamente.' });
    } catch (error) {
      console.error('Error al eliminar recomendación:', error);
      return res.status(500).json({ mensaje: 'Error interno al eliminar la recomendación.' });
    }
  }
};

module.exports = RecomendacionController;
