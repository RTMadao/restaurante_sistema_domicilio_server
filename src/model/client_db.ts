import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export const client_db = new Schema({
    dbname: String,
    key: String
})
