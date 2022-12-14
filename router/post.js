const express = require('express');
const postController = require('../controllers/post');
const md_auth = require('../middlewares/authenticated');
const multipart = require('connect-multiparty');

const md_upload = multipart({ uploadDir: './uploads/posts' });

const api = express.Router();

// RUTAS
api.post('/post', [md_auth.asureAuth, md_upload], postController.createPost);
api.get('/post', postController.getAllPost);
api.patch('/post/:id', [md_auth.asureAuth, md_upload], postController.updatePost);
api.delete('/post/:id', [md_auth.asureAuth], postController.deletePost);

module.exports = api;