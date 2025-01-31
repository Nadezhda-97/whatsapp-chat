import React from 'react';

function Message({ text, sender }) {
  return (
    <div className={sender === 'me' ? 'message-me' : 'message-other'}>
      {text}
    </div>
  );
}

export default Message;