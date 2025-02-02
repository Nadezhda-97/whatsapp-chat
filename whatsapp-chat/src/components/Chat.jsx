import React, { useState, useEffect, useCallback } from 'react';
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
      await axios.post(
        `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        {
          chatId: `${currentChat}@c.us`, // номер аккаунта собеседника
          message: textMessage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setMessages(prevMessages => [...prevMessages, { text: textMessage, sender: 'me' }]);
      setTextMessage('');
    } catch(error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  const deleteNotification = useCallback(async (receiptId) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.error('Ошибка при удалении уведомления');
    }
  }, [idInstance, apiTokenInstance]);

  const fetchMessages = useCallback(async () => {
    if (!currentChat) return; // Не запрашиваем сообщения, если нет текущего чата
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
      );

      if (response.data) {
        if (response.data.body.typeWebhook === 'incomingMessageReceived') {
          const { senderData, messageData } = response.data.body;
          const newMessage = {
            text: messageData.textMessageData.textMessage,
            sender: senderData.sender,
          };
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }
      }

      try {
        await deleteNotification(response.data.receiptId);
      } catch(error) {
        console.error('Ошибка при удалении уведомления', error.message);
      }

    } catch(error) {
      console.error('Ошибка при получении сообщений', error);
    }
  }, [idInstance, apiTokenInstance, currentChat, deleteNotification]);

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
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [currentChat, fetchMessages]);

  const handleLogout = () => {
    localStorage.removeItem('idInstance');
    localStorage.removeItem('apiTokenInstance');
    setIsLoggedIn(false);
    navigate('/login');
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
            <MessageList messages={messages} />
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
