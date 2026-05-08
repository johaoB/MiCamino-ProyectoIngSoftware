const express = require('express');
const router  = express.Router();
const { getEstudiante } = require('../controllers/padreController');

router.get('/estudiante/:codigoVinculo', getEstudiante);

module.exports = router;
