// ============================================================
// Router principal de la API - Mi Camino Módulo A
// Monta todas las rutas CRUD de maestras y transaccionales.
// ============================================================

const express = require('express');
const router = express.Router();

// Importamos controladores de tablas MAESTRAS.
const CarreraController = require('../controllers/carreraController');
const AreaController = require('../controllers/areaController');
const PreguntaController = require('../controllers/preguntaController');
const OpcionRespuestaController = require('../controllers/opcionRespuestaController');
const CuestionarioController = require('../controllers/cuestionarioController');

// Importamos controladores de tablas TRANSACCIONALES.
const IntentoCuestionarioController = require('../controllers/intentoCuestionarioController');
const RespuestaController = require('../controllers/respuestaController');
const ResultadoController = require('../controllers/resultadoController');
const AfinidadAcademicaController = require('../controllers/afinidadAcademicaController');
const RecomendacionController = require('../controllers/recomendacionController');

// Endpoint de salud para validar que la API está activa.
router.get('/health', (req, res) => {
  res.json({ estado: 'ok', modulo: 'Módulo A - Orientación Vocacional', timestamp: new Date().toISOString() });
});

// Pequeño ayudante para registrar las 5 rutas CRUDL de un recurso.
function registrarCRUD(ruta, ctrl) {
  router.get(`/${ruta}`, ctrl.listar);          // Listar
  router.get(`/${ruta}/:id`, ctrl.obtener);     // Leer uno
  router.post(`/${ruta}`, ctrl.crear);          // Crear
  router.put(`/${ruta}/:id`, ctrl.actualizar);  // Actualizar
  router.delete(`/${ruta}/:id`, ctrl.eliminar); // Eliminar
}

// ── Rutas MAESTRAS ───────────────────────────────────────────
registrarCRUD('carreras', CarreraController);
registrarCRUD('areas', AreaController);
registrarCRUD('preguntas', PreguntaController);
registrarCRUD('opciones', OpcionRespuestaController);
// Cuestionario incluye además endpoint del cuestionario activo.
router.get('/cuestionarios/activo', CuestionarioController.obtenerActivo);
registrarCRUD('cuestionarios', CuestionarioController);

// ── Rutas TRANSACCIONALES ────────────────────────────────────
// Endpoint auxiliar para poblar dropdown FK de estudiantes en la interfaz.
router.get('/estudiantes', IntentoCuestionarioController.listarEstudiantes);
registrarCRUD('intentos', IntentoCuestionarioController);
registrarCRUD('respuestas', RespuestaController);
registrarCRUD('resultados', ResultadoController);
registrarCRUD('afinidades', AfinidadAcademicaController);
registrarCRUD('recomendaciones', RecomendacionController);

module.exports = router;
