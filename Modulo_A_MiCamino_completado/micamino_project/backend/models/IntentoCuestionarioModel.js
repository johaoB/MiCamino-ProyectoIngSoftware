// ============================================================
// MODELO: Intento_Cuestionario (tabla TRANSACCIONAL)
// CRUD + relaciones FK hacia estudiante (usuario) y cuestionario.
// ============================================================

// Importamos el pool de conexiones MySQL.
const pool = require('../config/database');

// Definimos el modelo de intentos de cuestionario.
const IntentoCuestionarioModel = {
  // CU-07 | RF-007 | E01 - listar()
  // Lista los intentos resolviendo las relaciones FK (nombre estudiante + cuestionario).
  async listar() {
    const [rows] = await pool.query(
      `SELECT i.id_intento, i.id_estudiante, i.id_cuestionario,
              i.fecha_inicio, i.fecha_fin, i.estado,
              u.nombre_completo AS nombre_estudiante,
              c.nombre AS nombre_cuestionario
       FROM intento_cuestionario i
       INNER JOIN estudiante e ON e.id_usuario = i.id_estudiante
       INNER JOIN usuario u    ON u.id_usuario = e.id_usuario
       INNER JOIN cuestionario c ON c.id_cuestionario = i.id_cuestionario
       ORDER BY i.id_intento DESC;`
    );
    return rows;
  },

  // CU-07 | RF-007 | E02 - obtenerPorId()
  // Devuelve un intento por id con sus relaciones FK resueltas.
  async obtenerPorId(idIntento) {
    const [rows] = await pool.query(
      `SELECT i.id_intento, i.id_estudiante, i.id_cuestionario,
              i.fecha_inicio, i.fecha_fin, i.estado,
              u.nombre_completo AS nombre_estudiante,
              c.nombre AS nombre_cuestionario
       FROM intento_cuestionario i
       INNER JOIN estudiante e ON e.id_usuario = i.id_estudiante
       INNER JOIN usuario u    ON u.id_usuario = e.id_usuario
       INNER JOIN cuestionario c ON c.id_cuestionario = i.id_cuestionario
       WHERE i.id_intento = ?;`,
      [idIntento]
    );
    return rows[0] || null;
  },

  // CU-07 | RF-007 | E08 - contarIntentosDelDia()
  // REGLA DE NEGOCIO (apoyo): cuenta los intentos de un estudiante en una fecha dada.
  async contarIntentosDelDia(idEstudiante, fecha) {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS total
       FROM intento_cuestionario
       WHERE id_estudiante = ? AND DATE(fecha_inicio) = ?;`,
      [idEstudiante, fecha]
    );
    return Number(rows[0].total || 0);
  },

  // CU-07 | RF-007 | E03 - crear()
  // Inserta un nuevo intento (FK estudiante + cuestionario).
  async crear(data) {
    const [result] = await pool.query(
      `INSERT INTO intento_cuestionario
         (id_estudiante, id_cuestionario, fecha_inicio, fecha_fin, estado)
       VALUES (?, ?, ?, ?, ?);`,
      [
        data.id_estudiante,
        data.id_cuestionario,
        data.fecha_inicio || new Date(),
        data.fecha_fin || null,
        data.estado || 'EN_PROGRESO'
      ]
    );
    return result.insertId;
  },

  // CU-08 | RF-008 | E04 - actualizar()
  // Actualiza un intento (p.ej. al guardar progreso o finalizar). Devuelve filas afectadas.
  async actualizar(idIntento, data) {
    const [result] = await pool.query(
      `UPDATE intento_cuestionario SET
         id_estudiante = ?, id_cuestionario = ?, fecha_inicio = ?, fecha_fin = ?, estado = ?
       WHERE id_intento = ?;`,
      [
        data.id_estudiante,
        data.id_cuestionario,
        data.fecha_inicio,
        data.fecha_fin || null,
        data.estado,
        idIntento
      ]
    );
    return result.affectedRows;
  },

  // CU-07 | RF-007 | E05 - eliminar()
  // Elimina un intento por id. Devuelve filas afectadas.
  async eliminar(idIntento) {
    const [result] = await pool.query(
      `DELETE FROM intento_cuestionario WHERE id_intento = ?;`,
      [idIntento]
    );
    return result.affectedRows;
  }
};

// Exportamos el modelo.
module.exports = IntentoCuestionarioModel;
