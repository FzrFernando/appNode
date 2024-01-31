const Marca = require('../models/marca');
const { validationResult } = require('express-validator');

const getMarcas = async (req, res) => {
    try {
        const marcas = await Marca.find();
        res.status(200).json(marcas);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const getMarca = async (req, res) => {
    const idMarca = req.params.id
    const marca = await Marca.findById({_id:idMarca})
    if (!marca) {
        return res.status(404).json({msg:`No existe la marca con el id ${idMarca}`})
    } else {
        res.status(200).json(marca);
    }
    
}

const addMarca = async(req, res = response) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }
    const {nombre,anno_fundacion,fundador} = req.body;
    const marca = new Marca({nombre,anno_fundacion,fundador})
    const newMarca = await Marca.findOne({nombre})
    if(newMarca){
        return res.status(400).json({msg:"Ya existe una marca con ese nombre"})
    }
    await marca.save();
    res.json({marca})
}

const updateMarca = async(req, res = response) => {
    const idMarca = req.params.id
    const marca = await Marca.find({_id:idMarca})

    const newMarca = req.body;

    if (!marca.length) {
        return res.status(404).json({msg:`No existe la marca con el id ${idMarca}`})
    }
    await Marca.updateOne({_id:idMarca},newMarca);
    res.json({newMarca})
}

const deleteMarca = async(req, res = response) => {
    const idMarca = req.params.id
    const marca = await Marca.find({_id:idMarca})
    if (!marca.length) {
        return res.status(404).json({msg:`No existe la marca con el id ${idMarca}`})
    }
    await Marca.deleteOne({_id:idMarca})
    res.json({marca})
}

module.exports = { getMarcas, getMarca, addMarca, updateMarca, deleteMarca}