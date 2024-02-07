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

const rolValid = async(rol)=>{
    if(rol!=='ADMIN_ROLE'&&rol!=='USER_ROLE'){
        throw new Error(`Solo se admite de rol ADMIN_ROLE y USER_ROLE`)
    }
}

const isAdmin =  ()=>{
    const userLog = req.userLogin
    if(userLog.rol !='ADMIN_ROLE'){
        throw new Error(`El usuario no es administrador para realizar la acción`)

    }
   
}

module.exports = { existsEmail, existsNick, rolValid ,isAdmin }