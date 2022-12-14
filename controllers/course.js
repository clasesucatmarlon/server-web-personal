const Course = require('../models/courseModel');
const { getImagePath } = require('../utils/image');


/**
 * It creates a new course in the database.
 * 
 * @param req the request object
 * @param res the response object
 */
function createCourse (req, res) {
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
function getAllCourses (req, res) {
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


/**
 * It updates a course in the database.
 * 
 * @param req the request object
 * @param res the response object
 */
function updateCourse (req, res) {
    const { id } = req.params;
    const courseData = req.body;

    // Update image
    if (req.files.miniature) {
        const imagePath = getImagePath(req.files.miniature);
        courseData.miniature = imagePath;
    };

    Course.findByIdAndUpdate({ _id: id }, courseData, (error) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'Error al actualizar el curso'});
            // console.log({Status: 'ERROR', Message: 'Error al actualizar el curso'})
        } else {
            res.status(200).send({Status: 'OK', Message: 'Curso actualizado correctamente', Body: courseData });
            // console.log({Status: 'OK', Message: 'Curso actualizado correctamente', Body: userData});
        };
    });
}


/**
 * It deletes a course from the database.
 * 
 * @param req request
 * @param res The response object.
 */
function deleteCourse (req, res) {
    const { id } = req.params;

    Course.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            res.status(400).send({Status: 'ERROR', Message: 'Error al eliminar el curso'});
            // console.log({Status: 'ERROR', Message: 'Error al eliminar el curso'})
        } else {
            res.status(200).send({Status: 'OK', Message: 'Curso eliminado correctamente' });
            // console.log({Status: 'OK', Message: 'Curso eliminado correctamente'});
        };
    });
}


module.exports = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
}
