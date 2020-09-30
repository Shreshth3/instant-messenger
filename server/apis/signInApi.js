const express = require('express');
const User = require('../database/db');

const router = express();

router.post(
  '/',
  (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username })
      .then((result) => {
        if (result && password === result.password) {
          res.locals.loggedIn = true;
          res.cookie('username', username);
        } else {
          res.locals.loggedIn = false;
        }
        return next();
      })
      .catch((err) => next(err));
  },
  (req, res) => {
    res.status(200).json({ loggedIn: res.locals.loggedIn });
  }
);

module.exports = router;
