import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Pedido = new Schema({
    cliente: {
        nombre: String,
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
                cantidad: Number,
                total: Number
            }
        ],
        valorDomicilio: Number,
        descuento: Number,
        total: Number
    }
})