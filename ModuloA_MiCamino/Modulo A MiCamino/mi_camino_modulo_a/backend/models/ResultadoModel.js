// Importamos pool de conexión.
const pool = require('../config/database');

// Modelo para resultado general del intento.
const ResultadoModel = {
  // Método para insertar resultado final.
  async crearResultado(client, data) {
    // SQL para guardar resumen de resultado.
    const query = `
      INSERT INTO resultado (
        id_intento,
        id_area_principal,
        porcentaje_principal,
        explicacion_personalizada
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id_resultado;
    `;

    // Ejecutamos insert con datos calculados.
    const result = await client.query(query, [
      data.idIntento,
      data.idAreaPrincipal,
      data.porcentajePrincipal,
      data.explicacionPersonalizada
    ]);

    // Retornamos id_resultado creado.
    return result.rows[0].id_resultado;
  }
};

// Exportamos el modelo.
module.exports = ResultadoModel;
