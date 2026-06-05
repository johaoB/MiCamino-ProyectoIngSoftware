// ============================================================
// MODELO: Opcion_Respuesta (tabla MAESTRA)
// Acceso a datos CRUD sobre la tabla `opcion_respuesta` (FK -> pregunta).
// ============================================================

// Importamos el pool de conexiones MySQL.
const pool = require('../config/database');

// Definimos el modelo de opciones de respuesta.
const OpcionRespuestaModel = {
  // CU-07 | RF-007 | E01 - listar()
  // Devuelve todas las opciones con el texto de la pregunta (relación FK).
  async listar() {
    const [rows] = await pool.query(
      `SELECT o.id_opcion, o.id_pregunta, o.texto, o.valor,
              p.texto AS texto_pregunta
       FROM opcion_respuesta o
       INNER JOIN pregunta p ON p.id_pregunta = o.id_pregunta
       ORDER BY o.id_opcion ASC;`
    );
    return rows;
  },

  // CU-07 | RF-007 | E02 - obtenerPorId()
  // Devuelve una opción por id incluyendo la pregunta asociada.
  async obtenerPorId(idOpcion) {
    const [rows] = await pool.query(
      `SELECT o.id_opcion, o.id_pregunta, o.texto, o.valor,
              p.texto AS texto_pregunta
       FROM opcion_respuesta o
       INNER JOIN pregunta p ON p.id_pregunta = o.id_pregunta
       WHERE o.id_opcion = ?;`,
      [idOpcion]
    );
    return rows[0] || null;
  },

  // CU-07 | RF-007 | E06 - listarPorPregunta()
  // Devuelve las opciones que pertenecen a una pregunta específica (FK).
  async listarPorPregunta(idPregunta) {
    const [rows] = await pool.query(
      `SELECT id_opcion, id_pregunta, texto, valor
       FROM opcion_respuesta
       WHERE id_pregunta = ?
       ORDER BY id_opcion ASC;`,
      [idPregunta]
    );
    return rows;
  },

  // CU-07 | RF-007 | E03 - crear()
  // Inserta una nueva opción asociada a una pregunta (FK).
  async crear(data) {
    const [result] = await pool.query(
      `INSERT INTO opcion_respuesta (id_pregunta, texto, valor)
       VALUES (?, ?, ?);`,
      [data.id_pregunta, data.texto, data.valor != null ? data.valor : null]
    );
    return result.insertId;
  },

  // CU-07 | RF-007 | E04 - actualizar()
  // Actualiza una opción existente. Devuelve filas afectadas.
  async actualizar(idOpcion, data) {
    const [result] = await pool.query(
      `UPDATE opcion_respuesta SET id_pregunta = ?, texto = ?, valor = ?
       WHERE id_opcion = ?;`,
      [data.id_pregunta, data.texto, data.valor != null ? data.valor : null, idOpcion]
    );
    return result.affectedRows;
  },

  // CU-07 | RF-007 | E05 - eliminar()
  // Elimina una opción por id. Devuelve filas afectadas.
  async eliminar(idOpcion) {
    const [result] = await pool.query(
      `DELETE FROM opcion_respuesta WHERE id_opcion = ?;`,
      [idOpcion]
    );
    return result.affectedRows;
  }
};

// Exportamos el modelo.
module.exports = OpcionRespuestaModel;
