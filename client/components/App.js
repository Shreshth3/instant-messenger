import React, { Component, useState } from 'react';

function MessageContainer({ messages }) {
  // console.log(messages);
  const messagesDisplay = messages.map((message, idx) => {
    return <p key={`${idx}=${message}`}>{message.msg}</p>;
  });

  return <div>{messagesDisplay}</div>;
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
      msg: 'coding',
    },
  ]);
  // console.log(`msgs are: ${messages}`);
  // messages.forEach((message) => console.log(message));

  const socket = io.connect('http://localhost:3000');

  socket.on('message', (data) => {
    const newState = messages.slice();
    newState.push(data);
    setMessages(newState);
    setCurrMsg('');
    console.log(data.msg);
  });

  function sendMessage(event) {
    event.preventDefault();
    console.log(currMsg);
    socket.emit('message', {
      msg: currMsg,
    });
  }

  return (
    <div>
      <MessageContainer messages={messages} />
      <form>
        <input
          type="text"
          id="msg"
          name="message"
          placeholder="Type a message..."
          onChange={(event) => setCurrMsg(event.target.value)}
          value={currMsg}
        />
        <input
          type="submit"
          name="send"
          onClick={(e) => sendMessage(e)}
          value="Send message!"
        />
      </form>
    </div>
  );
}

export default App;
