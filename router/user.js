const express = require('express');
const userController = require('../controllers/user');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

// RUTAS
api.get('/user/getme', [md_auth.asureAuth], userController.getMe);
api.get('/users', [md_auth.asureAuth], userController.getAllUsers);

module.exports = api;