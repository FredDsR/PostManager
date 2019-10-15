const express = require('express');
const PostsController = require('./controllers/PostsController');

const routes = new express.Router();

routes.get('/posts', PostsController.index);
routes.get('/posts/:id', PostsController.view);
routes.post('/posts', PostsController.store);
routes.delete('/posts/:id', PostsController.delete);
routes.put('/posts/:id', PostsController.edit);

module.exports = routes;