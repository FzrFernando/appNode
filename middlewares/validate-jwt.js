const { request, response } = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        //const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const { uid } = jwt.verify(token, process.env.SECRET);
        //req.uid = uid;
        console.log('Uid: ',uid)
        const user = await User.findById(uid);
        if( !user ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        console.log('User: ', user)
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error)
    }

}

module.exports = {
    validateJWT
}