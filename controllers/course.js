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


/**
 * The function getAllCourses is an asynchronous function that receives a request and a response, and
 * then it returns a paginated list of courses.
 * 
 * @param req The request object.
 * @param res The response object.
 */
async function getAllCourses (req, res) {
    // Enviar: /courses?page=1&limit=2
    const { page = 1, limit = 10 } = req.query;
    
    // Opciones de paginación
    const optionsPaginate = {
        page: parseInt(page),
        limit: parseInt(limit)
    };

    Course.paginate({}, optionsPaginate, (error, courses) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'En este momento no hay cursos'});
        } else {
            res.status(200).send({Status: 'OK', Message: 'Curso(s) encontrado(s)', body: courses});
        };
    })
}


module.exports = {
    createCourse,
    getAllCourses
}
