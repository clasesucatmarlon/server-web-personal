const jwt = require('../utils/jwt');

function asureAuth (req, res, next) {
    // console.log('auth... ', req.headers.authorization);
    
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
        res.status(400).send({Status: 'ERROR', Message: 'Token inválido'});
    }
    
    next();
}

module.exports = {
    asureAuth
}