const User = require('../models/users');

const existsEmail = async (email) => {
    const emailDb = await User.findOne({email});
    if (emailDb) {
        throw new Error(`Email ${email} already exists in database`)
    }
}

const rolUser = async (rol) => {
    const rolExists = await User.findOne({rol});
    if (rolExists != "USER" || rolExists != "ADMIN") {
        throw new Error('Debes de tener un rol válido')
    }
}

module.exports = { existsEmail, rolUser }