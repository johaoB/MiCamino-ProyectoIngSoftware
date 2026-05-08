// Importamos Express para crear servidor web.
const express = require('express');
// Importamos CORS para permitir peticiones desde el frontend.
const cors = require('cors');
// Importamos dotenv para variables de entorno.
require('dotenv').config();
// Importamos rutas de la API.
const apiRoutes = require('./routes');

// Creamos la aplicación de Express.
const app = express();

// Definimos puerto usando variable de entorno o 4000 por defecto.
const PORT = Number(process.env.PORT || 4000);

// Habilitamos CORS para comunicación frontend-backend en desarrollo local.
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));

// Habilitamos parseo de JSON en body de peticiones POST/PUT.
app.use(express.json());

// Montamos todas las rutas API bajo prefijo /api.
app.use('/api', apiRoutes);

// Iniciamos el servidor y mostramos mensaje informativo.
app.listen(PORT, () => {
  console.log('');
  console.log('  ✅  Backend listo  →  http://localhost:' + PORT);
  console.log('  📋  Modo DEMO: datos mock en memoria (sin PostgreSQL)');
  console.log('');
});
