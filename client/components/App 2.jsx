import React, { useState } from 'react';
import MessageContainer from './MessageContainer.jsx';
import SendMessage from './SendMessage.jsx';
import Login from './Login.jsx';

/*
This is the highest level component. It contains key parts of the application's state and
is responsible for rendering both the Login component, the MessageContainer component,
and the SendMessage component.
*/

function App() {
  // State:
  const [currMsg, setCurrMsg] = useState(''); // Current message (being typed by the user)
  const [messages, setMessages] = useState([
    // Array with all of the messages
    {
      user: 'hey',
      msg: 'hi there!',
    },
    {
      user: 'hello',
      msg: 'whats up?',
    },
    {
      user: 'hey',
      msg: 'hey!',
    },
  ]);
  const [currUser, setCurrUser] = useState('');
  const [typingUser, setTypingUser] = useState(''); // Which user is currently typing
  const [loggedIn, setLoggedIn] = useState(false); // Is the current user logged in

  // Add a message to our messages array
  function addMessage(data) {
    const newState = messages.slice(); // Make a copy of the current state
    newState.push(data);
    setMessages(newState);
    setCurrMsg(''); // Clear the current message since we've sent it
    setTypingUser('');
  }

  // Update the state to reflect which user is currently typing
  function userTyping(data) {
    console.log('userTyping invoked');
    const newState = data.user;
    setTypingUser(newState);
  }

  // If the user is logged in, display the instant messenger
  if (loggedIn) {
    return (
      <div id="main-container">
        <h1>Instant Messenger</h1>
        <MessageContainer
          currUser={currUser}
          messages={messages}
          typingUser={typingUser}
        />
        <SendMessage
          currUser={currUser}
          currMsg={currMsg}
          setCurrMsg={setCurrMsg}
          addMessage={addMessage}
          userTyping={userTyping}
          setTypingUser={setTypingUser}
          typingUser={typingUser}
        />
      </div>
    );
  }
  // If the user is not logged in, display the login page
  else {
    return <Login setLoggedIn={setLoggedIn} setCurrUser={setCurrUser} />;
  }
}

export default App;
