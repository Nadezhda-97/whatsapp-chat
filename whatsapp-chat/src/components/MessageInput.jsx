import React from 'react';

const MessageInput = ({ textMessage, setTextMessage, sendMessage }) => {
  return (
    <div>
      <input 
        type="text" 
        value={textMessage} 
        onChange={(e) => setTextMessage(e.target.value)} 
        placeholder="Ваше сообщение" 
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};

export default MessageInput;
