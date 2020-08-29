import {Request, Response} from 'express';
import { DBController } from '../DB/DBController';

class ConfiguracionController{

    constructor(){}

    async modificarConsecutivo(req: Request, res: Response): Promise<void>{
        const {dbname} = req.params;
        const db = await DBController.getInstance().getConnection(dbname)
        if (db != undefined) {
            let configuracion = db.configuracionModel.findOne()
            configuracion.consecutivo.inicial = req.body.consecutivo.inicial
            configuracion.consecutivo.ultimoUsado = req.body.consecutivo.inicial - 1
            configuracion.consecutivo.final = req.body.consecutivo.final
            const update = configuracion.save()
            res.json({mensaje: update})
        }
    }

    async asignarConsecutivo(dbname: string){
        const db = await DBController.getInstance().getConnection(dbname)
        
        if (db != undefined) {
            const consecutivo = await db.configuracionModel.findOne({},'consecutivo')
            consecutivo.consecutivo.ultimoUsado+=1
            consecutivo.save()
            
            return consecutivo.consecutivo.ultimoUsado
        }
        
    }

    // async modificar(req, res){
    //     const update = await Configuracion.updateOne({'_id': req.body._id}, req.body)
    //     res.json({respuesta: update})
    // }

    // async eliminarPorID(req, res){
    //     const {id} = req.params
    //     const delet = await Configuracion.deleteOne({'_id': id})
    //     res.json({respuesta: delet})
    // }

    // async eliminar(req, res){
    //     const delet = await Configuracion.deleteMany({},(err) => {console.log(err);})
    //     res.json({respuesta: delet})
    // }

    // getConfiguracions(){
    //     return new Promise (async (resolve, reject) => {
    //         resolve(await Configuracion.find())
    //     })
    // }

}

export const configuracionController = new ConfiguracionController()