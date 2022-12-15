const Newsletter = require('../models/newsletterModel');


/**
 * It takes an email from the body of a request, creates a new newsletter object, saves it to the
 * database, and then sends a response to the client.
 * 
 * @param req The request object.
 * @param res The response object.
 */
function suscribeEmail (req, res) {
    const { email } = req.body;

    if (!email) return res.status(400).send({Status: 'ERROR', Message: 'El email es obligatorio'});

    const newsletter = new Newsletter({ email: email.toLowerCase() });

    newsletter.save( (error) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'Error al registrar email'});
            // console.log({Status: 'ERROR', Message: 'Error al registrar email'})
        } else {
            res.status(200).send({Status: 'OK', Message: 'Email registrado correctamente'});
            // console.log({Status: 'OK', Message: 'Email registrado correctamente'});
        }
    });
}


module.exports = {
    suscribeEmail
}
