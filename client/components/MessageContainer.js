import React from 'react';

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

export default MessageContainer;
