const express = require('express');
const userController = require('../controllers/user');
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/avatar' });

const api = express.Router();

// RUTAS
api.get('/user/getme', [md_auth.asureAuth], userController.getMe);
api.get('/users', [md_auth.asureAuth], userController.getAllUsers);
api.post('/user', [md_auth.asureAuth, md_upload], userController.createUser);

module.exports = api;