const express = require('express');
const menuController = require('../controllers/menu');
const md_auth = require('../middlewares/authenticated');


const api = express.Router();

// RUTAS
api.post('/menu', [md_auth.asureAuth], menuController.createMenu);

module.exports = api;