const express = require('express');
const path = require('path');

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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
