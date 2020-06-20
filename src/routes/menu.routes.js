const express = require('express')
const router = express.Router();
const controller = require('../controller/menu.controller')

router.get('/',controller.listar)
router.post('/',controller.guardar)
router.post('/conjunto',controller.guardarConjunto)
router.put('/',controller.modificar)
router.delete('/:id',controller.eliminar)

module.exports = router;