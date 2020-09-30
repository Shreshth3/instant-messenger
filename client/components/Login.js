import React from 'react';

function Login() {
  return (
    <div id="login-container">
      {/* <div id="title-bar"> */}
      <h1 id="title">Instant Messenger</h1>
      {/* </div> */}
      <form id="login-form">
        <label>Username:</label>
        <input type="text" />
        <br />
        <label>Password:</label>
        <input type="text" />
        <br />
        <input type="submit" id="sign-in-btn" alue="Sign in" />
      </form>
    </div>
  );
}

export default Login;
