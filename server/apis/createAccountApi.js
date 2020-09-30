const express = require('express');
const User = require('../database/db');

const router = express();

router.post('/', (req, res, next) => {
  console.log('create an account');
  console.log(req.body);
  const { username, password } = req.body;
  // res.redirect('');
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((result) => {
      console.log(`Successfully entered user ${username} into the database.`);
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
      return next(err);
    });
});

module.exports = router;
