const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { getImagePath } = require('../utils/image');


/**
 * It gets the user_id from the request, then it searches for the user in the database and returns the
 * user if it exists or an error if it doesn't.
 * 
 * @param req The request object.
 * @param res The response object.
 */
async function getMe (req, res) {
    const { user_id } = req.user;
    const response = await User.findById(user_id);
    if (!response) {
        res.status(400).send({Status: 'ERROR', Message: `No se ha encontrado el usuario con el id ${user_id}` });
    } else {
        res.status(200).send({Status: 'OK', Message: 'Usuario encontrado', body: response});
    }
}


/**
 * "If the query parameter 'active' is undefined, then return all users, otherwise return only the
 * users that match the value of the 'active' query parameter."
 * </code>
 * 
 * @param req The request object.
 * @param res The response object.
 */
async function getAllUsers (req, res) {
    // se debe enviar:  {{url}}/users?active=true
    const { active } = req.query;
    // Valores de active:
    //  true --> activos
    //  false --> No activos
    //  undefined --> Todos

    let response = null;

    if (active === undefined) {
        response = await User.find();
    } else {
        response = await User.find({ active});
    }
    res.status(200).send({Status: 'OK', Message: 'Usuarios encontrados', body: response});
}


/**
 * If the email and password are not provided, return an error, otherwise, encrypt the password, create
 * a new user, and save it to the database.
 * 
 * @param req The request object.
 * @param res the response object
 * @return The user object with new User and the password encrypted.
 */
async function createUser (req, res) {
    const { firstname, lastname, email, password, role } = req.body;
    
    if (!email) return res.status(400).send({Status: 'ERROR', Message: 'El email es obligatorio'});
    if (!password) return res.status(400).send({Status: 'ERROR', Message: 'El password es obligatorio'});

    // ENCRIPTAR CONTRASEÑA
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role,
        active: false,
        password: hashPassword,
    });

    if (req.files.avatar) {
        const imagePath = getImagePath(req.files.avatar);
        user.avatar = imagePath;
    };
    
    // REGISTRAR USUARIO EN LA BASE DE DATOS
    user.save((error, userStorage) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'Error al crear el usuario'});
            // console.log({Status: 'ERROR', Message: 'Error al crear el usuario'})
        } else {
            res.status(200).send({Status: 'OK', Message: 'Usuario creado correctamente', Body: userStorage});
            // console.log({Status: 'OK', Message: 'Usuario creado correctamente', Body: userStorage});
        }
    });
}


/**
 * It updates the user's data in the database, and if the user has uploaded a new avatar, it replaces
 * the old one with the new one.
 * 
 * @param req The request object.
 * @param res the response object
 * @return The user object updated with new Data and the password encrypted.
 */
async function updateUser (req, res) {
    const { id } = req.params;
    const userData = req.body;
    
    // Update Password
    if (userData.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword;
    } else {
        delete userData.password;
    };

    // Update Avatar
    if (req.files.avatar) {
        const imagePath = getImagePath(req.files.avatar);
        userData.avatar = imagePath;
    };

    User.findByIdAndUpdate({ _id: id }, userData, (error) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'Error al actualizar el usuario'});
            // console.log({Status: 'ERROR', Message: 'Error al actualizar el usuario'})
        } else {
            res.status(200).send({Status: 'OK', Message: 'Usuario actualizado correctamente', Body: userData });
            // console.log({Status: 'OK', Message: 'Usuario actualizado correctamente', Body: userData});
        }
    })
}


/**
 * It deletes a user from the database.
 * 
 * @param req The request object.
 * @param res the response object
 * @return The user object delete into database.
 */
async function deleteUser (req, res) {
    // console.log('borrado');
    const { id } = req.params;

    User.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'Error al eliminar el usuario'});
            // console.log({Status: 'ERROR', Message: 'Error al eliminar el usuario'})
        } else {
            res.status(200).send({Status: 'OK', Message: 'Usuario eliminado correctamente' });
            // console.log({Status: 'OK', Message: 'Usuario eliminado correctamente'});
        }
    })
}


module.exports = {
    getMe,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}
