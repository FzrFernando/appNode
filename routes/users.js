const express = require("express");
const router = express.Router();
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require('express-validator');
const { getUsers, addUser, updateUser, deleteUser, getUser } = require ('../controllers/users');
const { existsEmail, rolUser } = require("../helpers/db-validators");

router.get('/',getUsers)

router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validateFields
],getUser)

router.post('/',[
    check('nombre','Name is required').not().isEmpty(),
    check('email','Email is required').not().isEmpty(),
    check('email','Debe ser una dirección de email válida').not().isEmail(),
    check('password','Password is required').not().isEmpty(),
    check('rol','Rol is required').not().isEmpty(),
    check('rol').custom(rolUser),
    check('email').custom(existsEmail),
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