import express from 'express'
import {Request, Response} from 'express';
const router = express.Router();
import { pedidoController } from '../controller/pedido.controller';
import {SocketController} from '../socket/socket.controller'

// router.get('/',pedidoController.listar)
router.post('/:dbname',async (req: Request, res: Response, next) => {
    const {dbname} = req.params;

    pedidoController.guardar(dbname, req.body)
    .then(respuesta => { 
        res.json({mensaje: respuesta})
        next()
    })
    .catch(error => {
        res.json({mensaje: error})
    })
},setUpdateToAllUser)

router.put('/:dbname/:id',async (req: Request, res: Response, next) => {
    const {dbname, id} = req.params;

    pedidoController.modificar(dbname,id,req.body)
    .then(respuesta => { 
        res.json({mensaje: respuesta})
        next()
    })
    .catch(error => {
        res.json({mensaje: error})
    })
},setUpdateToAllUser)

router.delete('/:dbname/:id',async (req: Request, res: Response, next) => {
    const {dbname, id} = req.params;

    pedidoController.eliminarPorID(dbname,id)
    .then(respuesta => { 
        res.json({mensaje: respuesta})
        next()
    })
    .catch(error => {
        res.json({mensaje: error})
    })
},setUpdateToAllUser)

router.delete('/:dbname',async (req: Request, res: Response, next) => {
    const {dbname, id} = req.params;

    pedidoController.eliminar(dbname)
    .then(respuesta => { 
        res.json({mensaje: respuesta})
        next()
    })
    .catch(error => {
        res.json({mensaje: error})
    })
},setUpdateToAllUser)

function setUpdateToAllUser(req: Request, res: Response) {
    const {dbname} = req.params;
    pedidoController.listar(dbname)
    .then(lista => {
        const socket = SocketController.getInstance().getSocket(dbname)
        if (socket != undefined) {
            socket.emitNewPedido(lista)
        }
    })
}

export const pedidoRoutes = router;