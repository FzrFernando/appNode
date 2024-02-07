const express = require("express");
const router = express.Router();
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require('express-validator');
const { getUsers, addUser, updateUser, deleteUser } = require ('../controllers/users');
const { existsEmail, existsNick } = require("../helpers/db-validators");

const regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

router.get('/',getUsers)

// router.get('/:id',[
//     check('id','No es un id correcto').isMongoId(),
//     validateFields
// ],getUser)

router.post('/',[
    check('nombre','Name is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
    check('email','Debe ser una dirección de email válida').isEmail(),
    check('password','Password is required').not().isEmpty(),
    check('password').matches(regexp_password),
    check('rol','Rol is required').not().isEmpty(),
    check('rol','El rol solo admite los valores ADMIN o USER').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('email').custom(existsEmail),
    check('login').custom(existsNick),
    check('login','Login is required').not().isEmpty(),
    check('active','Active is required').not().isEmpty(),
    validateFields
],addUser)

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