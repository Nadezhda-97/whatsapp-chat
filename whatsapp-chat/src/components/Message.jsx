import React from 'react';
import '../styles/chatStyles.css';

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender === 'me' ? 'message-me' : 'message-other'}`}>
      {text}
    </div>
  );
}

export default Message;