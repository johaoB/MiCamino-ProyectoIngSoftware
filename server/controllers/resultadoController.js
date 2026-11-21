// ============================================================
// CONTROLADOR: Resultado (tabla TRANSACCIONAL) - CRUDL backend.
// ============================================================

const ResultadoModel = require('../models/ResultadoModel');

const ResultadoController = {
  // CU-07 | RF-018 | E01 - listar()
  async listar(req, res) {
    try {
      return res.json(await ResultadoModel.listar());
    } catch (error) {
      console.error('Error al listar resultados:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar resultados.' });
    }
  },

  // CU-07 | RF-018 | E02 - obtener()
  async obtener(req, res) {
    try {
      const resultado = await ResultadoModel.obtenerPorId(req.params.id);
      if (!resultado) return res.status(404).json({ mensaje: 'Resultado no encontrado.' });
      return res.json(resultado);
    } catch (error) {
      console.error('Error al obtener resultado:', error);
      return res.status(500).json({ mensaje: 'Error interno al obtener el resultado.' });
    }
  },

  // CU-07 | RF-012 | E03 - crear()
  async crear(req, res) {
    try {
      if (!req.body.id_intento) {
        return res.status(400).json({ mensaje: 'id_intento es obligatorio.' });
      }
      const id = await ResultadoModel.crear(req.body);
      return res.status(201).json({ mensaje: 'Resultado creado correctamente.', resultado: await ResultadoModel.obtenerPorId(id) });
    } catch (error) {
      console.error('Error al crear resultado:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ mensaje: 'El intento indicado (id_intento) no existe.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al crear el resultado.' });
    }
  },

  // CU-07 | RF-018 | E04 - actualizar()
  async actualizar(req, res) {
    try {
      const filas = await ResultadoModel.actualizar(req.params.id, req.body);
      if (filas === 0) return res.status(404).json({ mensaje: 'Resultado no encontrado.' });
      return res.json({ mensaje: 'Resultado actualizado correctamente.', resultado: await ResultadoModel.obtenerPorId(req.params.id) });
    } catch (error) {
      console.error('Error al actualizar resultado:', error);
      return res.status(500).json({ mensaje: 'Error interno al actualizar el resultado.' });
    }
  },

  // CU-07 | RF-018 | E05 - eliminar()
  async eliminar(req, res) {
    try {
      const filas = await ResultadoModel.eliminar(req.params.id);
      if (filas === 0) return res.status(404).json({ mensaje: 'Resultado no encontrado.' });
      return res.json({ mensaje: 'Resultado eliminado correctamente.' });
    } catch (error) {
      console.error('Error al eliminar resultado:', error);
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({ mensaje: 'No se puede eliminar: el resultado tiene afinidades o recomendaciones asociadas.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al eliminar el resultado.' });
    }
  }
};

module.exports = ResultadoController;
