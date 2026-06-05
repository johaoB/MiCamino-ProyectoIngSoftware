// ============================================================
// CONTROLADOR: Area (tabla MAESTRA) - endpoints CRUDL backend.
// ============================================================

const AreaModel = require('../models/AreaModel');

const AreaController = {
  // CU-07 | RF-013 | E01 - listar()
  async listar(req, res) {
    try {
      const areas = await AreaModel.listar();
      return res.json(areas);
    } catch (error) {
      console.error('Error al listar áreas:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar áreas.' });
    }
  },

  // CU-07 | RF-013 | E02 - obtener()
  async obtener(req, res) {
    try {
      const area = await AreaModel.obtenerPorId(req.params.id);
      if (!area) return res.status(404).json({ mensaje: 'Área no encontrada.' });
      return res.json(area);
    } catch (error) {
      console.error('Error al obtener área:', error);
      return res.status(500).json({ mensaje: 'Error interno al obtener el área.' });
    }
  },

  // CU-07 | RF-013 | E03 - crear()
  async crear(req, res) {
    try {
      if (!req.body.nombre || !req.body.nombre.trim()) {
        return res.status(400).json({ mensaje: 'El nombre del área es obligatorio.' });
      }
      const id = await AreaModel.crear(req.body);
      return res.status(201).json({ mensaje: 'Área creada correctamente.', area: await AreaModel.obtenerPorId(id) });
    } catch (error) {
      console.error('Error al crear área:', error);
      return res.status(500).json({ mensaje: 'Error interno al crear el área.' });
    }
  },

  // CU-07 | RF-013 | E04 - actualizar()
  async actualizar(req, res) {
    try {
      if (!req.body.nombre || !req.body.nombre.trim()) {
        return res.status(400).json({ mensaje: 'El nombre del área es obligatorio.' });
      }
      const filas = await AreaModel.actualizar(req.params.id, req.body);
      if (filas === 0) return res.status(404).json({ mensaje: 'Área no encontrada.' });
      return res.json({ mensaje: 'Área actualizada correctamente.', area: await AreaModel.obtenerPorId(req.params.id) });
    } catch (error) {
      console.error('Error al actualizar área:', error);
      return res.status(500).json({ mensaje: 'Error interno al actualizar el área.' });
    }
  },

  // CU-07 | RF-013 | E05 - eliminar()
  async eliminar(req, res) {
    try {
      const filas = await AreaModel.eliminar(req.params.id);
      if (filas === 0) return res.status(404).json({ mensaje: 'Área no encontrada.' });
      return res.json({ mensaje: 'Área eliminada correctamente.' });
    } catch (error) {
      console.error('Error al eliminar área:', error);
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({ mensaje: 'No se puede eliminar: el área está referenciada por preguntas o afinidades.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al eliminar el área.' });
    }
  }
};

module.exports = AreaController;
