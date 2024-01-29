const User = require('../models/users');
const { validationResult } = require('express-validator');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

const getUser = async (req, res) => {
    const idUser = req.params.id
    const user = await User.find({_id:idUser})
    if (!user) {
        return res.status(404).json({msg:`No existe el usuario con el id ${idUser}`})
    }
    res.status(200).json(user);
}

const addUser = async(req, res = response) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }
    const {nombre,email,password,rol,nick} = req.body;
    const user = new User({nombre,email,password,rol,nick})
    const newUser = await User.findOne({nick})
    if(newUser){
        return res.status(400).json({msg:"Ya existe un usuario con ese nick"})
    }
    await user.save();
    res.json({user})
}

const updateUser = async(req, res = response) => {
    const idUser = req.params.id
    const user = await User.find({_id:idUser})

    const newUser = req.body;

    if (!user.length) {
        return res.status(404).json({msg:`No existe el usuario con el id ${idUser}`})
    }
    await User.updateOne({_id:idUser},newUser);
    res.json({newUser})
}

const deleteUser = async(req, res = response) => {
    const idUser = req.params.id
    const user = await User.find({_id:idUser})
    if (!user.length) {
        return res.status(404).json({msg:`No existe el usuario con el id ${idUser}`})
    }
    await User.deleteOne({_id:idUser})
    res.json({user})
}

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser}