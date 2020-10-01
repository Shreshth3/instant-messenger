const express = require('express');
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
        console.log('here is result');
        console.log(result);
        // If the user has provided the correct password...
        if (result && password === result.password) {
          res.locals.loggedIn = true; // Store the successful login for future use
          res.cookie('username', username); // Add a cookie containing the username
        }
        // If no user was found or if the provided password was incorrect...
        else {
          res.locals.loggedIn = false; // Store the failed login for future use
        }
        return next();
      })
      // If an error is thrown by our query, invoke the global error handler
      .catch((err) => next(err));
  },
  // Once we've finished processing the user's sign-in attempt, respond to the client's
  // HTTP request and let them know whether the user has signed in
  (req, res) => {
    res.status(200).json({ loggedIn: res.locals.loggedIn });
  }
);

module.exports = router;
