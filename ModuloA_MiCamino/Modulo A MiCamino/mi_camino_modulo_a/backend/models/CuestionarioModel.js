// Importamos el pool de PostgreSQL para ejecutar consultas.
const pool = require('../config/database');

// Definimos el modelo del cuestionario como un objeto con métodos.
const CuestionarioModel = {
  // Método para obtener el cuestionario activo más reciente.
  async obtenerCuestionarioActivo() {
    // Consulta SQL para buscar cuestionario activo ordenado por id descendente.
    const query = `
      SELECT id_cuestionario, titulo, descripcion, estado, fecha_creacion
      FROM cuestionario
      WHERE estado = 'ACTIVO'
      ORDER BY id_cuestionario DESC
      LIMIT 1;
    `;

    // Ejecutamos la consulta contra la base de datos.
    const result = await pool.query(query);

    // Devolvemos la primera fila o null si no existe.
    return result.rows[0] || null;
  }
};

// Exportamos el modelo para su uso en controladores.
module.exports = CuestionarioModel;
