const User = require('../models/users');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync();

// const getUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({message: error});
//     }
// }

// const getUser = async (req, res) => {
//     const idUser = req.params.id
//     const user = await User.find({_id:idUser})
//     if (!user) {
//         return res.status(404).json({msg:`No existe el usuario con el id ${idUser}`})
//     }
//     res.status(200).json(user);
// }

const addUser = async(req, res = response) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }
    const {nombre,login,email,password,rol,active} = req.body;
    if (active == null) {
        active = true
    }
    encryptedPassword = bcryptjs.hashSync( password, salt);
    const user = new User({nombre,login,email,encryptedPassword,rol,active})
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

    user.active = false;

    if (!user.length) {
        return res.status(404).json({msg:`No existe el usuario con el id ${idUser}`})
    }
    await User.updateOne({_id:idUser})
    res.json({user})
}

async function login(req, res){
    const{email, password}=req.body
    try{
        const user = await User.findOne({email})
        const validarPassword = bcryptjs.compareSync(password,user.password)
        if(!user||!validarPassword){
            return res.status(400).json({mensage:`No has introducido bien el correo o la contraseña`})
        }else{
            if(!user.state){
                return res.status(400).json({msg:'El usuario fue eliminado'})
            }else{   
            res.status(200).json({mensage:'Has iniciado sesión'})
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({msg:'Ha ocurrido un error'})
    }
}

module.exports = { addUser, updateUser, deleteUser, login}