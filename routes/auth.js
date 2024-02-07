const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields');

const {login} = require('../controllers/auth')

router.post('/login',[
    check('email','Email is invalid').isEmail(),
    check('password','Password is mandatory').not().isEmpty(),
    validateFields
] ,login)

module.exports = router