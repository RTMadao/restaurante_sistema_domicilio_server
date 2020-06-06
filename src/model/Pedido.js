const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Pedido = new Schema({
    cliente: {
        nombre: String,
        barrio: String,
        direccion: String,
        telefono: String
    },
    pedido:{
        pendiente: { type: Boolean, default: true},
        hora: { type: Date, default: Date.now },
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

module.exports = mongoose.model('Pedido',Pedido)