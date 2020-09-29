import React from 'react';

function SendMessage({ currMsg, setCurrMsg, addMessage, userTyping }) {
  const socket = io.connect('http://localhost:3000');

  socket.on('message', (data) => sendMessage(data));
  socket.on('typing', userTyping);

  function sendMessage(event) {
    event.preventDefault();
    console.log('hi');
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
        onClick={(event) => sendMessage(event)}
        value="Send"
      />
    </form>
  );
}

export default SendMessage;
