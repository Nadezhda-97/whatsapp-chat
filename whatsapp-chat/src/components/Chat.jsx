import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Message from './Message';

const Chat = ({ credentials }) => {
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  //const [recipient, setRecipient] = useState(''); // const [phoneNumber, setPhoneNumber] = useState('');

  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState('');
  const [currentChat, setCurrentChat] = useState(null);

  const { idInstance, apiTokenInstance } = credentials;

  const sendMessage = async () => {
    if (!currentChat) return; // Если нет выбранного чата, не отправляем сообщение
    try {
      await axios.post(`https://api.green-api.com/sendMessage`, {
        idInstance,
        apiTokenInstance,
        recipient: currentChat,
        message: textMessage,
      });
      setMessages(prevMessages => [...prevMessages, { text: textMessage, sender: 'me' }]);
      setTextMessage(''); //setTextMessage(textMessage);
    } catch(error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  const fetchMessages = async () => {
    if (!currentChat) return; // Не запрашиваем сообщения, если нет текущего чата
    try {
      const response = await axios.get(`https://api.green-api.com/receiveMessage`, {
        params: { idInstance, apiTokenInstance },
      });

    // Проверка на наличие новых сообщений
      if (response.data && response.data.length > 0) {
        const newMessages = response.data
          .filter(msg => msg.sender === currentChat) // Фильтруем сообщения по текущему чату
          .map(msg => ({
            text: msg.message,
            sender: 'other',
          }));
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
      }
    } catch(error) {
      console.error('Ошибка при получении сообщений:', error);
    }
  };

  const addContact = () => {
    if (newContact && !contacts.includes(newContact)) {
        setContacts([...contacts, newContact]);
        setNewContact('');
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h3>Чаты</h3>
        <input 
          type="text" 
          placeholder="Номер получателя" 
          value={newContact} 
          onChange={(e) => setNewContact(e.target.value)} 
        />
        <button onClick={addContact}>Добавить чат</button>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index} onClick={() => setCurrentChat(contact)} style={{ cursor: 'pointer' }}>
              {contact}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ width: '70%', padding: '10px' }}>
        {currentChat ? (
          <>
            <h3>Чат с {currentChat}</h3>
            <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
              {messages.map((msg, index) => (
                <Message key={index} text={msg.text} sender={msg.sender} />
              ))}
            </div>
            <input 
              type="text" 
              value={textMessage} 
              onChange={(e) => setTextMessage(e.target.value)} 
              placeholder="Ваше сообщение" 
            />
            <button onClick={sendMessage}>Отправить</button>
          </>
        ) : (
            <p>Выберите чат для начала общения.</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
