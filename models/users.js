const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = Schema({
    nombre: {type:String, require:true},
    login: {type:String, require:true},
    email: {type:String, require:true,unique:true},
    password: {type:String, require:true},
    rol: {type:String, required: true, emun: ['ADMIN_ROLE', 'USER_ROLE']},
    active: {type:Boolean}
})

UserSchema.methods.toJSON = function(){
    const {__v,password,_id,...user}=this.toObject()
    user.uid = _id
    return user
}

module.exports = mongoose.model("Users", UsersSchema);