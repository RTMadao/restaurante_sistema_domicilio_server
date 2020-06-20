const express = require('express')
const router = express.Router();
const controller = require('../controller/reporte.controller')

router.get('/generar',controller.generar)
router.get('/',controller.listar)

module.exports = router; 