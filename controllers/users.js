const User = require('../models/users');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync();
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

// const getUser = async (req, res) => {
//     const idUser = req.params.id
//     const user = await User.find({_id:idUser})
//     if (!user) {
//         return res.status(404).json({msg:`No existe el usuario con el id ${idUser}`})
//     }
//     res.status(200).json(user);
// }

const addUser = async(req, res = response) => {
    // const errors = validationResult(req);
    // if ( !errors.isEmpty() ) {
    //     return res.status(400).json(errors);
    // }
    const {nombre,login,email,password} = req.body;
    const rol = 'USER';
    const active = true;
    const user = new User({nombre,login,email,password,rol,active})
   
   try {
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);
    await user.save();
    res.json({user})
   } catch (error) {
    if (error.keyValue.email){
        res.status(500).json({msg:'El email ya está registrado'})
   } else if (error.keyValue.login){
        res.status(500).json({msg:"El login ya se encuentra en uso"})
   }
}
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

    user.active = false;

    if (!user.length) {
        return res.status(404).json({msg:`No existe el usuario con el id ${idUser}`})
    }
    await User.updateOne({_id:idUser})
    res.json({user})
}



module.exports = { getUsers, addUser, updateUser, deleteUser}