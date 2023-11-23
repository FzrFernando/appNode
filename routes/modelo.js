const express = require("express");
const router = express.Router();
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require('express-validator');
const { getModelos, getModelo, addModelo, updateModelo, deleteModelo } = require("../controllers/modelo");

router.get('/',getModelos)

router.get('/:id',[
    check('id','No es un id correcto').not().isMongoId(),
    validateFields
],getModelo)

router.post('/',[
    check('nombre','Name is required').not().isEmpty(),
    check('caballos','Caballos is required').not().isEmpty(),
    check('anno_modelo','Anno_modelo is required').not().isEmpty(),
    check('idMarca','IdMarca is required').not().isEmpty(),
    validateFields
],addModelo)

router.put('/:id',[
    check('id','No es un id correcto').isMongoId(),
    check('nombre','Name is required').not().isEmpty(),
    check('caballos','Caballos is required').not().isEmpty(),
    check('anno_modelo','Anno_modelo is required').not().isEmpty(),
    check('idMarca','IdMarca is required').not().isEmpty(),
    validateFields
],updateModelo)

router.delete('/:id', [
    check('id','No es un id correcto').isMongoId(),
    validateFields
],deleteModelo)

module.exports = router;