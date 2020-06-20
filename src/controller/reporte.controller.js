const ReporteDia = require('../model/ReporteDiario')
const Menu = require('../model/Menu')
const Pedido = require('../model/Pedido')
const DetalleReporteController = require('./detalleReporte.controller')


class ReporteController{

    async generar(req, res){
        
        const pedidos = await Pedido.find({},'pedido')
        var infoReporte = await ReporteController.getItemsReporte(pedidos)

        const reporte = new ReporteDia(infoReporte)
        reporte.save()

        res.json({lista: reporte})
    }

    async listar(req, res){
        const listaReportes = await ReporteDia.find()
        res.json({Reportes: listaReportes})
    }

    async eliminar(req, res){
        const delet = await Reporte.remove({'_id': req.body.id})
        res.json({respuesta: delet})
    }

    static getItemsReporte(pedidos){
        return new Promise (async (resolve, reject) => {
            let items = new DetalleReporteController(), domicilio = 0, total = 0
            pedidos.forEach( (pedido, i, array) => {
                pedido.pedido.platos.forEach( platoPedido => {
                    items.addItem(platoPedido.nombre,platoPedido.cantidad,platoPedido.precio)
                })
                domicilio += pedido.pedido.valorDomicilio
                total += pedido.pedido.total
                if(i == array.length -1) resolve({platosVendidos: items.getItems(), totalDomicilio: domicilio, totalVendido: total})
            })
        })
    }

    getUltimoConsecutivo(){
        return null
    }

}

module.exports = new ReporteController()