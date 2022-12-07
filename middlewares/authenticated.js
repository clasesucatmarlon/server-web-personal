const jwt = require('../utils/jwt');

/**
 * If the request doesn't have an authorization header, return a 403 error. Otherwise, get the token
 * from the header, decode it, check if it's expired, and if it's not, add the payload to the request
 * object and call the next middleware.
 * 
 * @param req The request object.
 * @param res The response object.
 * @param next The next middleware function in the stack.
 * @return The token is being returned.
 */
function asureAuth (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({Status: 'ERROR', Message: 'La petición NO tiene cabecera de autenticación - token'});
    }

    const token = req.headers.authorization.replace('Bearer ', '');
    
    try {
        const payload = jwt.decoded(token);
        const { exp } = payload;  // Expiración
        const currentData = new Date().getTime(); // Actual

        if (exp <= currentData) {
            return res.status(400).send({Status: 'ERROR', Message: 'El token ha expirado'});
        } else {
            req.user = payload;
            next();
        }
    } catch (error) {
        return res.status(400).send({Status: 'ERROR', Message: 'Token inválido'});
    };
}

module.exports = {
    asureAuth
}