const express = require('express')
const router = express.Router();
const controller = require('../controller/configuracion.controller')

router.get('/consecutivo',controller.asignarConsecutivo)
router.post('/consecutivo',controller.modificarConsecutivo)
router.put('/',controller.modificar)
router.delete('/',controller.eliminar)
router.delete('/:id',controller.eliminarPorID)

module.exports = router;