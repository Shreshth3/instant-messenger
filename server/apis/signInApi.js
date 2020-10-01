const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../database/db');

const router = express();

// Handle all POST requests coming into /sign-in
router.post(
  '/',
  // This function verifies a user's login credentials
  (req, res, next) => {
    const { username, password } = req.body;

    // Find the first user in our database with the provided username
    User.findOne({ username })
      .then((result) => {
        // If no user was found with this username, the login attempt fails
        if (!result) {
          res.locals.loggedIn = false;
          return next();
        }

        // If a user with the provided username exists, we compare the provided password (post-encryption)
        // with the real password (also post-encryption)
        bcrypt.compare(password, result.password, (err, comparisonResult) => {
          // If we are unable to make this comparison, invoke the global error handler
          if (err) {
            return next(err);
          }

          // If the passwords match, the user has logged in
          if (comparisonResult) {
            res.locals.loggedIn = true; // Store the successful login for future use
            res.cookie('username', username, { httpOnly: true }); // Add a cookie containing the username
            return next();
          }

          // If the passwords did NOT match, the user has NOT logged in
          res.locals.loggedIn = false;
          return next();
        });
      })
      // If an error is thrown by our query, invoke the global error handler
      .catch((err) => {
        console.log('here??', err);
        return next(err);
      });
  },
  // Once we've finished processing the user's sign-in attempt, respond to the client's
  // HTTP request and let them know whether the user has signed in
  (req, res) => {
    res.status(200).json({ loggedIn: res.locals.loggedIn });
  }
);

module.exports = router;
