// Importamos pool para consultas.
const pool = require('../config/database');

// Modelo para afinidades por área.
const AfinidadAcademicaModel = {
  // Método para guardar afinidades calculadas por área.
  async guardarAfinidades(client, idResultado, afinidades) {
    // Recorremos cada afinidad para persistirla.
    for (const afinidad of afinidades) {
      // SQL de inserción para afinidad individual.
      const query = `
        INSERT INTO afinidad_academica (
          id_resultado,
          id_area,
          puntaje_total,
          porcentaje_afinidad
        )
        VALUES ($1, $2, $3, $4);
      `;

      // Ejecutamos el insert usando el cliente transaccional.
      await client.query(query, [
        idResultado,
        afinidad.idArea,
        afinidad.puntajeTotal,
        afinidad.porcentajeAfinidad
      ]);
    }
  }
};

// Exportamos modelo.
module.exports = AfinidadAcademicaModel;
