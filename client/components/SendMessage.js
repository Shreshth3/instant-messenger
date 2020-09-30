import React from 'react';

function SendMessage({ currMsg, setCurrMsg, addMessage, userTyping }) {
  const socket = io.connect('http://localhost:3000');

  socket.on('message', addMessage);
  socket.on('typing', userTyping);

  function sendMessage(event) {
    event.preventDefault();
    socket.emit('message', {
      msg: currMsg,
    });
  }

  function typingMessage(event) {
    setCurrMsg(event.target.value);
    if (currMsg !== '' && currMsg !== ' ') {
      // Send message down web socket
      socket.emit('typing', {
        user: 'Someone',
      });
    }
  }

  return (
    <form id="message-form">
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
  );
}

export default SendMessage;
