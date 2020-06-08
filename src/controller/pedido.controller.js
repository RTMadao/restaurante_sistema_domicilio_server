const Pedido = require('../model/Pedido')

class PedidoController{

    async guardar(req, res){
        const pedido = new Pedido(req.body)
        const respuesta = await pedido.save();
        res.json({mensaje: 'guardado exitosamente', respuesta: respuesta})
    }

    async listar(req, res){
        const listaPedidos = await Pedido.find()
        res.json({lista: listaPedidos})
    }

    async modificar(req, res){
        const update = await Pedido.updateOne({'_id': req.body._id}, req.body)
        res.json({respuesta: update})
    }

    async eliminar(req, res){
        const delet = await Pedido.remove({'_id': req.body.id})
        res.json({respuesta: delet})
    }

    listarToReporte(){
        return new Promise (async (resolve, reject) => {
            resolve(await Pedido.find())
        })
    }

    async listarPendientes(req, res){
        const listaPedidos = await Pedido.find({'pedido.pendiente': true})
        res.json({lista: listaPedidos})
    }
 
    eliminar(){
        return new Promise (async (resolve, reject) => {
            resolve(await Pedido.remove({},(err) => {console.log(err);}))
        })
    }

}

module.exports = new PedidoController()