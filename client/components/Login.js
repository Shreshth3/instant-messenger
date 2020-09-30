import React, { useState } from 'react';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function createAccount(event) {
    event.preventDefault();
    fetch('/create-account', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    alert('Your account has been created! Now try logging in.');
  }

  function signIn() {
    event.preventDefault();
    fetch('/sign-in', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setLoggedIn(true);
        } else {
          alert(
            'Error: Invalid username and/or password. Please try again or create an account.'
          );
        }
      })
      .catch((err) => {
        alert('There was an error while processing your login attempt.');
        console.log(`ERROR: ${err}`);
      });
  }

  return (
    <div id="login-container">
      {/* <div id="title-bar"> */}
      <h1 id="title">Instant Messenger</h1>
      {/* </div> */}
      <form id="login-form">
        <div>
          <label>Username: </label>
          <input
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Password: </label>
          <input
            type="text"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <br />
        <div>
          <input
            type="submit"
            id="create-act-btn"
            value="Create account"
            onClick={createAccount}
          />
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
