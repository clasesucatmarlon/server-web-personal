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


/**
 * Get all the emails from the database and send them to the client
 * 
 * @param req The request object.
 * @param res the response object
 */
function getAllEmail (req, res) {
    // Enviar: /newsletter?page=2&limit=1
    const { page = 1, limit = 10 } = req.query;
        
    // Opciones de paginación
    const optionsPaginate = {
        page: parseInt(page),
        limit: parseInt(limit),
    };

    Newsletter.paginate({}, optionsPaginate, (error, newsletterStorage) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'En este momento no hay suscriptores'});
        } else {
            res.status(200).send({Status: 'OK', Message: 'Suscriptor(es) encontrado(s)', body: newsletterStorage});
        };
    });
}


module.exports = {
    suscribeEmail,
    getAllEmail
}
