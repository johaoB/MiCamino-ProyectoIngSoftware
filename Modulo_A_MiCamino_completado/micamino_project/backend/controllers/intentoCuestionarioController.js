// ============================================================
// CONTROLADOR: Intento_Cuestionario (tabla TRANSACCIONAL)
// CRUDL completo + relaciones FK + REGLA DE NEGOCIO.
// Tabla transaccional con interfaz visual completa (dropdowns FK).
// ============================================================

const IntentoCuestionarioModel = require('../models/IntentoCuestionarioModel');
const pool = require('../config/database');

// Límite máximo de intentos por estudiante por día (regla de negocio).
const MAX_INTENTOS_POR_DIA = 3;

const IntentoCuestionarioController = {
  // CU-07 | RF-007 | E01 - listar()
  async listar(req, res) {
    try {
      return res.json(await IntentoCuestionarioModel.listar());
    } catch (error) {
      console.error('Error al listar intentos:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar intentos.' });
    }
  },

  // CU-07 | RF-007 | E02 - obtener()
  async obtener(req, res) {
    try {
      const intento = await IntentoCuestionarioModel.obtenerPorId(req.params.id);
      if (!intento) return res.status(404).json({ mensaje: 'Intento no encontrado.' });
      return res.json(intento);
    } catch (error) {
      console.error('Error al obtener intento:', error);
      return res.status(500).json({ mensaje: 'Error interno al obtener el intento.' });
    }
  },

  // CU-07 | RF-007 | E11 - listarEstudiantes()
  // Endpoint auxiliar para poblar el dropdown FK de estudiantes en la interfaz.
  async listarEstudiantes(req, res) {
    try {
      const [rows] = await pool.query(
        `SELECT e.id_usuario AS id_estudiante, u.nombre_completo, e.grado, e.grupo
         FROM estudiante e
         INNER JOIN usuario u ON u.id_usuario = e.id_usuario
         ORDER BY u.nombre_completo ASC;`
      );
      return res.json(rows);
    } catch (error) {
      console.error('Error al listar estudiantes:', error);
      return res.status(500).json({ mensaje: 'Error interno al listar estudiantes.' });
    }
  },

  // CU-07 | RF-007 | E03 - crear()
  async crear(req, res) {
    try {
      const { id_estudiante, id_cuestionario } = req.body;
      if (!id_estudiante || !id_cuestionario) {
        return res.status(400).json({ mensaje: 'id_estudiante e id_cuestionario son obligatorios.' });
      }

      // ── REGLA DE NEGOCIO (código real) ───────────────────────
      // Un estudiante no puede iniciar más de MAX_INTENTOS_POR_DIA intentos en el mismo día.
      const fecha = (req.body.fecha_inicio
        ? new Date(req.body.fecha_inicio)
        : new Date()).toISOString().slice(0, 10);
      const intentosHoy = await IntentoCuestionarioModel.contarIntentosDelDia(id_estudiante, fecha);
      if (intentosHoy >= MAX_INTENTOS_POR_DIA) {
        return res.status(409).json({
          mensaje: `Regla de negocio: el estudiante ya alcanzó el máximo de ${MAX_INTENTOS_POR_DIA} intentos para el día ${fecha}.`
        });
      }
      // ─────────────────────────────────────────────────────────

      const id = await IntentoCuestionarioModel.crear(req.body);
      return res.status(201).json({ mensaje: 'Intento creado correctamente.', intento: await IntentoCuestionarioModel.obtenerPorId(id) });
    } catch (error) {
      console.error('Error al crear intento:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ mensaje: 'El estudiante o el cuestionario indicado no existe.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al crear el intento.' });
    }
  },

  // CU-08 | RF-008 | E04 - actualizar()
  async actualizar(req, res) {
    try {
      const filas = await IntentoCuestionarioModel.actualizar(req.params.id, req.body);
      if (filas === 0) return res.status(404).json({ mensaje: 'Intento no encontrado.' });
      return res.json({ mensaje: 'Intento actualizado correctamente.', intento: await IntentoCuestionarioModel.obtenerPorId(req.params.id) });
    } catch (error) {
      console.error('Error al actualizar intento:', error);
      return res.status(500).json({ mensaje: 'Error interno al actualizar el intento.' });
    }
  },

  // CU-07 | RF-007 | E05 - eliminar()
  async eliminar(req, res) {
    try {
      const filas = await IntentoCuestionarioModel.eliminar(req.params.id);
      if (filas === 0) return res.status(404).json({ mensaje: 'Intento no encontrado.' });
      return res.json({ mensaje: 'Intento eliminado correctamente.' });
    } catch (error) {
      console.error('Error al eliminar intento:', error);
      if (error.code === 'ER_ROW_IS_REFERENCED_2') {
        return res.status(409).json({ mensaje: 'No se puede eliminar: el intento tiene respuestas o resultados asociados.' });
      }
      return res.status(500).json({ mensaje: 'Error interno al eliminar el intento.' });
    }
  }
};

module.exports = IntentoCuestionarioController;
