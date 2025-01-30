// Chat.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ idInstance, apiTokenInstance, phoneNumber }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const response = await axios.post(`https://api.green-api.com/sendMessage`, {
      idInstance,
      apiTokenInstance,
      phoneNumber,
      message,
    });
    setMessages([...messages, { text: message, sender: 'me' }]);
    setMessage('');
  };

  const fetchMessages = async () => {
    const response = await axios.get(`https://api.green-api.com/receiveMessage`, {
      params: { idInstance, apiTokenInstance },
    });
    if (response.data && response.data.length) {
      setMessages((prev) => [...prev, ...response.data.map(msg => ({ text: msg.body, sender: 'them' }))]);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        placeholder="Введите сообщение" 
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};

export default Chat;
