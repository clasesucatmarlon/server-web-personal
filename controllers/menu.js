const Menu = require('../models/menuModel');

/**
 * It creates a new menu, saves it, and then sends a response to the client.
 * 
 * @param req The request object.
 * @param res the response object
 */
async function createMenu (req, res) {
    const menu = new Menu(req.body);
    menu.save( (error, menuStored) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'Error al crear el menú'});
            // console.log({Status: 'ERROR', Message: 'Error al crear el menú'})
        } else {
            res.status(200).send({Status: 'OK', Message: 'Menú creado correctamente', Body: menuStored});
            // console.log({Status: 'OK', Message: 'Menú creado correctamente', menuStored});
        }
    });
}


/**
 * It returns all the menu items from the database, or only the active ones if the query parameter
 * active is set to true, or only the inactive ones if the query parameter active is set to false.
 * 
 * @param req The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res The response object.
 */
async function getAllMenu (req, res) {
    // se debe enviar:  {{url}}/menu?active=true
    const { active } = req.query;
    // Valores de active:
    //  true --> activos
    //  false --> No activos
    //  undefined --> Todos

    let response = null;

    if (active === undefined) {
        response = await Menu.find().sort({ order: 'asc'});
    } else {
        response = await Menu.find({ active }).sort({ order: 'asc'});
    }

    if (!response) {
        res.status(400).send({Status: 'ERROR', Message: 'En este momento no hay menús'});
    } else {
        res.status(200).send({Status: 'OK', Message: 'Menú(s) encontrado(s)', body: response});
    };
}


module.exports = {
    createMenu,
    getAllMenu
}