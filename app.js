const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { API_VERSION } = require('./constants');

const app = express();

// IMPORT ROUTING
const authRoutes = require('./router/auth');

// CONFIGURE BODY PARSE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CONFIGURE STATIC FOLDER
app.use(express.static('uploads'));

// CONFIGURE HEADER HTTP - CORS
app.use(cors());

// CONFIGURE ROUTING
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;