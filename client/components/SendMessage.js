import React from 'react';

function SendMessage({ currMsg, setCurrMsg, addMessage, userTyping }) {
  // Create a socket linked with the socket on our server
  const socket = io.connect('http://localhost:3000');

  // Invoke the appropriate function upon receiving a message from the WebSocket
  socket.on('message', addMessage);
  socket.on('typing', userTyping);

  // When the user has sent a message, we need to send this down the WebSocket
  // so that the server can inform notify any other clients
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
