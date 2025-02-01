import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <Message key={index} text={message.text} sender={message.sender} />
      ))}
    </div>
  );
};

export default MessageList;

/* 
<div style={{ height: '400px', overflowY: 'scroll', padding: '10px' }}>
*/