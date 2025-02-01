import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginStyles.css';

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
    <div className="login-container">
      <h2 className="login-title">Войти в чат</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID Instance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          className="login-input"
          required
          autoFocus
        />
        <input
          type="text"
          placeholder="API Token Instance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button" onClick={handleLogin}>Войти</button>
      </form>
    </div>
  );
};

export default Login;
