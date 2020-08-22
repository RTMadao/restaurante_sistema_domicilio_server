const Pedido = require('../model/Pedido')

class PedidoController{

    async guardar(req, res){
        console.log('hola');
        const pedido = new Pedido(req.body)
        try {
            await pedido.setConsecutivo()
            const respuesta = await pedido.save()
            res.json({mensaje: respuesta})
        } catch (error) {
            res.json(error)
        }
    }

    async listar(req, res){
        const listaPedidos = await Pedido.find()
        res.json({lista: listaPedidos})
    }

    async modificar(req, res){
        const update = await Pedido.updateOne({'_id': req.body._id}, req.body)
        res.json({respuesta: update})
    }

    async eliminarPorID(req, res){
        const {id} = req.params
        const delet = await Pedido.deleteOne({'_id': id})
        res.json({respuesta: delet})
    }

    async eliminar(req, res){
        const delet = await Pedido.deleteMany({},(err) => {console.log(err);})
        console.log(delet);
        res.json({respuesta: delet})
    }

    async setPedidos(){
        socketController.sendPedido(await Pedido.find())
    }

}

module.exports = new PedidoController()