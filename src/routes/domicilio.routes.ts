import express from 'express'
import {Request, Response} from 'express';
const router = express.Router();
import { domicilioController } from '../controller/domicilio.controller';
import {SocketController} from '../socket/socket.controller'

router.post('/:dbname',async (req: Request, res: Response, next) => {
    const {dbname} = req.params;

    domicilioController.guardar(dbname, req.body)
    .then(respuesta => { 
        res.json({mensaje: respuesta})
        next()
    })
    .catch(error => {
        res.json({mensaje: error})
    })
},setUpdateToAllUser)

router.post('/:dbname/conjunto',async (req: Request, res: Response, next) => {
    const {dbname} = req.params;

    domicilioController.guardarConjunto(dbname, req.body)
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

    domicilioController.modificar(dbname,id,req.body)
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

    domicilioController.eliminar(dbname,id)
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
    domicilioController.listar(dbname)
    .then(lista => {
        const socket = SocketController.getInstance().getSocket(dbname)
        if (socket != undefined) {
            socket.emitUpdateDomicilio(lista)
        }
    })
}

export const domicilioRoutes = router;