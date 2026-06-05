/**
 * encuestaController.js
 * Controlador del Cuestionario Vocacional
 *
 * Trazabilidad:
 *  - CU07 – Responder Cuestionario Vocacional
 *  - CU08 – Guardar Progreso del Cuestionario
 *  - CU09 – Visualizar Resultados de Estudiante por Orientador
 *  - CU12 – Recibir Retroalimentación del Cuestionario
 *  - RF-007: Presentación del cuestionario
 *  - RF-008: Guardado de progreso del cuestionario
 *  - RF-009: Registro de respuestas
 *  - RF-010: Visualización de resultados por orientadores
 *  - RF-012: Generación de retroalimentación automática
 *  - RF-013: Cálculo de porcentajes de afinidad
 *  - RF-019: Visualización de tendencias laborales
 *  - Diagrama de Secuencia CU12: Recibir Retroalimentación del Cuestionario
 *    (DiagramadeSecuencia4.jpeg / Image 1)
 */

const EncuestaModel = require('../models/encuestaModel');
const TendenciaModel = require('../models/tendenciaModel');

/**
 * getEncuesta
 * CU07 – Responder Cuestionario Vocacional | RF-007
 * DS-CU12 Paso 2 (contexto): sistema muestra instrucciones y preguntas
 * Retorna preguntas con opciones SIN exponer metadatos internos (_opciones, correcta)
 */
const getEncuesta = async (req, res) => {
  try {
    const preguntas = await EncuestaModel.getPreguntas();
    // RF-007: presentar cuestionario interactivo — no exponer lógica de evaluación al frontend
    res.json(preguntas.map(({ id, pregunta, opciones }) => ({ id, pregunta, opciones })));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * submitEncuesta
 * CU07 – Responder Cuestionario Vocacional | RF-009, RF-012, RF-013
 * DS-CU12 (flujo normal):
 *   Paso 4  cargarResultadoCompleto(idEstudiante) — se obtienen preguntas
 *   Paso 5  new ResultadoVocacional(datos...) — EncuestaModel.crearIntento + guardarRespuestas
 *   Paso 7  mostrarRetroalimentación(instanciaResultado) — resultado con puntaje y feedback
 *   Paso 8  visualizarResumen(fortalezas, areasMejora) — detalle por pregunta
 * RF-012: Generación de retroalimentación automática al finalizar
 * RF-013: Cálculo de porcentajes de afinidad (porcentaje devuelto en respuesta)
 */
const submitEncuesta = async (req, res) => {
  try {
    const { idEstudiante, respuestas } = req.body;
    // RF-009: validar datos completos antes de registrar respuestas
    if (!idEstudiante || !respuestas)
      return res.status(400).json({ message: 'Datos incompletos' });

    const preguntas = await EncuestaModel.getPreguntas();

    // CU07 Paso 4: registrar cada respuesta en tiempo real (conversión índice → id_opcion)
    const respuestasConId = respuestas.map((r) => {
      const preg = preguntas.find((p) => p.id === r.preguntaId);
      if (!preg) return null;
      const opcion = preg._opciones[r.opcionSeleccionada];
      return { preguntaId: r.preguntaId, idOpcion: opcion?.id };
    }).filter(Boolean);

    // CU07 Paso 5-6: crear intento y procesar respuestas → genera perfil vocacional
    const idIntento  = await EncuestaModel.crearIntento(idEstudiante);
    const resultado  = await EncuestaModel.guardarRespuestas(idIntento, respuestasConId);

    // CU07 Paso 7: sistema muestra mensaje de confirmación con resultados disponibles
    res.json(resultado);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * getResultado
 * CU09 – Visualizar Resultados de Estudiante por Orientador | RF-010
 * CU12 – Recibir Retroalimentación del Cuestionario | RF-012
 * DS-CU12 Paso 4: cargarResultadoCompleto(idEstudiante)
 *   → Flujo Normal [estadoActual == FINALIZADO]:
 *     retorna resultado con puntaje, detalle y retroalimentación
 * DS-CU12 Flujo Alterno 2b: sin resultados aún → 404 'Sin resultados aún'
 */
const getResultado = async (req, res) => {
  try {
    const resultado = await EncuestaModel.getResultadoByEstudiante(Number(req.params.idEstudiante));

    // DS-CU12 [estadoActual == PROCESANDO / ERROR]: aún no hay resultado disponible
    if (!resultado) return res.status(404).json({ message: 'Sin resultados aún' });
    res.json(resultado);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * getTendencias
 * RF-019: Visualización de tendencias laborales
 * RF-020: Estadísticas de empleabilidad local
 * RF-021: Información por sectores productivos
 * CU12 Paso 3: estudiante puede navegar entre secciones de retroalimentación
 *   incluyendo información de mercado laboral
 */
const getTendencias = async (req, res) => {
  try {
    const data = await TendenciaModel.getTendencias();
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * guardarProgreso
 * CU08 – Guardar Progreso del Cuestionario | RF-008
 * Paso 1-2: "El estudiante selecciona 'Guardar y continuar después'"
 *   → sistema almacena respuestas parciales con marca de tiempo (en_progreso)
 * Paso 3: confirma el guardado
 * RF-009: registro de respuestas parciales asociadas al estudiante
 */
const guardarProgreso = async (req, res) => {
  try {
    const { idEstudiante, respuestas } = req.body;
    // CU08: requiere idEstudiante para asociar el borrador
    if (!idEstudiante) return res.status(400).json({ message: 'idEstudiante requerido' });

    // CU08 Paso 2: almacena respuestas parciales
    await EncuestaModel.guardarProgreso(idEstudiante, respuestas || {});
    res.json({ message: 'Progreso guardado' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

/**
 * getProgreso
 * CU08 – Guardar Progreso del Cuestionario | RF-008
 * Postcondición 2: "Al reingresar, el sistema retoma el cuestionario
 *   desde la última pregunta guardada"
 * DS-CU12: permite recuperar estado en_progreso para continuar
 */
const getProgreso = async (req, res) => {
  try {
    const progreso = await EncuestaModel.getProgreso(Number(req.params.idEstudiante));

    // CU08 Flujo Alterno 2a: sin progreso previo guardado
    if (!progreso) return res.status(404).json({ message: 'Sin progreso guardado' });
    res.json(progreso);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getEncuesta, submitEncuesta, getResultado, getTendencias, guardarProgreso, getProgreso };
