// Importamos el pool para operar con PostgreSQL.
const pool = require('../config/database');

// Definimos el modelo de preguntas.
const PreguntaModel = {
  // Método para listar preguntas activas de un cuestionario específico.
  async listarPorCuestionario(idCuestionario) {
    // Definimos consulta para recuperar preguntas ordenadas por su orden lógico.
    const query = `
      SELECT id_pregunta, id_cuestionario, enunciado, orden_pregunta, estado
      FROM pregunta
      WHERE id_cuestionario = $1
      ORDER BY orden_pregunta ASC;
    `;

    // Ejecutamos la consulta usando parámetro seguro para evitar SQL injection.
    const result = await pool.query(query, [idCuestionario]);

    // Devolvemos todas las preguntas encontradas.
    return result.rows;
  }
};

// Exportamos el modelo.
module.exports = PreguntaModel;
