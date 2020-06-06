const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Domicilio = new Schema({
    barrio: String,
    valor: Number
})

module.exports = mongoose.model('Domicilio',Domicilio)