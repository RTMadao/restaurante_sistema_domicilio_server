const Domicilio = require('../model/Domicilio')

class DomicilioController{

    async guardar(req, res){
        const domicilio = new Domicilio(req.body)
        const respuesta = await domicilio.save();
        res.json({mensaje: 'guardado exitosamente', respuesta: respuesta})
    }

    guardarConjunto(req, res){
        req.body.forEach( async (element,i,array) => {
            const domicilio = new Domicilio(element)
            const respuesta = await domicilio.save();
            if(i == array.length -1) res.json({mensaje: 'guardado exitosamente'})
        });
        
    }

    async listar(req, res){
        const listaDomicilios = await Domicilio.find()
        res.json({lista: listaDomicilios})
    }

    async modificar(req, res){
        const update = await Domicilio.updateOne({'_id': req.body._id}, req.body)
        res.json({respuesta: update})
    }

    async eliminar(req, res){
        const {id} = req.params
        const delet = await Domicilio.remove({'_id': id})
        res.json({respuesta: delet})
    }

}

module.exports = new DomicilioController()