const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = Schema({
    nombre: String,
    email: String,
    password: String,
    rol: String,
    nick: String
})

module.exports = mongoose.model("Users", UsersSchema);