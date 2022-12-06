const express = require('express');
const userController = require('../controllers/user');

const api = express.Router();

// RUTAS
api.get('/user/getme', userController.ghetMe);

module.exports = api;