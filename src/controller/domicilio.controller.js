const Domicilio = require('../model/Domicilio')

class DomicilioController{

    async guardar(req, res){
        const domicilio = new Domicilio(req.body)
        const respuesta = await domicilio.save();
        res.json({mensaje: 'guardado exitosamente', respuesta: respuesta})
    }

    async listar(req, res){
        const listaDomicilios = await Domicilio.find()
        res.json({lista: listaDomicilios})
    }

    async modificar(req, res){
        const update = await Domicilio.updateOne({'_id': req.body.id}, req.body)
        res.json({respuesta: update})
    }

    async eliminar(req, res){
        const delet = await Domicilio.remove({'_id': req.body.id})
        res.json({respuesta: delet})
    }

}

module.exports = new DomicilioController()