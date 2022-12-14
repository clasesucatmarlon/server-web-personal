const express = require('express');
const courseController = require('../controllers/course');
const md_auth = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');

const md_upload = multipart({ uploadDir: './uploads/courses' });

const api = express.Router();

// RUTAS
api.post('/course', [md_auth.asureAuth, md_upload], courseController.createCourse);
api.get('/courses', courseController.getAllCourses);
api.patch('/courses/:id', [md_auth.asureAuth, md_upload], courseController.updateCourse);

module.exports = api;