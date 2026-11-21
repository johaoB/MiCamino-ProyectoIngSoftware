// ============================================================
// CONTROLADOR: Afinidad_Academica (tabla TRANSACCIONAL) - CRUDL backend.
// ============================================================

const AfinidadAcademicaModel = require('../models/AfinidadAcademicaModel');

const AfinidadAcademicaController = {
  // CU-07 | RF-013 | E01 - listar()
  async listar(req, res) {
    try {
      return res.json(await AfinidadAcademicaModel.listar());
    } catch (error) {
      console.error('Error al listar afinidades:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar afinidades.' });
    }
  },

  // CU-07 | RF-013 | E02 - obtener()
  async obtener(req, res) {
    try {
      const afinidad = await AfinidadAcademicaModel.obtenerPorId(req.params.id);
      if (!afinidad) return res.status(404).json({ mensaje: 'Afinidad no encontrada.' });
      return res.json(afinidad);
    } catch (error) {
      console.error('Error al obtener afinidad:', error);
      return res.status(500).json({ mensaje: 'Error interno al obtener la afinidad.' });
    }
  },

  // CU-07 | RF-013 | E03 - crear()
  async crear(req, res) {
    try {
      const { id_resultado, id_area, porcentaje } = req.body;
      if (!id_resultado || !id_area || porcentaje == null) {
        return res.status(400).json({ mensaje: 'id_resultado, id_area y porcentaje son obligatorios.' });
      }

      // ── REGLA DE NEGOCIO (código real) ───────────────────────
      // El porcentaje de afinidad debe estar en el rango válido [0, 100].
      const valor = Number(porcentaje);
      if (Number.isNaN(valor) || valor < 0 || valor > 100) {
        return res.status(400).json({ mensaje: 'Regla de negocio: el porcentaje debe estar entre 0 y 100.' });
      }
      // ─────────────────────────────────────────────────────────

      const id = await AfinidadAcademicaModel.crear(req.body);
      return res.status(201).json({ mensaje: 'Afinidad creada correctamente.', afinidad: await AfinidadAcademicaModel.obtenerPorId(id) });
    } catch (error) {
      console.error('Error al crear afinidad:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ mensaje: 'El resultado o el área indicada no existe.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al crear la afinidad.' });
    }
  },

  // CU-07 | RF-013 | E04 - actualizar()
  async actualizar(req, res) {
    try {
      const filas = await AfinidadAcademicaModel.actualizar(req.params.id, req.body);
      if (filas === 0) return res.status(404).json({ mensaje: 'Afinidad no encontrada.' });
      return res.json({ mensaje: 'Afinidad actualizada correctamente.', afinidad: await AfinidadAcademicaModel.obtenerPorId(req.params.id) });
    } catch (error) {
      console.error('Error al actualizar afinidad:', error);
      return res.status(500).json({ mensaje: 'Error interno al actualizar la afinidad.' });
    }
  },

  // CU-07 | RF-013 | E05 - eliminar()
  async eliminar(req, res) {
    try {
      const filas = await AfinidadAcademicaModel.eliminar(req.params.id);
      if (filas === 0) return res.status(404).json({ mensaje: 'Afinidad no encontrada.' });
      return res.json({ mensaje: 'Afinidad eliminada correctamente.' });
    } catch (error) {
      console.error('Error al eliminar afinidad:', error);
      return res.status(500).json({ mensaje: 'Error interno al eliminar la afinidad.' });
    }
  }
};

module.exports = AfinidadAcademicaController;
