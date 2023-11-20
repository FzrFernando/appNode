const express = require("express");
const router = express.Router();
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require('express-validator');
const { getUsers, addUser } = require ('../controllers/users')

router.get('/',getUsers)
router.post('/',[
    check('nombre','Name is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
    check('email','Debe ser una dirección de email válida').not().isEmail(),
    check('password','Password is required').not().isEmpty(),
    check('rol','Rol is required').not().isEmpty(),
    check('rol','El rol solo admite los valores ADMIN o USER').isIn(['ADMIN','USER']),
    validateFields
],addUser)

module.exports = router;