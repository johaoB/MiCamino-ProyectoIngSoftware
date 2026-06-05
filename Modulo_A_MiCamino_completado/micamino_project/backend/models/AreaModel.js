// ============================================================
// MODELO: Area (tabla MAESTRA)
// Acceso a datos CRUD sobre la tabla `area` en MySQL.
// ============================================================

// Importamos el pool de conexiones MySQL.
const pool = require('../config/database');

// Definimos el modelo de áreas académicas.
const AreaModel = {
  // CU-07 | RF-013 | E01 - listar()
  // Devuelve todas las áreas.
  async listar() {
    const [rows] = await pool.query(
      `SELECT id_area, nombre FROM area ORDER BY id_area ASC;`
    );
    return rows;
  },

  // CU-07 | RF-013 | E02 - obtenerPorId()
  // Devuelve un área por su id o null si no existe.
  async obtenerPorId(idArea) {
    const [rows] = await pool.query(
      `SELECT id_area, nombre FROM area WHERE id_area = ?;`,
      [idArea]
    );
    return rows[0] || null;
  },

  // CU-07 | RF-013 | E03 - crear()
  // Inserta una nueva área y devuelve el id generado.
  async crear(data) {
    const [result] = await pool.query(
      `INSERT INTO area (nombre) VALUES (?);`,
      [data.nombre]
    );
    return result.insertId;
  },

  // CU-07 | RF-013 | E04 - actualizar()
  // Actualiza el nombre de un área. Devuelve filas afectadas.
  async actualizar(idArea, data) {
    const [result] = await pool.query(
      `UPDATE area SET nombre = ? WHERE id_area = ?;`,
      [data.nombre, idArea]
    );
    return result.affectedRows;
  },

  // CU-07 | RF-013 | E05 - eliminar()
  // Elimina un área por id. Devuelve filas afectadas.
  async eliminar(idArea) {
    const [result] = await pool.query(
      `DELETE FROM area WHERE id_area = ?;`,
      [idArea]
    );
    return result.affectedRows;
  }
};

// Exportamos el modelo.
module.exports = AreaModel;
