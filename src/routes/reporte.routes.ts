import express from 'express'
import {Request, Response} from 'express';
const router = express.Router();
import { reporteController } from '../controller/reporte.controller';

router.get('/:dbname',async (req: Request, res: Response) => {
    const {dbname} = req.params;

    reporteController.listar(dbname)
    .then(respuesta => { 
        res.json({mensaje: respuesta})
    })
    .catch(error => {
        res.json({mensaje: error})
    })
})

router.get('/:dbname/generar',async (req: Request, res: Response) => {
    const {dbname} = req.params;

    reporteController.generar(dbname)
    .then(respuesta => { 
        res.json({mensaje: respuesta})
    })
    .catch(error => {
        res.json({mensaje: error})
    })
})

export const reporteRoutes = router;