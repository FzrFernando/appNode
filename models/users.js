const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = Schema({
    nombre: String,
    login: String,
    email: String,
    password: String,
    rol: String,
    active: Boolean
})

module.exports = mongoose.model("Users", UsersSchema);