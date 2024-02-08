const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const {login, renew} = require('../controllers/auth')

router.post('/login',[
    check('email','Email is invalid').isEmail(),
    check('password','Password is mandatory').not().isEmpty(),
    validateFields
] ,login)

router.get('/renew',[validateJWT],renew)


module.exports = router