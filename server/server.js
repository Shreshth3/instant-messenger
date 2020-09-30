const express = require('express');

const app = express();
const PORT = 3000;

const path = require('path');
const socket = require('socket.io');

const mongoose = require('mongoose');
const createAccountApi = require('./apis/createAccountApi');
const signInApi = require('./apis/signInApi');

// RvCZr1aRHAqeLFVA
// mongodb+srv://shreshth:<password>@users.4rhk4.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongodb+srv://shreshth:RvCZr1aRHAqeLFVA@users.4rhk4.mongodb.net/InstantMessenger?retryWrites=true&w=majority
const mongoURI =
  'mongodb+srv://shreshth:RvCZr1aRHAqeLFVA@users.4rhk4.mongodb.net/InstantMessenger?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use('/create-account', createAccountApi);

app.use('/sign-in', signInApi);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/hi', (req, res) => {
  res.json('ok');
});

app.use((err, req, res, next) => {
  console.log(`Global error handler received this error: ${err}`);
  res.status(500).send('Internal server error.');
});

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = socket(server);
io.on('connection', (currSocket) => {
  currSocket.on('message', (data) => {
    io.sockets.emit('message', data);
  });

  currSocket.on('typing', (data) => {
    currSocket.broadcast.emit('typing', data);
  });
});

module.exports = app;
