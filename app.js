const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { API_VERSION } = require('./constants');

const app = express();

// IMPORT ROUTING
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const menuRoutes = require('./router/menu');
const courseRoutes = require('./router/course');
const postRoutes = require('./router/post');

// CONFIGURE BODY PARSE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CONFIGURE STATIC FOLDER
app.use(express.static('uploads'));

// CONFIGURE HEADER HTTP - CORS
app.use(cors());

// CONFIGURE ROUTING
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);

module.exports = app;