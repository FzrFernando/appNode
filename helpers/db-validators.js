const User = require('../models/users');

const existsEmail = async (email) => {
    const emailDb = await User.findOne({email});
    if (emailDb) {
        throw new Error(`Email ${email} already exists in database`)
    }
}

const existsNick = async (login) => {
    const nickDb = await User.findOne({login});
    if (nickDb) {
        throw new Error(`Nick ${login} already exists in database`)
    }
}

module.exports = { existsEmail, existsNick }