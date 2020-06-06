const Reporte = require('../model/ReporteDiario')
const Menu = require('../model/Menu')
const Pedido = require('../model/Pedido')
const DetalleReporteController = require('./detalleReporte.controller')


class ReporteController{

    async generar(req, res){
        
        const fechaActual = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
        
        const pedido = await Pedido.find({},'pedido')
        var reporte = await ReporteController.getItemsReporte(pedido)
        
        reporte.fecha = fechaActual

        res.json({reporte: reporte})
    }

    async listar(req, res){
        const listaReportes = await Reporte.find()
        res.json({Reportes: listaReportes})
    }

    async modificar(req, res){
        const update = await Reporte.updateOne({'_id': req.body.id}, req.body)
        res.json({respuesta: update})
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
                if(i == array.length -1) resolve({items: items.getItems(), valorDomicilio: domicilio, total: total})
            })
        })
    }

}

module.exports = new ReporteController()