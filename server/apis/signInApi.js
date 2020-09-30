const express = require('express');
const User = require('../database/db');

const router = express();

router.post(
  '/',
  (req, res, next) => {
    console.log(req.body);
    const { username, password } = req.body;
    User.findOne({ username })
      .then((result) => {
        if (result && password === result.password) {
          res.locals.loggedIn = true;
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
