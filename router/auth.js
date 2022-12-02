const express = require('express');
const authController = require('../controllers/auth');

const api = express.Router();

// RUTAS
api.post('/auth/register', authController.register);

module.exports = api;