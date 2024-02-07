const express = require("express");
const router = express.Router();
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require('express-validator');
const { getUsers, addUser, updateUser, deleteUser } = require ('../controllers/users');
// const { existsEmail ,isValidRol } = require("../helpers/db-validators");

// const regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

router.get('/',getUsers)

// router.get('/:id',[
//     check('id','No es un id correcto').isMongoId(),
//     validateFields
// ],getUser)

router.post('/',[
    check('login','username is required').not().isEmpty(),
    check('email', 'El correo es requerido').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('password','password is required').not().isEmpty(),
    check('password', 'be tener al menos 8 caracteres, una letra minúscula, una letra mayúscula, un número y un caracter especial').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    validateFields
  ],addUser);

router.put('/:id',[
    check('id','No es un id correcto').isMongoId(),
    check('nombre','Name is required').not().isEmpty(),
    validateFields
],updateUser)

router.delete('/:id', [
    check('id','No es un id correcto').isMongoId(),
    validateFields
],deleteUser)

module.exports = router;