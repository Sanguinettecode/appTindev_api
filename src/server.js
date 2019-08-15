const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const usersConected = {}

io.on('connection', socket => {
  const { user } = socket.handshake.query
    usersConected[user] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.usersConected = usersConected;
  return next();
})
mongoose.connect('mongodb://andretrindade:Galileu123@ds261077.mlab.com:61077/omnistack', {
  useNewUrlParser: true
})
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);