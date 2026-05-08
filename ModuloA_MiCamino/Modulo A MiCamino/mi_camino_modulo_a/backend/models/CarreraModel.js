// Importamos pool para acceso a BD.
const pool = require('../config/database');

// Modelo de carreras.
const CarreraModel = {
  // Método para listar carreras activas.
  async listarActivas() {
    // Consulta SQL para obtener carreras con su área asociada.
    const query = `
      SELECT id_carrera, id_area, nombre_carrera, descripcion_carrera, demanda_mercado
      FROM carrera
      WHERE estado = 'ACTIVO'
      ORDER BY id_area ASC, id_carrera ASC;
    `;

    // Ejecutamos consulta.
    const result = await pool.query(query);

    // Devolvemos carreras.
    return result.rows;
  }
};

// Exportamos el modelo.
module.exports = CarreraModel;
