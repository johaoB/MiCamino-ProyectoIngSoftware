// ============================================================
// MODELO: Carrera (tabla MAESTRA)
// Acceso a datos CRUD sobre la tabla `carrera` en MySQL.
// ============================================================

// Importamos el pool de conexiones MySQL.
const pool = require('../config/database');

// Definimos el modelo como objeto con métodos de acceso a datos.
const CarreraModel = {
  // CU-07 | RF-014 | E01 - listar()
  // Devuelve todas las carreras registradas.
  async listar() {
    const [rows] = await pool.query(
      `SELECT id_carrera, nombre, descripcion, perfil_profesional,
              duracion, campo_laboral, nivel_riesgo_automatizacion
       FROM carrera
       ORDER BY id_carrera ASC;`
    );
    return rows;
  },

  // CU-07 | RF-014 | E02 - obtenerPorId()
  // Devuelve una carrera por su id o null si no existe.
  async obtenerPorId(idCarrera) {
    const [rows] = await pool.query(
      `SELECT id_carrera, nombre, descripcion, perfil_profesional,
              duracion, campo_laboral, nivel_riesgo_automatizacion
       FROM carrera
       WHERE id_carrera = ?;`,
      [idCarrera]
    );
    return rows[0] || null;
  },

  // CU-07 | RF-014 | E03 - crear()
  // Inserta una nueva carrera y devuelve el id generado.
  async crear(data) {
    const [result] = await pool.query(
      `INSERT INTO carrera
        (nombre, descripcion, perfil_profesional, duracion, campo_laboral, nivel_riesgo_automatizacion)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [
        data.nombre,
        data.descripcion || null,
        data.perfil_profesional || null,
        data.duracion || null,
        data.campo_laboral || null,
        data.nivel_riesgo_automatizacion || null
      ]
    );
    return result.insertId;
  },

  // CU-07 | RF-014 | E04 - actualizar()
  // Actualiza una carrera existente. Devuelve filas afectadas.
  async actualizar(idCarrera, data) {
    const [result] = await pool.query(
      `UPDATE carrera SET
         nombre = ?, descripcion = ?, perfil_profesional = ?,
         duracion = ?, campo_laboral = ?, nivel_riesgo_automatizacion = ?
       WHERE id_carrera = ?;`,
      [
        data.nombre,
        data.descripcion || null,
        data.perfil_profesional || null,
        data.duracion || null,
        data.campo_laboral || null,
        data.nivel_riesgo_automatizacion || null,
        idCarrera
      ]
    );
    return result.affectedRows;
  },

  // CU-07 | RF-014 | E05 - eliminar()
  // Elimina una carrera por id. Devuelve filas afectadas.
  async eliminar(idCarrera) {
    const [result] = await pool.query(
      `DELETE FROM carrera WHERE id_carrera = ?;`,
      [idCarrera]
    );
    return result.affectedRows;
  }
};

// Exportamos el modelo para usarlo en el controlador.
module.exports = CarreraModel;
