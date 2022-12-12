const express = require('express');
const menuController = require('../controllers/menu');
const md_auth = require('../middlewares/authenticated');


const api = express.Router();

// ENDPOINTS
// ...

module.exports = api;