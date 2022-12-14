const Post = require('../models/postModel');
const { getImagePath } = require('../utils/image');


/**
 * It creates a new post and saves it to the database.
 * 
 * @param req request
 * @param res the response object
 */
function createPost (req, res) {
    const post = new Post(req.body);
    post.created_at = new Date();

    if (req.files.miniature) {
        const imagePath = getImagePath(req.files.miniature);
        post.miniature = imagePath;
    };
    
    // REGISTRAR POST EN LA BASE DE DATOS
    post.save((error, postStorage) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'Error al crear el post'});
            // console.log({Status: 'ERROR', Message: 'Error al crear el post'})
        } else {
            res.status(200).send({Status: 'OK', Message: 'Post creado correctamente', Body: postStorage});
            // console.log({Status: 'OK', Message: 'Post creado correctamente', Body: postStorage});
        }
    });
}


module.exports = {
    createPost
}
