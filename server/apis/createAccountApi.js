const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../database/db');

const router = express();

// Handle all POST requests coming into /create-account
router.post(
  '/',
  // This function creates a new user
  (req, res, next) => {
    const { username, password } = req.body;
    const saltRounds = 10; // This will be used to encrypt the user's password

    // Encrypt the users password and store it in our database
    bcrypt.hash(password, saltRounds, (err, hash) => {
      // If we are unable to encrypt the password, invoke the global error handler
      if (err) {
        return next(err);
      }
      // Create a new user entry in our database with the provided username and password
      User.create({
        username,
        password: hash,
      })
        // Once we receive the result of the query, print the username
        .then((result) => {
          console.log(
            `Successfully entered user \"${result.username}\" into the database.`
          );
          return next();
        })
        // If an error is thrown by our query, invoke the global error handler
        .catch((error) => {
          console.log(`ERROR: ${error}`);
          return next(error);
        });
    });
  },
  // Once we've successfully created a new user in our database, send a success status code
  // to the client
  (req, res) => {
    res.status(200).json('hello');
  }
);

module.exports = router;
