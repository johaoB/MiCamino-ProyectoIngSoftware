// ============================================================
// MODELO: Cuestionario (tabla MAESTRA)
// Acceso a datos CRUD sobre la tabla `cuestionario` (FK -> pregunta).
// ============================================================

// Importamos el pool de conexiones MySQL.
const pool = require('../config/database');

// Definimos el modelo de cuestionarios.
const CuestionarioModel = {
  // CU-07 | RF-007 | E01 - listar()
  // Devuelve todos los cuestionarios con la pregunta inicial asociada (FK).
  async listar() {
    const [rows] = await pool.query(
      `SELECT c.id_cuestionario, c.nombre, c.version, c.estado,
              c.fecha_publicacion, c.id_pregunta,
              p.texto AS texto_pregunta_inicial
       FROM cuestionario c
       INNER JOIN pregunta p ON p.id_pregunta = c.id_pregunta
       ORDER BY c.id_cuestionario ASC;`
    );
    return rows;
  },

  // CU-07 | RF-007 | E02 - obtenerPorId()
  // Devuelve un cuestionario por id.
  async obtenerPorId(idCuestionario) {
    const [rows] = await pool.query(
      `SELECT c.id_cuestionario, c.nombre, c.version, c.estado,
              c.fecha_publicacion, c.id_pregunta,
              p.texto AS texto_pregunta_inicial
       FROM cuestionario c
       INNER JOIN pregunta p ON p.id_pregunta = c.id_pregunta
       WHERE c.id_cuestionario = ?;`,
      [idCuestionario]
    );
    return rows[0] || null;
  },

  // CU-07 | RF-007 | E07 - obtenerActivo()
  // Devuelve el cuestionario en estado ACTIVO más reciente.
  async obtenerActivo() {
    const [rows] = await pool.query(
      `SELECT id_cuestionario, nombre, version, estado, fecha_publicacion, id_pregunta
       FROM cuestionario
       WHERE estado = 'ACTIVO'
       ORDER BY id_cuestionario DESC
       LIMIT 1;`
    );
    return rows[0] || null;
  },

  // CU-07 | RF-007 | E03 - crear()
  // Inserta un nuevo cuestionario asociado a una pregunta inicial (FK).
  async crear(data) {
    const [result] = await pool.query(
      `INSERT INTO cuestionario (nombre, version, estado, fecha_publicacion, id_pregunta)
       VALUES (?, ?, ?, ?, ?);`,
      [
        data.nombre,
        data.version,
        data.estado || 'ACTIVO',
        data.fecha_publicacion || null,
        data.id_pregunta
      ]
    );
    return result.insertId;
  },

  // CU-07 | RF-007 | E04 - actualizar()
  // Actualiza un cuestionario existente. Devuelve filas afectadas.
  async actualizar(idCuestionario, data) {
    const [result] = await pool.query(
      `UPDATE cuestionario SET
         nombre = ?, version = ?, estado = ?, fecha_publicacion = ?, id_pregunta = ?
       WHERE id_cuestionario = ?;`,
      [
        data.nombre,
        data.version,
        data.estado || 'ACTIVO',
        data.fecha_publicacion || null,
        data.id_pregunta,
        idCuestionario
      ]
    );
    return result.affectedRows;
  },

  // CU-07 | RF-007 | E05 - eliminar()
  // Elimina un cuestionario por id. Devuelve filas afectadas.
  async eliminar(idCuestionario) {
    const [result] = await pool.query(
      `DELETE FROM cuestionario WHERE id_cuestionario = ?;`,
      [idCuestionario]
    );
    return result.affectedRows;
  }
};

// Exportamos el modelo.
module.exports = CuestionarioModel;
