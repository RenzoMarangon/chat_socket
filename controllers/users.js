const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUsers = async( req, res = response ) => {

    let { limit = 5, from = 0} = req.query;

    if( isNaN(limit) ){
        limit=5;
    }

    if( isNaN(from) ){
        from = 0;
    }


    const allPromises = await Promise.all([
        User.countDocuments({ state : true }),

        User.find({ state : true })
            .skip( from )
            .limit(limit)
    ])

    
    res.json({
        allPromises
    });
}

const putUsers = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, role, password, google, email, ...user } = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
    }

    const userUpdated = await User.findByIdAndUpdate( id, user ); 

    res.json(userUpdated)
};

const postUsers = async( req, res = response ) => {

    //Creo un nuevo esquema de usuario en mongoose
    const { name, password, email, img = '' } = req.body;
    const user = new User({ name, password, email, img });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Lo guardo en la db online
    //SI o SI tiene que tener los datos obligatorios del esquema (name, pass, email)
    await user.save();

    res.json({
        user
    })
   
};

const deleteUsers = async( req, res = response ) => {

    const { id } = req.params;

    //BORRAR FISICAMENTE
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { state: false });
    
    res.json({
        userDeleted:user,
    })
};

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers

};