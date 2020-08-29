import { DBController } from '../DB/DBController';
import { configuracionController } from './configuracion.controller';

class PedidoController {

    constructor() { }

    public guardar(dbname: string, pedido: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                pedido.pedido.consecutivo = await configuracionController.asignarConsecutivo(dbname)
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const nuevoPedido = new db.pedidoModel(pedido)
                    const respuesta = await nuevoPedido.save()
                    resolve(respuesta)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    public listar(dbname: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const listaPedidos = await db.pedidoModel.find()
                    resolve(listaPedidos)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    public modificar(dbname: string, id: string, pedido: any) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const update = await db.pedidoModel.updateOne({ '_id': id }, pedido)
                    resolve(update)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    public eliminarPorID(dbname: string, id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const delet = await db.pedidoModel.deleteOne({ '_id': id })
                    resolve(delet)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    public eliminar(dbname: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const delet = await db.pedidoModel.deleteMany({})
                    resolve(delet)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

}

export const pedidoController = new PedidoController()