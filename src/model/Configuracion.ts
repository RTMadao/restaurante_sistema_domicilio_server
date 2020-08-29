import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Configuracion = new Schema({
    consecutivo: {
        inicial: Number,
        ultimoUsado: Number,
        final: Number
    }
})