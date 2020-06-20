const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReporteDia = new Schema({
    fecha: { type: Date, default: Date.now },
    platosVendidos:[
        {
            nombre: String,
            valor: Number,
            cantidad: Number
        }
    ],
    totalDomicilio: Number,
    totalVendido: Number
})

module.exports = mongoose.model('ReporteDia',ReporteDia)