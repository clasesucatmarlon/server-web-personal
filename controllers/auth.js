const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

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
}

function login (req, res) {
    const { email, password } = req.body;
    if (!email) res.status(400).send({Status: 'ERROR', Message: 'El email es obligatorio'});
    if (!password) res.status(400).send({Status: 'ERROR', Message: 'El password es obligatorio'});
    
    const emailLowerCase = email.toLowerCase();
    
    User.findOne( {email: email.toLowerCase() }, (error, userStore) => {
        if (error) {
            res.status(500).send({Status: 'ERROR', Message: 'Error del servidor - 1'});
        } else {
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if (bcryptError) {
                    res.status(500).send({Status: 'ERROR', Message: 'Error del servidor '});
                } else if (!check) {
                    res.status(400).send({Status: 'ERROR', Message: 'Error del servidor - password no válido'});
                } else if (!userStore.active) {
                    res.status(401).send({Status: 'ERROR', Message: 'Usuario no autorizado o no está activo'});
                } else {
                    res.status(200).send({
                        Status: 'OK', 
                        Message: 'Usuario autorizado',
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    });
                };
            });
        }
    });
}

module.exports = {
    register,
    login
};

// email: {
//     type: String,
//     unique: true
// },

