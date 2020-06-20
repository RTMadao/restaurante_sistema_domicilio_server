const mongoose = require('mongoose');
const Configuracion = require('./Configuracion');
const Schema = mongoose.Schema;

const Pedido = new Schema({
    cliente: {
        nombre: String,
        barrio: String,
        direccion: String,
        telefono: String
    },
    pedido:{
        consecutivo: Number,
        pendiente: { type: Boolean, default: true},
        fechaHora: { type: Date, default: Date.now },
        platos:[
            {
                nombre: String,
                precio: Number,
                cantidad: Number,
                total: Number
            }
        ],
        valorDomicilio: Number,
        total: Number
    }
})

Pedido.methods.setConsecutivo = function(){
    return new Promise (async (resolve, reject) => {
        let consecutivo = await Configuracion.findOne({},'consecutivo')
        consecutivo.consecutivo.ultimoUsado += 1
        if(consecutivo.consecutivo.ultimoUsado<=consecutivo.consecutivo.final){
            this.pedido.consecutivo = consecutivo.consecutivo.ultimoUsado
            consecutivo.save()
            resolve(null)
        }
        else reject({mensaje: "se han agotado los consecutivos"})
    })
}

module.exports = mongoose.model('Pedido',Pedido)