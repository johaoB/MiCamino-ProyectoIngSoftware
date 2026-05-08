// Importamos express para crear un router modular.
const express = require('express');
// Importamos funciones del controlador del cuestionario.
const {
  obtenerCuestionarioActivo,
  finalizarCuestionario
} = require('../controllers/cuestionarioController');

// Creamos instancia de router para agrupar endpoints del módulo.
const router = express.Router();

// Endpoint GET para obtener el cuestionario activo con sus preguntas/opciones.
router.get('/cuestionario/activo', obtenerCuestionarioActivo);

// Endpoint POST para finalizar cuestionario y calcular resultados.
router.post('/cuestionario/finalizar', finalizarCuestionario);

// Exportamos router para montarlo en server.js.
module.exports = router;
