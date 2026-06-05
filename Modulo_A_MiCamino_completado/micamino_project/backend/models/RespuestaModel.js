// ============================================================
// MODELO: Respuesta (tabla TRANSACCIONAL)
// CRUD + relaciones FK hacia intento, pregunta y opción.
// ============================================================

// Importamos el pool de conexiones MySQL.
const pool = require('../config/database');

// Definimos el modelo de respuestas del estudiante.
const RespuestaModel = {
  // CU-07 | RF-009 | E01 - listar()
  // Lista respuestas resolviendo las relaciones FK (texto de pregunta y opción).
  async listar() {
    const [rows] = await pool.query(
      `SELECT r.id_respuesta, r.id_intento, r.id_pregunta, r.id_opcion,
              r.valor_texto, r.fecha,
              p.texto AS texto_pregunta,
              o.texto AS texto_opcion
       FROM respuesta r
       INNER JOIN pregunta p ON p.id_pregunta = r.id_pregunta
       LEFT JOIN opcion_respuesta o ON o.id_opcion = r.id_opcion
       ORDER BY r.id_respuesta DESC;`
    );
    return rows;
  },

  // CU-07 | RF-009 | E02 - obtenerPorId()
  // Devuelve una respuesta por id con relaciones FK resueltas.
  async obtenerPorId(idRespuesta) {
    const [rows] = await pool.query(
      `SELECT r.id_respuesta, r.id_intento, r.id_pregunta, r.id_opcion,
              r.valor_texto, r.fecha,
              p.texto AS texto_pregunta,
              o.texto AS texto_opcion
       FROM respuesta r
       INNER JOIN pregunta p ON p.id_pregunta = r.id_pregunta
       LEFT JOIN opcion_respuesta o ON o.id_opcion = r.id_opcion
       WHERE r.id_respuesta = ?;`,
      [idRespuesta]
    );
    return rows[0] || null;
  },

  // CU-07 | RF-009 | E09 - opcionPerteneceAPregunta()
  // REGLA DE NEGOCIO (apoyo): valida que una opción corresponda a la pregunta indicada.
  async opcionPerteneceAPregunta(idOpcion, idPregunta) {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS total
       FROM opcion_respuesta
       WHERE id_opcion = ? AND id_pregunta = ?;`,
      [idOpcion, idPregunta]
    );
    return Number(rows[0].total || 0) > 0;
  },

  // CU-07 | RF-009 | E03 - crear()
  // Inserta una nueva respuesta (FK intento + pregunta + opción).
  async crear(data) {
    const [result] = await pool.query(
      `INSERT INTO respuesta (id_intento, id_pregunta, id_opcion, valor_texto, fecha)
       VALUES (?, ?, ?, ?, ?);`,
      [
        data.id_intento,
        data.id_pregunta,
        data.id_opcion != null ? data.id_opcion : null,
        data.valor_texto || null,
        data.fecha || new Date()
      ]
    );
    return result.insertId;
  },

  // CU-07 | RF-009 | E04 - actualizar()
  // Actualiza una respuesta existente. Devuelve filas afectadas.
  async actualizar(idRespuesta, data) {
    const [result] = await pool.query(
      `UPDATE respuesta SET
         id_intento = ?, id_pregunta = ?, id_opcion = ?, valor_texto = ?, fecha = ?
       WHERE id_respuesta = ?;`,
      [
        data.id_intento,
        data.id_pregunta,
        data.id_opcion != null ? data.id_opcion : null,
        data.valor_texto || null,
        data.fecha || new Date(),
        idRespuesta
      ]
    );
    return result.affectedRows;
  },

  // CU-07 | RF-009 | E05 - eliminar()
  // Elimina una respuesta por id. Devuelve filas afectadas.
  async eliminar(idRespuesta) {
    const [result] = await pool.query(
      `DELETE FROM respuesta WHERE id_respuesta = ?;`,
      [idRespuesta]
    );
    return result.affectedRows;
  }
};

// Exportamos el modelo.
module.exports = RespuestaModel;
