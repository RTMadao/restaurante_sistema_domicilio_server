const Menu = require('../model/Menu')

class MenuController{

    async guardar(req, res){
        const menu = new Menu(req.body)
        const respuesta = await menu.save();
        res.json({mensaje: 'guardado exitosamente', respuesta: respuesta})
    }

    guardarConjunto(req, res){
        req.body.forEach( async (element,i,array) => {
            const menu = new Menu(element)
            const respuesta = await menu.save();
            if(i == array.length -1) res.json({mensaje: 'guardado exitosamente'})
        });
        
    }

    async listar(req, res){
        const listamenus = await Menu.find()
        res.json({lista: listamenus})
    }

    async modificar(req, res){
        const update = await Menu.updateOne({'_id': req.body._id}, req.body)
        res.json({respuesta: update})
    }

    async eliminar(req, res){
        const {id} = req.params
        const delet = await Menu.remove({'_id': id})
        res.json({respuesta: delet})
    }

}

module.exports = new MenuController()