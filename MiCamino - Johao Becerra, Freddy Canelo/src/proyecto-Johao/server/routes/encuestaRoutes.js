const express = require('express');
const router  = express.Router();
const { getEncuesta, submitEncuesta, getResultado, getTendencias } = require('../controllers/encuestaController');

router.get('/',                    getEncuesta);
router.post('/submit',             submitEncuesta);
router.get('/resultado/:codigo',   getResultado);
router.get('/tendencias',          getTendencias);

module.exports = router;
