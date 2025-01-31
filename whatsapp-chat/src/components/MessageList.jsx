import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};

export default MessageList;
