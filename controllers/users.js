const User = require('../models/users');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync();
const jwt = require('jsonwebtoken');

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

const addUser = async(req,res)=>{
    const user = req.body;//Hay que restringir los parametros 
    const newUser = new User(user);

    //Encriptado password
    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync( newUser.password, salt);
    newUser.password= encryptedPassword
    //el login por post y el rol
    newUser.active= true;
    newUser.rol= "USER_ROLE"
    try {
        await newUser.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({message:error})
    }
}

const updateUser = async(req,res)=>{
    const idUser= req.params.id
    const newUser = req.body
    try {
      const oldUse = await User.findById(idUser);
      if(!oldUse){
        res.status(404).json("No existe el usuario");
      }else{
        const email = newUser.email
        const existsEmail = await User.findOne({email})
        if(existsEmail&& existsEmail._id!=idUser){
            res.status(404).json("Ese email lo tiene otro usuario");
        }else{
            await oldUse.updateOne(newUser)
            res.status(200).json(await User.findById(idUser))
        }
      }
    } catch (error) {
      res.status(500).json({message:error})
    }
}

const deleteUser = async(req,res)=>{
    const idUser = req.params.id
    try {
        const oldUser = await User.findById(idUser)
        
        if(!oldUser){
            res.status(404).json(`No existe un usuario con id: ${idUser}`);
        }else{

            const userLog = req.userLogin
            if(userLog.rol !='ADMIN_ROLE'){
               return res.status(401).json(`El usuario no es administrador para realizar la acción`)
        
            }
            console.log(oldUser);
            oldUser.active= false;
            console.log(oldUser);
            await User.findByIdAndUpdate(idUser,oldUser)
           res.status(200).json(oldUser)
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}



module.exports = { addUser, updateUser, deleteUser}