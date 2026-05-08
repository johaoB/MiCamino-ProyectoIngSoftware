// Importamos el pool de BD.
const pool = require('../config/database');

// Modelo para respuestas del intento.
const RespuestaModel = {
  // Método para guardar múltiples respuestas en bloque.
  async guardarRespuestas(client, idIntento, respuestas) {
    // Recorremos cada respuesta para insertar una fila por pregunta.
    for (const respuesta of respuestas) {
      // Consulta para insertar respuesta y puntaje aplicado.
      const query = `
        INSERT INTO respuesta (
          id_intento,
          id_pregunta,
          id_opcion,
          puntaje_aplicado_json
        )
        VALUES ($1, $2, $3, $4::jsonb);
      `;

      // Construimos parámetros del insert.
      const params = [
        idIntento,
        respuesta.idPregunta,
        respuesta.idOpcion,
        JSON.stringify(respuesta.puntajeAplicado)
      ];

      // Ejecutamos inserción por cada respuesta.
      await client.query(query, params);
    }
  }
};

// Exportamos modelo.
module.exports = RespuestaModel;
