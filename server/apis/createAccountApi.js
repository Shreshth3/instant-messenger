const express = require('express');
const User = require('../database/db');

const router = express();

// Handle all POST requests coming into /create-account
router.post(
  '/',
  // This function creates a new user
  (req, res, next) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    // Create a new user entry in our database with the provided username and password
    User.create({
      username,
      password,
    })
      // Once we receive the result of the query, print the username
      .then((result) => {
        console.log(
          `Successfully entered user \"${result.username}\" into the database.`
        );
        return next();
      })
      // If an error is thrown by our query, invoke the global error handler
      .catch((err) => {
        console.log(`ERROR: ${err}`);
        return next(err);
      });
  },
  // Once we've successfully created a new user in our database, send a success status code
  // to the client
  (req, res) => {
    res.status(200).json('hello');
  }
);

module.exports = router;
