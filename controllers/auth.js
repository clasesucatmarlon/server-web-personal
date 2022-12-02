const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

function register (req, res) {
    console.log('*'.repeat(60));

    const { firstname, lastname, email, password } = req.body;

    if (!email) res.status(400).send({Status: 'ERROR', Message: 'El email es obligatorio'});
    if (!password) res.status(400).send({Status: 'ERROR', Message: 'El password es obligatorio'});

    // ENCRIPTAR CONTRASEÑA
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: 'user',
        active: false,
        password: hashPassword
    });

    // REGISTRAR USUARIO EN LA BASE DE DATOS
    user.save((error, userStorage) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'Error al crear el usuario'});
            console.log({Status: 'ERROR', Message: 'Error al crear el usuario'})
        } else {
            res.status(200).send({Status: 'OK', Message: 'Usuario creado correctamente', Body: userStorage});
            console.log({Status: 'OK', Message: 'Usuario creado correctamente', Body: userStorage});
        }
    });
};

module.exports = {
    register
};