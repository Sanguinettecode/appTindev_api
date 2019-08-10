const express = require('express')
const routes = express.Router();
const DevController = require('./controllers/DevController');
const LikesController = require('./controllers/LikesController');
const DislikesController = require('./controllers/DislikesController');

routes.post('/dev', DevController.store);
routes.get('/dev', DevController.index);
routes.post('/dev/:idDev/like', LikesController.store)
routes.post('/dev/:idDev/dislike', DislikesController.store)

module.exports = routes;