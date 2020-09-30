const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const socket = require('socket.io');
const createAccountApi = require('./apis/createAccountApi');

app.use(express.json());

app.use('/create-account', createAccountApi);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/hi', (req, res) => {
  res.json('ok');
});

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = socket(server);
io.on('connection', (currSocket) => {
  currSocket.on('message', (data) => {
    console.log('received msg');
    io.sockets.emit('message', data);
  });

  currSocket.on('typing', (data) => {
    console.log('someone typing');
    currSocket.broadcast.emit('typing', data);
  });
});
