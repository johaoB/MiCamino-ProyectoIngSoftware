// ============================================================
// MODELO: Pregunta (tabla MAESTRA)
// Acceso a datos CRUD sobre la tabla `pregunta` (FK -> area).
// ============================================================

// Importamos el pool de conexiones MySQL.
const pool = require('../config/database');

// Definimos el modelo de preguntas del cuestionario.
const PreguntaModel = {
  // CU-07 | RF-011 | E01 - listar()
  // Devuelve todas las preguntas con el nombre del área (relación FK).
  async listar() {
    const [rows] = await pool.query(
      `SELECT p.id_pregunta, p.texto, p.tipo, p.orden, p.id_area,
              a.nombre AS nombre_area
       FROM pregunta p
       INNER JOIN area a ON a.id_area = p.id_area
       ORDER BY p.orden ASC;`
    );
    return rows;
  },

  // CU-07 | RF-011 | E02 - obtenerPorId()
  // Devuelve una pregunta por id incluyendo el área asociada.
  async obtenerPorId(idPregunta) {
    const [rows] = await pool.query(
      `SELECT p.id_pregunta, p.texto, p.tipo, p.orden, p.id_area,
              a.nombre AS nombre_area
       FROM pregunta p
       INNER JOIN area a ON a.id_area = p.id_area
       WHERE p.id_pregunta = ?;`,
      [idPregunta]
    );
    return rows[0] || null;
  },

  // CU-07 | RF-011 | E03 - crear()
  // Inserta una nueva pregunta asociada a un área (FK).
  async crear(data) {
    const [result] = await pool.query(
      `INSERT INTO pregunta (texto, tipo, orden, id_area)
       VALUES (?, ?, ?, ?);`,
      [data.texto, data.tipo, data.orden, data.id_area]
    );
    return result.insertId;
  },

  // CU-07 | RF-011 | E04 - actualizar()
  // Actualiza una pregunta existente. Devuelve filas afectadas.
  async actualizar(idPregunta, data) {
    const [result] = await pool.query(
      `UPDATE pregunta SET texto = ?, tipo = ?, orden = ?, id_area = ?
       WHERE id_pregunta = ?;`,
      [data.texto, data.tipo, data.orden, data.id_area, idPregunta]
    );
    return result.affectedRows;
  },

  // CU-07 | RF-011 | E05 - eliminar()
  // Elimina una pregunta por id. Devuelve filas afectadas.
  async eliminar(idPregunta) {
    const [result] = await pool.query(
      `DELETE FROM pregunta WHERE id_pregunta = ?;`,
      [idPregunta]
    );
    return result.affectedRows;
  }
};

// Exportamos el modelo.
module.exports = PreguntaModel;
