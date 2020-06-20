const Configuracion = require('../model/Configuracion')

class ConfiguracionController{

    constructor(){
        Configuracion.find()
        .then(configuraciones => {
            if(configuraciones.length == 0){
                const configuracion = new Configuracion({
                    consecutivo: {
                        inicial: 0,
                        ultimoUsado: 0,
                        final: 0
                    }
                })
                configuracion.save()
            }
        })
    }

    async modificarConsecutivo(req, res){
        let configuracion = await Configuracion.findOne()
        configuracion.consecutivo.inicial = req.body.consecutivo.inicial
        configuracion.consecutivo.ultimoUsado = req.body.consecutivo.inicial - 1
        configuracion.consecutivo.final = req.body.consecutivo.final
        const update = configuracion.save()
        res.json({mensaje: configuracion})
    }

    async obtenerConsecutivo(req, res){
        const consecutivo = await Configuracion.findOne({},'consecutivo')
        res.json(consecutivo)
    }

    async modificar(req, res){
        const update = await Configuracion.updateOne({'_id': req.body._id}, req.body)
        res.json({respuesta: update})
    }

    async eliminarPorID(req, res){
        const {id} = req.params
        const delet = await Configuracion.deleteOne({'_id': id})
        res.json({respuesta: delet})
    }

    async eliminar(req, res){
        const delet = await Configuracion.deleteMany({},(err) => {console.log(err);})
        res.json({respuesta: delet})
    }

    getConfiguracions(){
        return new Promise (async (resolve, reject) => {
            resolve(await Configuracion.find())
        })
    }

}

module.exports = new ConfiguracionController()