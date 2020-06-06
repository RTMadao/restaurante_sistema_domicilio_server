const express = require('express')
const router = express.Router();
const controller = require('../controller/menu.controller')

router.get('/',controller.listar)
router.post('/',controller.guardar)
router.put('/',controller.modificar)
router.delete('/',controller.eliminar)

module.exports = router;