import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setCredentials }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCredentials({ idInstance, apiTokenInstance });
    setIsLoggedIn(true);
  };

  const handleLogin = () => {
    // Здесь можно добавить логику проверки учетных данных
    // Если вход успешен, перенаправляем на страницу чата
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="ID Instance" 
        value={idInstance} 
        onChange={(e) => setIdInstance(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="API Token Instance" 
        value={apiTokenInstance} 
        onChange={(e) => setApiTokenInstance(e.target.value)} 
      />
      <button type="submit" onClick={handleLogin}>Войти</button>
    </form>
  );
};

export default Login;
