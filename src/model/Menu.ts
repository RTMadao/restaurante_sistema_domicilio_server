import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Menu = new Schema({
    nombre: String,
    precio: Number
})
