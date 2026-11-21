/**
 * encuestaModel.js
 * Modelo Transaccional del Cuestionario Vocacional
 *
 * Trazabilidad:
 *  - CU07 – Responder Cuestionario Vocacional
 *  - CU08 – Guardar Progreso del Cuestionario
 *  - CU09 – Visualizar Resultados de Estudiante por Orientador
 *  - CU12 – Recibir Retroalimentación del Cuestionario
 *  - RF-007: Presentación del cuestionario
 *  - RF-008: Guardado de progreso del cuestionario
 *  - RF-009: Registro de respuestas
 *  - RF-012: Generación de retroalimentación automática
 *  - RF-013: Cálculo de porcentajes de afinidad
 *  - RF-018: Almacenamiento de resultados
 *  - Diagrama de Secuencia CU12 (DiagramadeSecuencia4.jpeg / Image 1)
 */

const pool = require('../db/pool');

/**
 * getPreguntas
 * CU07 – Responder Cuestionario Vocacional | RF-007
 * DS-CU12 Paso 2 (contexto): sistema muestra instrucciones y preguntas
 * Retorna preguntas ordenadas con sus opciones.
 * _opciones y correcta son internos — no se exponen al cliente (ver encuestaController)
 */
const getPreguntas = async () => {
  const [preguntas] = await pool.query(`
    SELECT p.id_pregunta AS id, p.texto AS pregunta, p.orden
    FROM pregunta p
    ORDER BY p.orden
  `);

  for (const p of preguntas) {
    const [opciones] = await pool.query(`
      SELECT id_opcion AS id, texto, valor
      FROM opcion_respuesta
      WHERE id_pregunta = ?
      ORDER BY id_opcion
    `, [p.id]);
    // RF-007: exponer solo texto de opciones al frontend
    p.opciones     = opciones.map((o) => o.texto);
    // uso interno para calcular puntaje (RF-012, RF-013)
    p._opciones    = opciones;
    p.correcta     = opciones.findIndex((o) => parseFloat(o.valor) === 1.00);
  }

  return preguntas;
};

/**
 * crearIntento
 * CU07 – Responder Cuestionario Vocacional | RF-009
 * DS-CU12 Paso 4: cargarResultadoCompleto — preparar nuevo intento
 * Limpia borradores 'en_progreso' anteriores antes de crear el intento formal
 * Garantiza que solo exista un intento activo por estudiante
 */
const crearIntento = async (idEstudiante) => {
  // CU08: limpiar borradores en_progreso previos para mantener consistencia
  const [viejos] = await pool.query(
    `SELECT id_intento FROM intento_cuestionario
     WHERE id_estudiante = ? AND estado = 'en_progreso'`,
    [idEstudiante]
  );
  for (const v of viejos) {
    await pool.query('DELETE FROM respuesta WHERE id_intento = ?', [v.id_intento]);
  }
  await pool.query(
    `DELETE FROM intento_cuestionario WHERE id_estudiante = ? AND estado = 'en_progreso'`,
    [idEstudiante]
  );

  // RF-009: crear registro de intento con estado 'en_progreso'
  const [res] = await pool.query(`
    INSERT INTO intento_cuestionario (id_estudiante, id_cuestionario, fecha_inicio, estado)
    VALUES (?, 1, NOW(), 'en_progreso')
  `, [idEstudiante]);
  return res.insertId;
};

/**
 * guardarRespuestas
 * CU07 – Responder Cuestionario Vocacional | RF-009, RF-012, RF-013, RF-018
 * DS-CU12 (Flujo Normal [estadoActual == FINALIZADO]):
 *   Paso 5  new ResultadoVocacional(datos...) — cálculo de puntaje y retroalimentación
 *   Paso 6  notificarOrientador — postcondición CU12: orientador recibe notificación
 *   Paso 7  mostrarRetroalimentación(instanciaResultado) — resultado devuelto al cliente
 *   Paso 8  visualizarResumen(fortalezas, areasMejora) — detalle por pregunta
 *
 * Transacción garantiza:
 *   1. Insertar respuestas individuales (RF-009)
 *   2. Calcular puntaje y porcentaje (RF-013)
 *   3. Cerrar intento y persistir resultado (RF-018)
 *   4. Limpiar borradores residuales
 */
const guardarRespuestas = async (idIntento, respuestas) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    let puntaje = 0;
    const detalle = [];

    for (const r of respuestas) {
      // RF-009: almacenar opción seleccionada y verificar si es correcta
      const [[opcion]] = await conn.query(
        'SELECT id_opcion, texto, valor FROM opcion_respuesta WHERE id_opcion = ?',
        [r.idOpcion]
      );
      const [[pregunta]] = await conn.query(
        'SELECT texto FROM pregunta WHERE id_pregunta = ?',
        [r.preguntaId]
      );
      const [[optCorrecta]] = await conn.query(
        'SELECT texto FROM opcion_respuesta WHERE id_pregunta = ? AND valor = 1.00 LIMIT 1',
        [r.preguntaId]
      );

      const correcta = parseFloat(opcion?.valor) === 1.00;
      if (correcta) puntaje++;

      // RF-009: INSERT en tabla respuesta
      await conn.query(`
        INSERT INTO respuesta (id_intento, id_pregunta, id_opcion, fecha)
        VALUES (?, ?, ?, NOW())
      `, [idIntento, r.preguntaId, r.idOpcion]);

      // RF-012: retroalimentación por pregunta (fortalezas / áreas de mejora)
      detalle.push({
        pregunta:      pregunta?.texto || '',
        opcionElegida: opcion?.texto   || '',
        opcionCorrecta:optCorrecta?.texto || '',
        correcta,
        feedback: correcta
          ? 'Respuesta acertada — este perfil encaja con áreas STEM y análisis.'
          : 'Considera explorar más este tipo de actividades.',
      });
    }

    // RF-013: cálculo de porcentaje de afinidad
    const total      = respuestas.length;
    const porcentaje = Math.round((puntaje / total) * 100);
    const feedback   = `Obtuviste ${puntaje} de ${total} respuestas acertadas (${porcentaje}%).`;

    // CU07 Paso 6: cerrar intento (estado 'completado')
    await conn.query(
      'UPDATE intento_cuestionario SET fecha_fin = NOW(), estado = ? WHERE id_intento = ?',
      ['completado', idIntento]
    );

    // RF-018: persistir resultado con retroalimentación generada
    const [resRow] = await conn.query(
      'INSERT INTO resultado (id_intento, fecha_generacion, retroalimentacion) VALUES (?, NOW(), ?)',
      [idIntento, feedback]
    );

    // Limpiar borradores en_progreso residuales del mismo estudiante
    const [viejosPost] = await conn.query(
      `SELECT id_intento FROM intento_cuestionario
       WHERE id_estudiante = (
         SELECT id_estudiante FROM intento_cuestionario WHERE id_intento = ?
       ) AND estado = 'en_progreso'`,
      [idIntento]
    );
    for (const v of viejosPost) {
      await conn.query('DELETE FROM respuesta WHERE id_intento = ?', [v.id_intento]);
      await conn.query('DELETE FROM intento_cuestionario WHERE id_intento = ?', [v.id_intento]);
    }

    await conn.commit();

    // DS-CU12 Paso 7-8: devolver resultado completo con detalle para visualización
    return {
      id_resultado: resRow.insertId,
      puntaje, total, porcentaje,
      fecha: new Date().toLocaleDateString('es-CO'),
      detalle,
    };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

/**
 * getResultadoByEstudiante
 * CU09 – Visualizar Resultados por Orientador | RF-010
 * CU12 – Recibir Retroalimentación | RF-012
 * DS-CU12 Paso 4: cargarResultadoCompleto(idEstudiante)
 *   [estadoActual == FINALIZADO (Flujo Normal)]
 *   Retorna último resultado completado con detalle de respuestas correctas/incorrectas
 * RF-018: consulta resultado almacenado en tabla resultado
 */
const getResultadoByEstudiante = async (idEstudiante) => {
  // DS-CU12: obtener estado de procesamiento y resultado final
  const [[row]] = await pool.query(`
    SELECT r.id_resultado, r.retroalimentacion, r.fecha_generacion,
           ic.id_intento, ic.fecha_inicio, ic.fecha_fin
    FROM resultado r
    JOIN intento_cuestionario ic ON r.id_intento = ic.id_intento
    WHERE ic.id_estudiante = ? AND ic.estado = 'completado'
    ORDER BY r.fecha_generacion DESC
    LIMIT 1
  `, [idEstudiante]);

  // DS-CU12 [estadoActual != FINALIZADO]: sin resultado disponible
  if (!row) return null;

  // RF-012: cargar detalle de respuestas para mostrar retroalimentación
  const [respuestas] = await pool.query(`
    SELECT p.texto AS pregunta,
           or_elegida.texto AS opcionElegida,
           or_correcta.texto AS opcionCorrecta,
           (or_elegida.valor = 1.00) AS correcta
    FROM respuesta res
    JOIN pregunta p              ON res.id_pregunta = p.id_pregunta
    JOIN opcion_respuesta or_elegida  ON res.id_opcion = or_elegida.id_opcion
    JOIN opcion_respuesta or_correcta ON or_correcta.id_pregunta = p.id_pregunta
                                     AND or_correcta.valor = 1.00
    WHERE res.id_intento = ?
  `, [row.id_intento]);

  // RF-013: recalcular puntaje y porcentaje desde respuestas almacenadas
  const puntaje = respuestas.filter((r) => r.correcta).length;
  const total   = respuestas.length;

  return {
    puntaje,
    total,
    porcentaje: total > 0 ? Math.round((puntaje / total) * 100) : 0,
    fecha: new Date(row.fecha_generacion).toLocaleDateString('es-CO'),
    // RF-012: retroalimentación individual por pregunta (fortalezas / áreas de mejora)
    detalle: respuestas.map((r) => ({
      ...r,
      correcta: Boolean(r.correcta),
      feedback: r.correcta
        ? 'Respuesta acertada — perfil analítico detectado.'
        : 'Considera reforzar este tipo de razonamiento.',
    })),
  };
};

/**
 * getProgreso
 * CU08 – Guardar Progreso del Cuestionario | RF-008
 * Postcondición 2: "Al reingresar, el sistema retoma el cuestionario
 *   desde la última pregunta guardada"
 * DS-CU12 [estadoActual == PROCESANDO]: recupera intento en_progreso
 * Convierte id_opcion → índice para compatibilidad con el frontend
 */
const getProgreso = async (idEstudiante) => {
  // CU08: buscar intento en estado 'en_progreso'
  const [[intento]] = await pool.query(`
    SELECT id_intento FROM intento_cuestionario
    WHERE id_estudiante = ? AND estado = 'en_progreso'
    ORDER BY fecha_inicio DESC LIMIT 1
  `, [idEstudiante]);

  if (!intento) return null;

  const [respondidas] = await pool.query(`
    SELECT id_pregunta AS preguntaId, id_opcion AS idOpcion
    FROM respuesta WHERE id_intento = ?
  `, [intento.id_intento]);

  // RF-008: convertir a { preguntaId: indiceopcion } para retomar desde última pregunta guardada
  const preguntas = await getPreguntas();
  const respuestasObj = {};
  for (const r of respondidas) {
    const preg = preguntas.find((p) => p.id === r.preguntaId);
    if (preg) {
      const idx = preg._opciones.findIndex((o) => o.id === r.idOpcion);
      if (idx !== -1) respuestasObj[r.preguntaId] = idx;
    }
  }

  return {
    id_intento: intento.id_intento,
    respuestas: respuestasObj,
    fechaGuardado: new Date().toLocaleDateString('es-CO'),
  };
};

/**
 * guardarProgreso
 * CU08 – Guardar Progreso del Cuestionario | RF-008, RF-009
 * Paso 1-2: "El estudiante selecciona 'Guardar y continuar después'"
 *   → almacena respuestas parciales con marca de tiempo
 * Paso 2: estado del intento se mantiene como 'en_progreso'
 * Flujo Alterno 2a: error de conexión → rollback automático
 *
 * Transacción:
 *   1. Reutilizar intento en_progreso existente o crear uno nuevo
 *   2. Limpiar respuestas parciales previas del borrador
 *   3. Insertar respuestas actuales usando id_opcion real
 */
const guardarProgreso = async (idEstudiante, respuestas) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // CU08: buscar o crear intento en progreso
    let [[intento]] = await conn.query(`
      SELECT id_intento FROM intento_cuestionario
      WHERE id_estudiante = ? AND estado = 'en_progreso'
      ORDER BY fecha_inicio DESC LIMIT 1
    `, [idEstudiante]);

    let idIntento;
    if (intento) {
      idIntento = intento.id_intento;
      // RF-008: limpiar respuestas previas para reescribir con progreso actual
      await conn.query('DELETE FROM respuesta WHERE id_intento = ?', [idIntento]);
    } else {
      // RF-009: nuevo intento en_progreso
      const [res] = await conn.query(`
        INSERT INTO intento_cuestionario (id_estudiante, id_cuestionario, fecha_inicio, estado)
        VALUES (?, 1, NOW(), 'en_progreso')
      `, [idEstudiante]);
      idIntento = res.insertId;
    }

    // RF-009: persistir cada respuesta parcial usando id_opcion real
    const preguntas = await getPreguntas();
    for (const [preguntaIdStr, opcionIdx] of Object.entries(respuestas)) {
      const preguntaId = parseInt(preguntaIdStr);
      const preg = preguntas.find((p) => p.id === preguntaId);
      if (!preg || opcionIdx === undefined) continue;
      const opcion = preg._opciones[opcionIdx];
      if (!opcion) continue;
      await conn.query(
        'INSERT INTO respuesta (id_intento, id_pregunta, id_opcion, fecha) VALUES (?, ?, ?, NOW())',
        [idIntento, preguntaId, opcion.id]
      );
    }

    await conn.commit();
    return { id_intento: idIntento };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

module.exports = {
  getPreguntas, crearIntento, guardarRespuestas,
  getResultadoByEstudiante, getProgreso, guardarProgreso,
};
