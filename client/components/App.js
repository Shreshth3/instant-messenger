import React, { useState } from 'react';
import MessageContainer from './MessageContainer';
import SendMessage from './SendMessage';

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

  function addMessage(data) {
    console.log('test1');
    const newState = messages.slice();
    newState.push(data);
    setMessages(newState);
    setCurrMsg('');
    console.log(data.msg);
    console.log('test2');
  }

  function userTyping(data) {
    const newState = `${data.user} is typing...`;
    setTypingUser(newState);
  }

  return (
    <div id="main-container">
      <h1>Instant Messenger</h1>
      <MessageContainer messages={messages} typingUser={typingUser} />
      <SendMessage
        // socket={socket}
        currMsg={currMsg}
        setCurrMsg={setCurrMsg}
        addMessage={addMessage}
        userTyping={userTyping}
      />
    </div>
  );
}

export default App;
