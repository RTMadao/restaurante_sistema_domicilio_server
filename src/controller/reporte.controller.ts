const ReporteDia = require('../model/ReporteDiario')
const Menu = require('../model/Menu')
import { DBController } from '../DB/DBController';
import {pedidoController} from '../controller/pedido.controller'
const DetalleReporteController = require('./detalleReporte.controller')


class ReporteController{

    async generar(dbname: string){
        return new Promise(async (resolve, reject) => {
            try {
                const pedidos = await pedidoController.listar(dbname)
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    var reporte = new db.reporteDiarioModel()
                    reporte.addItem({nombre: 'sopa', total: 20000, cantidad: 2})
                    reporte.addItem({nombre: 'sopa', total: 10000, cantidad: 1})
                    reporte.addItem({nombre: 'sancocho', total: 15000, cantidad: 1})
                    resolve(reporte)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }
        
        //const reporte = new ReporteDia(infoReporte)
        //reporte.save()

        //res.json({lista: reporte})

    public listar(dbname: string) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = DBController.getInstance().getConnection(dbname)
                if (db != undefined) {
                    const listaReportes = await db.reporteDiarioModel.find()
                    resolve(listaReportes)
                }
            } catch (error) {
                console.log(error);
                reject(error)
            }
        })
    }

    // async eliminar(req, res){
    //     const delet = await Reporte.remove({'_id': req.body.id})
    //     res.json({respuesta: delet})
    // }

    // static getItemsReporte(pedidos){
    //     return new Promise (async (resolve, reject) => {
    //         let items = new DetalleReporteController(), domicilio = 0, total = 0
    //         pedidos.forEach( (pedido, i, array) => {
    //             pedido.pedido.platos.forEach( platoPedido => {
    //                 items.addItem(platoPedido.nombre,platoPedido.cantidad,platoPedido.precio)
    //             })
    //             domicilio += pedido.pedido.valorDomicilio
    //             total += pedido.pedido.total
    //             if(i == array.length -1) resolve({platosVendidos: items.getItems(), totalDomicilio: domicilio, totalVendido: total})
    //         })
    //     })
    // }

    // getUltimoConsecutivo(){
    //     return null
    // }

}

export const reporteController = new ReporteController()