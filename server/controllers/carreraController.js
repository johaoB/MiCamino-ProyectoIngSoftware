// ============================================================
// CONTROLADOR: Carrera (tabla MAESTRA)
// Expone endpoints CRUDL. Tabla maestra con interfaz visual completa.
// ============================================================

// Importamos el modelo de Carrera.
const CarreraModel = require('../models/CarreraModel');

const CarreraController = {
  // CU-07 | RF-014 | E01 - listar()
  async listar(req, res) {
    try {
      const carreras = await CarreraModel.listar();
      return res.json(carreras);
    } catch (error) {
      console.error('Error al listar carreras:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar carreras.' });
    }
  },

  // CU-07 | RF-014 | E02 - obtener()
  async obtener(req, res) {
    try {
      const carrera = await CarreraModel.obtenerPorId(req.params.id);
      if (!carrera) {
        return res.status(404).json({ mensaje: 'Carrera no encontrada.' });
      }
      return res.json(carrera);
    } catch (error) {
      console.error('Error al obtener carrera:', error);
      return res.status(500).json({ mensaje: 'Error interno al obtener la carrera.' });
    }
  },

  // CU-07 | RF-014 | E03 - crear()
  async crear(req, res) {
    try {
      // Validación básica: el nombre es obligatorio.
      if (!req.body.nombre || !req.body.nombre.trim()) {
        return res.status(400).json({ mensaje: 'El nombre de la carrera es obligatorio.' });
      }
      const id = await CarreraModel.crear(req.body);
      const creada = await CarreraModel.obtenerPorId(id);
      return res.status(201).json({ mensaje: 'Carrera creada correctamente.', carrera: creada });
    } catch (error) {
      console.error('Error al crear carrera:', error);
      return res.status(500).json({ mensaje: 'Error interno al crear la carrera.' });
    }
  },

  // CU-07 | RF-014 | E04 - actualizar()
  async actualizar(req, res) {
    try {
      if (!req.body.nombre || !req.body.nombre.trim()) {
        return res.status(400).json({ mensaje: 'El nombre de la carrera es obligatorio.' });
      }
      const filas = await CarreraModel.actualizar(req.params.id, req.body);
      if (filas === 0) {
        return res.status(404).json({ mensaje: 'Carrera no encontrada.' });
      }
      const actualizada = await CarreraModel.obtenerPorId(req.params.id);
      return res.json({ mensaje: 'Carrera actualizada correctamente.', carrera: actualizada });
    } catch (error) {
      console.error('Error al actualizar carrera:', error);
      return res.status(500).json({ mensaje: 'Error interno al actualizar la carrera.' });
    }
  },

  // CU-07 | RF-014 | E05 - eliminar()
  async eliminar(req, res) {
    try {
      const filas = await CarreraModel.eliminar(req.params.id);
      if (filas === 0) {
        return res.status(404).json({ mensaje: 'Carrera no encontrada.' });
      }
      return res.json({ mensaje: 'Carrera eliminada correctamente.' });
    } catch (error) {
      console.error('Error al eliminar carrera:', error);
      // Captura de error por restricción de llave foránea (carrera referenciada).
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({ mensaje: 'No se puede eliminar: la carrera está referenciada por recomendaciones.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al eliminar la carrera.' });
    }
  }
};

// Exportamos el controlador.
module.exports = CarreraController;
