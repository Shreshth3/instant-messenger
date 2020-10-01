import React from 'react';
import _ from 'lodash';

/*
This component has the logic for sending messages. Also note that the frontend logic for the
WebSocket is in this file.
*/

function SendMessage({
  currUser,
  currMsg,
  setCurrMsg,
  addMessage,
  userTyping,
  setTypingUser,
  typingUser,
}) {
  // Create a socket linked with the socket on our server
  const socket = io.connect('http://localhost:3000');

  // Invoke the appropriate function upon receiving a message from the WebSocket
  socket.on('message', addMessage);
  socket.on('typing', userTyping);

  // When the user has sent a message, we need to send this down the WebSocket
  // so that the server can notify any other clients
  function sendMessage(event) {
    event.preventDefault();
    setTypingUser('');
    socket.emit('message', {
      user: currUser,
      msg: currMsg,
    });
  }

  // When the current user starts typing a message, we want to send a "typing" event down the WebSocket
  // so that the server can notify other clients
  function typingMessage(event) {
    const unfinishedMsg = event.target.value;

    // If the current message isn't empty, send a "typing" event down the WebSocket
    if (unfinishedMsg !== '') {
      socket.emit('typing', {
        user: currUser,
      });
    } else {
      // USE THROTTLE AND DEBOUNCE
      socket.emit('typing', {
        user: '',
      });
    }

    setCurrMsg(unfinishedMsg);
  }

  return (
    <form id="message-form">
      {/* Input field where messages are typed */}
      <input
        type="text"
        id="msg"
        name="message"
        placeholder="Type a message..."
        onChange={(event) => _.debounce(typingMessage(event))()}
        value={currMsg}
      />
      {/* Button used to send the current message */}
      <input
        type="submit"
        id="send-btn"
        name="send"
        onClick={(event) => sendMessage(event)}
        value="Send"
      />
    </form>
  );
}

export default SendMessage;
