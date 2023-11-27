const express = require("express");
const router = express.Router();
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require('express-validator');
const { getMarcas, getMarca, addMarca, updateMarca, deleteMarca } = require("../controllers/marca");

router.get('/',getMarcas)

router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validateFields
],getMarca)

router.post('/',[
    check('nombre','Name is required').not().isEmpty(),
    check('anno_fundacion','Anno_fundacion is required').not().isEmpty(),
    check('fundador','Fundador is required').not().isEmpty(),
    validateFields
],addMarca)

router.put('/:id',[
    check('id','No es un id correcto').isMongoId(),
    check('nombre','Name is required').not().isEmpty(),
    check('anno_fundacion','El año de fundacion es requerido').not().isEmpty(),
    check('fundador','El fundador es requerido').not().isEmpty(),
    validateFields
],updateMarca)

router.delete('/:id', [
    check('id','No es un id correcto').isMongoId(),
    validateFields
],deleteMarca)

module.exports = router;