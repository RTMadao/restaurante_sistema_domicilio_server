const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Configuracion = new Schema({
    consecutivo: {
        inicial: Number,
        ultimoUsado: Number,
        final: Number
    }
})

module.exports = mongoose.model('Configuracion',Configuracion)