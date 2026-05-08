// Importamos express para declarar un router principal.
const express = require('express');
// Importamos rutas específicas del cuestionario.
const cuestionarioRoutes = require('./cuestionarioRoutes');

// Creamos router principal de la API.
const router = express.Router();

// Ruta de salud para validar que API está activa.
router.get('/health', (req, res) => {
  // Respondemos con mensaje básico y timestamp.
  res.json({ estado: 'ok', modulo: 'Módulo A - Orientación Vocacional', timestamp: new Date().toISOString() });
});

// Montamos rutas funcionales del cuestionario.
router.use('/', cuestionarioRoutes);

// Exportamos router.
module.exports = router;
