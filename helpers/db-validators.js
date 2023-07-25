const Role = require('../models/role');
const User = require('../models/user');


const roleIsValid = async(role = '') => {
    const roleExist = await Role.findOne({role});
    if( !roleExist ){
        throw new Error(`El rol ${role} no está registrado en la DB`)
    }
}

const mailIsValid = async(email = '') => {

    const mailExist = await User.findOne({ email });

    
    if( mailExist ){

        throw new Error(`Ya existe una dirección con el siguiente correo: ${email}`)
    }

}

const existUserID = async( id ) => {
    const existID = await User.findById( id )

    if( !existID ){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    roleIsValid,
    mailIsValid,
    existUserID
}