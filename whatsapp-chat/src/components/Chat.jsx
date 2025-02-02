import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ContactInput from './ContactInput';
import ContactList from './ContactList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import '../styles/chatStyles.css';

const Chat = ({ isLoggedIn, setIsLoggedIn }) => {
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState('');
  const [currentChat, setCurrentChat] = useState(null);
  const navigate = useNavigate();

  const idInstance = localStorage.getItem('idInstance');
  const apiTokenInstance = localStorage.getItem('apiTokenInstance');

  const sendMessage = async () => {
    if (!currentChat) return; // Если нет выбранного чата, не отправляем сообщение
    try {
      await axios.post(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
          chatId: `${currentChat}@c.us`, // номер аккаунта собеседника
          message: textMessage,
        }, {
          headers: {
          'Content-Type': 'application/json'
        },
        },
      );
      setMessages(prevMessages => [...prevMessages, { text: textMessage, sender: 'me' }]);
      setTextMessage('');
    } catch(error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  const fetchMessages = async () => {
    if (!currentChat) return; // Не запрашиваем сообщения, если нет текущего чата
    try {
      const response = await axios.get(`https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);

    // Проверка на наличие новых сообщений
    //console.log('response.data.body ->', response.data.body);
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
    if (!isLoggedIn) {
      navigate('/login'); // Перенаправление на страницу логина, если не авторизован
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    fetchMessages();
    /* const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval); */
  }, [currentChat, fetchMessages]);

  const handleLogout = () => {
    localStorage.removeItem('idInstance');
    localStorage.removeItem('apiTokenInstance');
    setIsLoggedIn(false); // Устанавливаем состояние неавторизованного пользователя
    navigate('/login'); // Перенаправляем на страницу логина
};

  return (
    <div className="container">
      <div className="contact-container">
        <h3>Чаты</h3>
        <ContactInput newContact={newContact} setNewContact={setNewContact} addContact={addContact} />
        <ContactList contacts={contacts} setCurrentChat={setCurrentChat} />
        <button onClick={handleLogout} className="logout-button">Выйти</button>
      </div>
      <div className="chat-container">
        {currentChat ? (
          <>
            <h3>Чат с {currentChat}</h3>
            <div className="message-list">
              <MessageList messages={messages} />
            </div>
            
            <MessageInput textMessage={textMessage} setTextMessage={setTextMessage} sendMessage={sendMessage} />
          </>
        ) : (
            <p>Выберите чат для начала общения</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
