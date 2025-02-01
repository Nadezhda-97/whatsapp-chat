import React from 'react';

const MessageInput = ({ textMessage, setTextMessage, sendMessage }) => {
  return (
    <div className="message-input">
      <input
        type="text"
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
        placeholder="Ваше сообщение"
        className="message-input-field"
        required
        autoFocus
      />
      <button onClick={sendMessage} className="send-button">Отправить</button>
    </div>
  );
};

export default MessageInput;
