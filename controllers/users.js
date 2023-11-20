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

const addUser = async(req, res = response) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }
    const {nombre,email,password,rol} = req.body;
    const user = new User({nombre,email,password,rol})
    const newUser = await User.findOne({nombre})
    if(newUser){
        return res.status(400).json({msg:"Ya existe un usuario con ese nombre"})
    }
    await user.save();
    res.json({user})
}

module.exports = { getUsers, addUser}