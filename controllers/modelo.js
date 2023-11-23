const Modelo = require('../models/modelo');
const { validationResult } = require('express-validator');

const getModelos = async (req, res) => {
    try {
        const modelos = await Modelo.find();
        res.status(200).json(modelos);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const getModelo = async (req, res) => {
    const idModelo = req.params.id
    const modelo = await Modelo.find({_id:idModelo})
    if (!modelo.length) {
        return res.status(404).json({msg:`No existe el modelo con el id ${idModelo}`})
    }
    res.status(200).json({modelo});
}

const addModelo = async(req, res = response) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }
    const {nombre,caballos,anno_modelo,idMarca} = req.body;
    const modelo = new Modelo({nombre,caballos,anno_modelo,idMarca})
    const newModelo = await Modelo.findOne({nombre})
    if(newModelo){
        return res.status(400).json({msg:"Ya existe un modelo con ese nombre"})
    }
    await modelo.save();
    res.json({modelo})
}

const updateModelo = async(req, res = response) => {
    const idModelo = req.params.id
    const modelo = await Modelo.find({_id:idModelo})

    const newModelo = req.body;

    if (!modelo.length) {
        return res.status(404).json({msg:`No existe el modelo con el id ${idModelo}`})
    }
    await Modelo.updateOne({_id:id},newModelo);
    res.json({newModelo})
}

const deleteModelo = async(req, res = response) => {
    const idModelo = req.params.id
    const modelo = await Modelo.find({_id:idModelo})
    if (!modelo.length) {
        return res.status(404).json({msg:`No existe el modelo con el id ${idModelo}`})
    }
    await Modelo.deleteOne({_id:idModelo})
    res.json({modelo})
}

module.exports = { getModelos, getModelo, addModelo, updateModelo, deleteModelo}