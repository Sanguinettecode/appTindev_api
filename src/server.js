const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose')
const cors = require('cors')

const server = express();
mongoose.connect('mongodb://andretrindade:Galileu123@ds261077.mlab.com:61077/omnistack', {
  useNewUrlParser: true
})
server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);