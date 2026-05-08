const express        = require('express');
const cors           = require('cors');
const errorHandler   = require('./middlewares/errorHandler');
const userRoutes     = require('./routes/userRoutes');
const authRoutes     = require('./routes/authRoutes');
const encuestaRoutes = require('./routes/encuestaRoutes');
const padreRoutes    = require('./routes/padreRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users',    userRoutes);
app.use('/api/auth',     authRoutes);
app.use('/api/encuesta', encuestaRoutes);
app.use('/api/padre',    padreRoutes);

app.use(errorHandler);

module.exports = app;
