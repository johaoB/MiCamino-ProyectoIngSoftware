/**
 * encuestaRoutes.js
 * Rutas del Cuestionario Vocacional
 *
 * CU07 – Responder Cuestionario: GET / → getEncuesta, POST /submit → submitEncuesta
 * CU08 – Guardar Progreso: POST /progreso, GET /progreso/:id
 * CU09 – Ver Resultados: GET /resultado/:idEstudiante
 * CU12 – Retroalimentación: GET /resultado/:idEstudiante
 * RF-007: Presentación del cuestionario — GET /
 * RF-008: Guardado de progreso — POST /progreso
 * RF-009: Registro de respuestas — POST /submit
 * RF-010: Visualización de resultados — GET /resultado/:id
 * RF-012: Retroalimentación automática — GET /resultado/:id
 * RF-019: Tendencias laborales — GET /tendencias
 */
const express = require('express');
const router  = express.Router();
const { getEncuesta, submitEncuesta, getResultado, getTendencias, guardarProgreso, getProgreso } =
  require('../controllers/encuestaController');

// CU07 / RF-007: obtener preguntas del cuestionario
router.get('/',                          getEncuesta);

// CU07 / RF-009, RF-012: enviar respuestas finales y generar resultado
router.post('/submit',                   submitEncuesta);

// CU09 / CU12 / RF-010: consultar resultado y retroalimentación del estudiante
router.get('/resultado/:idEstudiante',   getResultado);

// RF-019, RF-020, RF-021: consultar tendencias del mercado laboral
router.get('/tendencias',                getTendencias);

// CU08 / RF-008: guardar progreso parcial del cuestionario
router.post('/progreso',                 guardarProgreso);

// CU08 / RF-008: recuperar progreso guardado para continuar
router.get('/progreso/:idEstudiante',    getProgreso);

module.exports = router;
