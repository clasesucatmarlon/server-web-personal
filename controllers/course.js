const Course = require('../models/courseModel');
const { getImagePath } = require('../utils/image');


/**
 * It creates a new course in the database.
 * 
 * @param req the request object
 * @param res the response object
 */
async function createCourse (req, res) {
    const course = new Course(req.body);

    if (req.files.miniature) {
        const imagePath = getImagePath(req.files.miniature);
        course.miniature = imagePath;
    };
    
    // REGISTRAR CURSO EN LA BASE DE DATOS
    course.save((error, courseStorage) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'Error al crear el curso'});
            // console.log({Status: 'ERROR', Message: 'Error al crear el curso'})
        } else {
            res.status(200).send({Status: 'OK', Message: 'Curso creado correctamente', Body: courseStorage});
            // console.log({Status: 'OK', Message: 'Curso creado correctamente', Body: userStorage});
        }
    });
}

module.exports = {
    createCourse
}
