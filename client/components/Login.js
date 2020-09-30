import React from 'react';

function Login() {
  return (
    <div id="login-container">
      {/* <div id="title-bar"> */}
      <h1 id="title">Instant Messenger</h1>
      {/* </div> */}
      <form id="login-form">
        <div>
          <label>Username: </label>
          <input type="text" />
        </div>
        <br />
        <div>
          <label>Password: </label>
          <input type="text" />
        </div>
        <br />
        <div>
          <input type="submit" id="create-act-btn" value="Create account" />
          <input type="submit" id="sign-in-btn" value="Sign in" />
        </div>
      </form>
    </div>
  );
}

export default Login;
