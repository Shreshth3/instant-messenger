import React, { useState } from 'react';

/*
This component handles authentication. It is where users can create an account or sign in.
*/

function Login({ setLoggedIn, setCurrUser }) {
  // State:
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Creates a new user via a POST request
  function createAccount(event) {
    event.preventDefault();
    fetch('/create-account', {
      headers: {
        // Accept: 'application/json',
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      .then((result) => result.json())
      .then((data) => console.log(data));
    alert('Your account has been created! Now try logging in.');
  }

  // Attempts to sign in the current user
  function signIn() {
    event.preventDefault();
    fetch('/sign-in', {
      headers: {
        // Accept: 'application/json',
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // If the user logged in successfully, update the state of App
        if (data.loggedIn) {
          setCurrUser(username);
          setLoggedIn(true);
        }
        // If the user did NOT log in successfully, display an alert
        else {
          alert(
            'Error: Invalid username and/or password. Please try again or create an account.'
          );
        }
      })
      // If an error is thrown, alert an error message
      .catch((err) => {
        alert('There was an error while processing your login attempt.');
        console.log(`ERROR: ${err}`);
      });
  }

  return (
    <div id="login-container">
      <h1 id="title">Instant Messenger</h1>

      {/* This form contains all parts of the login/sign-in process */}
      <form id="login-form">
        {/* Username field of sign-in box */}
        <div>
          <label>Username: </label>
          <input
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="off"
          />
        </div>
        <br />
        {/* Password field of sign-in box */}
        <div>
          <label>Password: </label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="off"
          />
        </div>
        <br />
        <div>
          {/* Create account button on sign-in box */}
          <input
            type="submit"
            id="create-act-btn"
            value="Create account"
            onClick={createAccount}
          />
          {/* Sign in button on sign-in box */}
          <input
            type="submit"
            id="sign-in-btn"
            value="Sign in"
            onClick={signIn}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
