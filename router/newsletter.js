const express = require('express');
const NewsletterController = require('../controllers/newsletter');
const md_auth = require('../middlewares/authenticated');

const api = express.Router();

// RUTAS
api.post('/newsletter', NewsletterController.suscribeEmail);

module.exports = api;