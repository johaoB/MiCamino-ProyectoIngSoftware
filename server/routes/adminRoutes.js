/**
 * adminRoutes.js
 * Rutas de Administración
 *
 * CU04 – Validar Registro de Estudiante: GET /admin/pendientes, PUT /admin/aprobar/:id, PUT /admin/denegar/:id
 * CU05 – Vincular Padre-Estudiante: GET /admin/padres, POST /admin/vincular
 * RF-004: Visualización de estudiantes — GET /admin/estudiantes
 * RF-005: Validación institucional — aprobar / denegar
 * RF-016: Visualización de resultados por padres — apoyo en vinculación
 */
const express = require('express');
const router  = express.Router();
const { getPendientes, aprobar, denegar, getEstudiantes, getPadres, vincularPadreEstudiante } =
  require('../controllers/adminController');

// CU04 Paso 1-2: listar solicitudes pendientes de validación
router.get('/pendientes',        getPendientes);

// CU04 Paso 4-5: aprobar cuenta → estado 'activo'
router.put('/aprobar/:id',       aprobar);

// CU04 Paso 4-5 / Flujo Alterno 3b: denegar cuenta → estado 'denegado'
router.put('/denegar/:id',       denegar);

// RF-004: listar todos los estudiantes para administrador
router.get('/estudiantes',       getEstudiantes);

// CU05: listar padres activos para gestión de vínculos
router.get('/padres',            getPadres);

// CU05 Paso 5-6: crear vínculo padre-estudiante
router.post('/vincular',         vincularPadreEstudiante);

module.exports = router;
