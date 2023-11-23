const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModeloSchema = Schema({
    nombre: String,
    caballos: String,
    anno_modelo: String,
    idMarca: String
})

module.exports = mongoose.model("Modelo", ModeloSchema);