import React, { Component, useState } from 'react';

function App() {
  const [currMsg, setCurrMsg] = useState('');

  function sendMessage(event) {
    event.preventDefault();
    fetch('/hi')
      .then((res) => res.json())
      .then((data) => console.log(data));
    // console.log(currMsg);
    // console.log(currMsg);
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          id="msg"
          name="message"
          placeholder="Type a message..."
          onChange={(event) => setCurrMsg(event.target.value)}
        />
        <input type="submit" name="send" value="Send message!" />
      </form>
    </div>
  );
}

export default App;
