/**
 * authRoutes.js
 * Rutas de Autenticación
 * CU02 – Iniciar Sesión como Estudiante | RF-002
 * DS-CU02: POST /auth/login → login (Paso 4: autenticarUsuario)
 */
const express    = require('express');
const router     = express.Router();
const { login }  = require('../controllers/authController');

router.post('/login', login);

module.exports = router;
