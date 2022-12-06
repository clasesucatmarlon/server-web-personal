const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../constants');


/**
 * It creates a token with a payload that contains the user's id, the token type, the time it was
 * created, and the time it expires
 * 
 * @param user The user object that is returned from the database.
 * @return A token
 */
function createAccessToken (user) {
    const expToken = new Date();
    expToken.setHours(expToken.getHours + 3); // Se agregan 3 hrs
    // Datos que van dentro del token
    const payload = {
        token_type: 'access',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    };
    return jwt.sign(payload, JWT_SECRET_KEY);
};


/**
 * It creates a refresh token for the user, which expires in one month.
 * 
 * @param user The user object that is passed to the function.
 * @return A token that is signed with the secret key.
 */
function createRefreshToken (user) {
    const expToken = new Date();
    expToken.getMonth(expToken.getMonth() + 1);  // Se agrega un mes
    // Datos que van dentro del token
    const payload = {
        token_type: 'refresh',
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    };
    return jwt.sign(payload, JWT_SECRET_KEY);
};


/**
 * It decodes the token.
 * 
 * @param token The token to decode.
 * @return The decoded token.
 */
function decoded (token) {
    return jwt.decode(token, JWT_SECRET_KEY, true);
};

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded
};