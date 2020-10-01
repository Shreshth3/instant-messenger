const express = require('express');

const app = express();
const PORT = 3000;

const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const createAccountApi = require('./apis/createAccountApi');
const signInApi = require('./apis/signInApi');

// Establish connection to MongoDB
const mongoURI =
  'mongodb+srv://shreshth:RvCZr1aRHAqeLFVA@users.4rhk4.mongodb.net/InstantMessenger?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Process incoming response. 1) Parse out from JSON and 2) Pull out any cookies into req.cookies
app.use(express.json());
app.use(cookieParser());

// Handle authentication endpoints with apis
app.use('/create-account', createAccountApi);
app.use('/sign-in', signInApi);

// Send index.html file when user loads the page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(`Global error handler received this error: ${err}`);
  res.status(500).send('Internal server error.');
});

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// Establish web socket
const io = socket(server);
io.on('connection', (currSocket) => {
  // If we receive the "message" event...
  currSocket.on('message', (data) => {
    // Send a "message" event with the received data to all clients connected via WebSocket
    io.sockets.emit('message', data);
  });

  // If we receive the "typing" event...
  currSocket.on('typing', (data) => {
    // Send a "typing" event with the received data to all clients EXCEPT the client who sent this event
    currSocket.broadcast.emit('typing', data);
  });
});

module.exports = app;
