// Importamos el pool de conexiones a PostgreSQL.
const pool = require('../config/database');

// Definimos el modelo para opciones de respuesta.
const OpcionRespuestaModel = {
  // Método para listar opciones de varias preguntas.
  async listarPorPreguntas(idsPreguntas) {
    // Si no hay ids, retornamos arreglo vacío para evitar consulta inválida.
    if (!idsPreguntas || idsPreguntas.length === 0) {
      return [];
    }

    // Consulta SQL para obtener opciones de todas las preguntas recibidas.
    const query = `
      SELECT id_opcion, id_pregunta, texto_opcion, area_puntaje_json, orden_opcion
      FROM opcion_respuesta
      WHERE id_pregunta = ANY($1)
      ORDER BY id_pregunta ASC, orden_opcion ASC;
    `;

    // Ejecutamos consulta usando arreglo como parámetro.
    const result = await pool.query(query, [idsPreguntas]);

    // Retornamos las opciones encontradas.
    return result.rows;
  }
};

// Exportamos modelo.
module.exports = OpcionRespuestaModel;
