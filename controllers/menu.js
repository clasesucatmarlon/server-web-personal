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

module.exports = {
    createMenu,
}