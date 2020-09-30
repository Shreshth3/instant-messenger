const express = require('express');
const User = require('../database/db');

const router = express();

router.post(
  '/',
  (req, res, next) => {
    const { username, password } = req.body;
    User.create({
      username,
      password,
    })
      .then((result) => {
        console.log(
          `Successfully entered user \"${result.username}\" into the database.`
        );
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
        return next(err);
      });
  },
  (req, res) => {
    res.sendStatus(200);
  }
);

module.exports = router;
