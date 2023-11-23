const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarcaSchema = Schema({
    nombre: String,
    anno_fundacion: String,
    fundador: String
})

module.exports = mongoose.model("Marca", MarcaSchema);