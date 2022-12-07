const User = require('../models/userModel');

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

module.exports = {
    getMe
}