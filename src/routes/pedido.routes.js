const express = require('express')
const router = express.Router();
const controller = require('../controller/pedido.controller')

router.get('/',controller.listar)
router.post('/',controller.guardar)
router.get('/pendiente',controller.listarPendientes)
router.put('/',controller.modificar)
router.delete('/',controller.eliminar)

module.exports = router;