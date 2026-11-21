const express = require('express');
const router  = express.Router();
const { getEstudiantes } = require('../controllers/institucionController');

router.get('/estudiantes/:institucion', getEstudiantes);

module.exports = router;
