// Importamos pool para consultas SQL.
const pool = require('../config/database');

// Modelo de áreas de ingeniería.
const AreaModel = {
  // Método para listar áreas activas.
  async listarActivas() {
    // SQL para recuperar todas las áreas habilitadas.
    const query = `
      SELECT id_area, nombre_area, descripcion_area
      FROM area
      WHERE estado = 'ACTIVO'
      ORDER BY id_area ASC;
    `;

    // Ejecutamos consulta.
    const result = await pool.query(query);

    // Devolvemos filas.
    return result.rows;
  }
};

// Exportamos modelo.
module.exports = AreaModel;
