// ============================================================
// MODELO: Afinidad_Academica (tabla TRANSACCIONAL)
// CRUD + relaciones FK hacia resultado y area.
// ============================================================

// Importamos el pool de conexiones MySQL.
const pool = require('../config/database');

// Definimos el modelo de afinidad académica.
const AfinidadAcademicaModel = {
  // CU-07 | RF-013 | E01 - listar()
  // Lista afinidades resolviendo las relaciones FK (área y resultado).
  async listar() {
    const [rows] = await pool.query(
      `SELECT af.id_afinidad, af.id_resultado, af.id_area, af.porcentaje,
              a.nombre AS nombre_area
       FROM afinidad_academica af
       INNER JOIN area a ON a.id_area = af.id_area
       ORDER BY af.id_afinidad DESC;`
    );
    return rows;
  },

  // CU-07 | RF-013 | E02 - obtenerPorId()
  // Devuelve una afinidad por id con relaciones FK resueltas.
  async obtenerPorId(idAfinidad) {
    const [rows] = await pool.query(
      `SELECT af.id_afinidad, af.id_resultado, af.id_area, af.porcentaje,
              a.nombre AS nombre_area
       FROM afinidad_academica af
       INNER JOIN area a ON a.id_area = af.id_area
       WHERE af.id_afinidad = ?;`,
      [idAfinidad]
    );
    return rows[0] || null;
  },

  // CU-07 | RF-013 | E03 - crear()
  // Inserta una nueva afinidad (FK resultado + área).
  async crear(data) {
    const [result] = await pool.query(
      `INSERT INTO afinidad_academica (id_resultado, id_area, porcentaje)
       VALUES (?, ?, ?);`,
      [data.id_resultado, data.id_area, data.porcentaje]
    );
    return result.insertId;
  },

  // CU-07 | RF-013 | E04 - actualizar()
  // Actualiza una afinidad existente. Devuelve filas afectadas.
  async actualizar(idAfinidad, data) {
    const [result] = await pool.query(
      `UPDATE afinidad_academica SET id_resultado = ?, id_area = ?, porcentaje = ?
       WHERE id_afinidad = ?;`,
      [data.id_resultado, data.id_area, data.porcentaje, idAfinidad]
    );
    return result.affectedRows;
  },

  // CU-07 | RF-013 | E05 - eliminar()
  // Elimina una afinidad por id. Devuelve filas afectadas.
  async eliminar(idAfinidad) {
    const [result] = await pool.query(
      `DELETE FROM afinidad_academica WHERE id_afinidad = ?;`,
      [idAfinidad]
    );
    return result.affectedRows;
  }
};

// Exportamos el modelo.
module.exports = AfinidadAcademicaModel;
