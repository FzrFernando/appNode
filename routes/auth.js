const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields');

const {login} = require('../controllers/users')

router.get('/login',[
    check('email','El email es requerido').not().isEmpty(),
    check('password','El password es requerido').not().isEmpty(),
    validateFields
],login)

module.exports = router