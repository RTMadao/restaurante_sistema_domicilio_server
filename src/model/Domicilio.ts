import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Domicilio = new Schema({
    barrio: String,
    valor: Number
})