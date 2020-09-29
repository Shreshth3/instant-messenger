import React, { Component, useState } from 'react';

function MessageContainer({ messages, typingUser }) {
  // console.log(messages);
  const messagesDisplay = messages.map((message, idx) => {
    return <p key={`${idx}-${message}`}>{message.msg}</p>;
  });

  return (
    <div id="msg-container">
      {messagesDisplay}
      <p id="whos-typing">{typingUser}</p>
    </div>
  );
}

function App() {
  const [currMsg, setCurrMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      msg: 'hi there!',
    },
    {
      msg: 'whats up?',
    },
    {
      msg: 'hey!',
    },
  ]);
  const [typingUser, setTypingUser] = useState('');

  const socket = io.connect('http://localhost:3000');

  socket.on('message', (data) => {
    const newState = messages.slice();
    newState.push(data);
    setMessages(newState);
    setCurrMsg('');
    console.log(data.msg);
  });

  socket.on('typing', (data) => {
    const newState = `${data.user} is typing...`;
    setTypingUser(newState);
  });

  function sendMessage(event) {
    event.preventDefault();
    console.log(currMsg);
    socket.emit('message', {
      msg: currMsg,
    });
  }

  function typingMessage(event) {
    console.log('typing a msg');
    setCurrMsg(event.target.value);
    if (currMsg !== '' && currMsg !== ' ') {
      // Send message down web socket
      socket.emit('typing', {
        user: 'Someone',
      });
    }
  }

  return (
    <div id="main-container">
      <h1>Instant Messenger</h1>
      <MessageContainer messages={messages} typingUser={typingUser} />
      <form>
        <input
          type="text"
          id="msg"
          name="message"
          placeholder="Type a message..."
          onChange={(event) => typingMessage(event)}
          value={currMsg}
        />
        <input
          type="submit"
          id="send-btn"
          name="send"
          onClick={(e) => sendMessage(e)}
          value="Send"
        />
      </form>
    </div>
  );
}

export default App;
