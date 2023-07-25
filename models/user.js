const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name : {
        type: String,
        required: [true,'Nombre obligatorio']
    },
    email : {
        type: String,
        required: [true,'Correo obligatorio'],
        unique:true,
    },
    password : {
        type: String,
        required: [true,'Contraseña obligatoria']
    },
    img : {
        type: String,
    },
    role : {
        type: String,
        required: true,
        emun : ['ADMIN_ROLE','USER_ROLE'],
        default:'USER_ROLE'
    },
    state : {
        type : Boolean,
        default : true,
    },
    google : {
        type: Boolean,
        default : false,
    }
})

UserSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', UserSchema);