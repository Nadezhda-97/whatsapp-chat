import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = (id, token) => {
    setIdInstance(id);
    setApiTokenInstance(token);
    setLoggedIn(true);
  };

  const handleStartChat = (number) => {
    setPhoneNumber(number);
  };

  return (
    <div>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <input 
            type="text" 
            placeholder="Введите номер получателя" 
            onBlur={(e) => handleStartChat(e.target.value)} 
          />
          <Chat 
            idInstance={idInstance} 
            apiTokenInstance={apiTokenInstance} 
            phoneNumber={phoneNumber} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
