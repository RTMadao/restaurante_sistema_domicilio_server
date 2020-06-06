const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Menu = new Schema({
    nombre: String,
    precio: Number
})

module.exports = mongoose.model('Menu',Menu)