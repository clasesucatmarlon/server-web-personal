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


/**
 * Get all posts from the database, paginate them, and send them to the client.
 * 
 * @param req The request object.
 * @param res The response object.
 */
function getAllPost (req, res) {
    // Enviar: /post?page=1&limit=2
    const { page = 1, limit = 10 } = req.query;
        
    // Opciones de paginación
    const optionsPaginate = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc" }
    };

    Post.paginate({}, optionsPaginate, (error, postStorage) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'En este momento no hay post'});
        } else {
            res.status(200).send({Status: 'OK', Message: 'Post(s) encontrado(s)', body: postStorage});
        };
    })
}


module.exports = {
    createPost,
    getAllPost
}
