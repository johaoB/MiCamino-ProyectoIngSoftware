// ============================================================
// MODELO: Recomendacion (tabla TRANSACCIONAL)
// CRUD + relaciones FK hacia resultado y carrera.
// ============================================================

// Importamos el pool de conexiones MySQL.
const pool = require('../config/database');

// Definimos el modelo de recomendaciones de carrera.
const RecomendacionModel = {
  // CU-07 | RF-014 | E01 - listar()
  // Lista recomendaciones resolviendo las relaciones FK (carrera y resultado).
  async listar() {
    const [rows] = await pool.query(
      `SELECT rec.id_recomendacion, rec.id_resultado, rec.id_carrera,
              ca.nombre AS nombre_carrera
       FROM recomendacion rec
       INNER JOIN carrera ca ON ca.id_carrera = rec.id_carrera
       ORDER BY rec.id_recomendacion DESC;`
    );
    return rows;
  },

  // CU-07 | RF-014 | E02 - obtenerPorId()
  // Devuelve una recomendación por id con relaciones FK resueltas.
  async obtenerPorId(idRecomendacion) {
    const [rows] = await pool.query(
      `SELECT rec.id_recomendacion, rec.id_resultado, rec.id_carrera,
              ca.nombre AS nombre_carrera
       FROM recomendacion rec
       INNER JOIN carrera ca ON ca.id_carrera = rec.id_carrera
       WHERE rec.id_recomendacion = ?;`,
      [idRecomendacion]
    );
    return rows[0] || null;
  },

  // CU-07 | RF-014 | E10 - contarPorResultado()
  // REGLA DE NEGOCIO (apoyo): cuenta recomendaciones ya generadas para un resultado.
  async contarPorResultado(idResultado) {
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS total FROM recomendacion WHERE id_resultado = ?;`,
      [idResultado]
    );
    return Number(rows[0].total || 0);
  },

  // CU-07 | RF-014 | E03 - crear()
  // Inserta una nueva recomendación (FK resultado + carrera).
  async crear(data) {
    const [result] = await pool.query(
      `INSERT INTO recomendacion (id_resultado, id_carrera)
       VALUES (?, ?);`,
      [data.id_resultado, data.id_carrera]
    );
    return result.insertId;
  },

  // CU-07 | RF-014 | E04 - actualizar()
  // Actualiza una recomendación existente. Devuelve filas afectadas.
  async actualizar(idRecomendacion, data) {
    const [result] = await pool.query(
      `UPDATE recomendacion SET id_resultado = ?, id_carrera = ?
       WHERE id_recomendacion = ?;`,
      [data.id_resultado, data.id_carrera, idRecomendacion]
    );
    return result.affectedRows;
  },

  // CU-07 | RF-014 | E05 - eliminar()
  // Elimina una recomendación por id. Devuelve filas afectadas.
  async eliminar(idRecomendacion) {
    const [result] = await pool.query(
      `DELETE FROM recomendacion WHERE id_recomendacion = ?;`,
      [idRecomendacion]
    );
    return result.affectedRows;
  }
};

// Exportamos el modelo.
module.exports = RecomendacionModel;
