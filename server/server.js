const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  // res.sendStatus(200);
  // res.send('hey!');
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/hi', (req, res) => {
  res.json('ok');
});

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = socket(server);
io.on('connection', (currSocket) => {
  currSocket.on('message', (data) => {
    io.sockets.emit('message', data);
  });

  currSocket.on('typing', (data) => {
    console.log('someone typing');
    currSocket.broadcast.emit('typing', data);
  });
});
