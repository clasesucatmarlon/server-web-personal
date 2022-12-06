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

/**
 * "If the email and password are not empty, then find the user in the database, if the user exists,
 * then compare the password with the one in the database, if the password is correct, then create a
 * token and send it to the user."
 * </code>
 * 
 * @param req The request object.
 * @param res the response object
 */
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

/**
 * It takes the token from the request body, decodes it, and then finds the user in the database. If
 * the user is found, it creates a new access token and sends it back to the client.
 * </code>
 * 
 * @param req request
 * @param res The response object.
 */
function refreshAccessToken (req, res) {
    const { token } = req.body;

    if (!token) res.status(400).send({Status: 'ERROR', Message: 'Token requerido'});

    const { user_id } = jwt.decoded(token);

    User.findOne({ _id: user_id}, (error, userStorage) => {
        if (error) {
            res.status(500).send({Status: 'ERROR', Message: 'Error del servidor - 11'});
        } else {
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage)
            });
        }
    });
}

module.exports = {
    register,
    login,
    refreshAccessToken
};
