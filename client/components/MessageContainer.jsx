import React from 'react';

/*
This component displays all messages and displays text to show who is currently typing.
*/

function MessageContainer({ messages, typingUser }) {
  // Iterate over all the messages and stick them inside of a <p> tag
  const messagesDisplay = messages.map((message, idx) => {
    return <p key={`${idx}-${message}`}>{message.msg}</p>;
  });

  return (
    <div id="msg-container">
      {/* Display all of the messages from the App state (passed down as the "messages" prop) */}
      {messagesDisplay}
      {/* This <p> tag shows which user is currently typing */}
      <p id="whos-typing">{typingUser}</p>
    </div>
  );
}

export default MessageContainer;
