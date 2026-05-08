// Importamos el pool para transacciones.
const pool = require('../config/database');

// Modelo para intento de cuestionario.
const IntentoCuestionarioModel = {
  // Método para crear un nuevo intento y devolver su id.
  async crearIntento(client, data) {
    // Consulta INSERT con retorno del id generado.
    const query = `
      INSERT INTO intento_cuestionario (
        id_cuestionario,
        nombre_participante,
        estado_intento,
        fecha_inicio,
        fecha_fin
      )
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING id_intento;
    `;

    // Parámetros del insert.
    const params = [
      data.idCuestionario,
      data.nombreParticipante || 'Participante Demo',
      data.estadoIntento || 'FINALIZADO'
    ];

    // Ejecutamos consulta con el cliente de transacción recibido.
    const result = await client.query(query, params);

    // Retornamos el id generado.
    return result.rows[0].id_intento;
  }
};

// Exportamos modelo.
module.exports = IntentoCuestionarioModel;
