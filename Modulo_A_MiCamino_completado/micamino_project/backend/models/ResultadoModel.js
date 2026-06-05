// ============================================================
// MODELO: Resultado (tabla TRANSACCIONAL)
// CRUD + relación FK hacia intento_cuestionario.
// ============================================================

// Importamos el pool de conexiones MySQL.
const pool = require('../config/database');

// Definimos el modelo de resultados del cuestionario.
const ResultadoModel = {
  // CU-07 | RF-018 | E01 - listar()
  // Lista resultados resolviendo la relación FK con el intento y el estudiante.
  async listar() {
    const [rows] = await pool.query(
      `SELECT res.id_resultado, res.id_intento, res.fecha_generacion, res.retroalimentacion,
              u.nombre_completo AS nombre_estudiante
       FROM resultado res
       INNER JOIN intento_cuestionario i ON i.id_intento = res.id_intento
       INNER JOIN usuario u ON u.id_usuario = i.id_estudiante
       ORDER BY res.id_resultado DESC;`
    );
    return rows;
  },

  // CU-07 | RF-018 | E02 - obtenerPorId()
  // Devuelve un resultado por id con la relación FK resuelta.
  async obtenerPorId(idResultado) {
    const [rows] = await pool.query(
      `SELECT res.id_resultado, res.id_intento, res.fecha_generacion, res.retroalimentacion,
              u.nombre_completo AS nombre_estudiante
       FROM resultado res
       INNER JOIN intento_cuestionario i ON i.id_intento = res.id_intento
       INNER JOIN usuario u ON u.id_usuario = i.id_estudiante
       WHERE res.id_resultado = ?;`,
      [idResultado]
    );
    return rows[0] || null;
  },

  // CU-07 | RF-012 | E03 - crear()
  // Inserta un nuevo resultado asociado a un intento (FK).
  async crear(data) {
    const [result] = await pool.query(
      `INSERT INTO resultado (id_intento, fecha_generacion, retroalimentacion)
       VALUES (?, ?, ?);`,
      [
        data.id_intento,
        data.fecha_generacion || new Date(),
        data.retroalimentacion || null
      ]
    );
    return result.insertId;
  },

  // CU-07 | RF-018 | E04 - actualizar()
  // Actualiza un resultado existente. Devuelve filas afectadas.
  async actualizar(idResultado, data) {
    const [result] = await pool.query(
      `UPDATE resultado SET id_intento = ?, fecha_generacion = ?, retroalimentacion = ?
       WHERE id_resultado = ?;`,
      [
        data.id_intento,
        data.fecha_generacion || new Date(),
        data.retroalimentacion || null,
        idResultado
      ]
    );
    return result.affectedRows;
  },

  // CU-07 | RF-018 | E05 - eliminar()
  // Elimina un resultado por id. Devuelve filas afectadas.
  async eliminar(idResultado) {
    const [result] = await pool.query(
      `DELETE FROM resultado WHERE id_resultado = ?;`,
      [idResultado]
    );
    return result.affectedRows;
  }
};

// Exportamos el modelo.
module.exports = ResultadoModel;
