import express from 'express'
import {Request, Response} from 'express';
const router = express.Router();
import { menuController } from '../controller/menu.controller';
import {SocketController} from '../socket/socket.controller'

router.post('/:dbname',async (req: Request, res: Response, next) => {
    const {dbname} = req.params;

    menuController.guardar(dbname, req.body)
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

    menuController.guardarConjunto(dbname, req.body)
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

    menuController.modificar(dbname,id,req.body)
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

    menuController.eliminar(dbname,id)
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
    menuController.listar(dbname)
    .then(lista => {
        const socket = SocketController.getInstance().getSocket(dbname)
        if (socket != undefined) {
            socket.emitUpdateMenu(lista)
        }
    })
}

export const menuRoutes = router;