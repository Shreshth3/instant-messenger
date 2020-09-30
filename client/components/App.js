import React, { useState } from 'react';
import MessageContainer from './MessageContainer';
import SendMessage from './SendMessage';
import Login from './Login';

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
  const [loggedIn, setLoggedIn] = useState(false);

  function addMessage(data) {
    const newState = messages.slice();
    newState.push(data);
    setMessages(newState);
    setCurrMsg('');
    console.log(data.msg);
  }

  function userTyping(data) {
    const newState = `${data.user} is typing...`;
    setTypingUser(newState);
  }

  if (loggedIn) {
    return (
      <div id="main-container">
        <h1>Instant Messenger</h1>
        <MessageContainer messages={messages} typingUser={typingUser} />
        <SendMessage
          currMsg={currMsg}
          setCurrMsg={setCurrMsg}
          addMessage={addMessage}
          userTyping={userTyping}
        />
      </div>
    );
  } else {
    return <Login />;
  }
}

export default App;
