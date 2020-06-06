const Menu = require('../model/Menu')

class MenuController{

    async guardar(req, res){
        const menu = new Menu(req.body)
        const respuesta = await menu.save();
        res.json({mensaje: 'guardado exitosamente', respuesta: respuesta})
    }

    async listar(req, res){
        const listamenus = await Menu.find()
        res.json({lista: listamenus})
    }

    async modificar(req, res){
        const update = await Menu.updateOne({'_id': req.body.id}, req.body)
        res.json({respuesta: update})
    }

    async eliminar(req, res){
        const delet = await Menu.remove({'_id': req.body.id})
        res.json({respuesta: delet})
    }

}

module.exports = new MenuController()