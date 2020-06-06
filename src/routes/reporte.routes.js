const express = require('express')
const router = express.Router();
const controller = require('../controller/reporte.controller')

router.get('/',controller.generar)

module.exports = router; 