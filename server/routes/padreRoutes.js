/**
 * padreRoutes.js
 * Rutas del Módulo de Padre/Acudiente
 *
 * CU05 – Registrar Padre de Familia y Vincular a Estudiante
 * RF-016: Visualización de resultados por padres — GET /padre/vinculacion/:idPadre
 * RF-022: Consulta de estabilidad laboral para padres
 */
const express = require('express');
const router  = express.Router();
const { getEstudiantePorPadre } = require('../controllers/padreController');

// CU05 Paso 5 / RF-016: obtener estudiante vinculado y sus resultados vocacionales
router.get('/vinculacion/:idPadre', getEstudiantePorPadre);

module.exports = router;
