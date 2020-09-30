import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function createAccount(event) {
    event.preventDefault();
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    fetch('/create-account', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    // console.log('hey');
    alert('Your account has been created! Now try logging in.');
  }

  function signIn() {
    event.preventDefault();
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
