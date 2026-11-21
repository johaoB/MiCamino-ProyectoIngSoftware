const express           = require('express');
const cors              = require('cors');
const errorHandler      = require('./middlewares/errorHandler');
const userRoutes        = require('./routes/userRoutes');
const authRoutes        = require('./routes/authRoutes');
const encuestaRoutes    = require('./routes/encuestaRoutes');
const padreRoutes       = require('./routes/padreRoutes');
const adminRoutes       = require('./routes/adminRoutes');
const institucionRoutes = require('./routes/institucionRoutes');
// UNIFICACIÓN: rutas CRUD del Módulo A (carreras, áreas, preguntas, intentos, resultados, ...)
const moduloARoutes     = require('./routes/moduloARoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users',       userRoutes);
app.use('/api/auth',        authRoutes);
app.use('/api/encuesta',    encuestaRoutes);
app.use('/api/padre',       padreRoutes);
app.use('/api/admin',       adminRoutes);
app.use('/api/institucion', institucionRoutes);
// UNIFICACIÓN: el Módulo A conserva sus rutas originales (/api/carreras, /api/intentos, ...)
// y comparte el mismo pool/BD que el Módulo B. No hay choques con los prefijos anteriores.
app.use('/api',             moduloARoutes);

app.use(errorHandler);
module.exports = app;
