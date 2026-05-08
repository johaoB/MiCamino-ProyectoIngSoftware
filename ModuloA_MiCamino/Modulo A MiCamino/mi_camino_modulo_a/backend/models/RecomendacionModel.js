// Importamos pool para uso en consultas.
const pool = require('../config/database');

// Modelo para recomendaciones de carreras.
const RecomendacionModel = {
  // Método para guardar recomendaciones top del resultado.
  async guardarRecomendaciones(client, idResultado, recomendaciones) {
    // Iteramos cada recomendación para insertarla.
    for (let indice = 0; indice < recomendaciones.length; indice += 1) {
      // Obtenemos una recomendación concreta.
      const recomendacion = recomendaciones[indice];

      // SQL de inserción para la recomendación actual.
      const query = `
        INSERT INTO recomendacion (
          id_resultado,
          id_carrera,
          porcentaje_afinidad,
          orden_recomendacion,
          razon_recomendacion
        )
        VALUES ($1, $2, $3, $4, $5);
      `;

      // Ejecutamos inserción con parámetros.
      await client.query(query, [
        idResultado,
        recomendacion.idCarrera,
        recomendacion.porcentajeAfinidad,
        indice + 1,
        recomendacion.razonRecomendacion
      ]);
    }
  }
};

// Exportamos el modelo.
module.exports = RecomendacionModel;
