import React, { useState } from 'react';

const Login = ({ setIsLoggedIn, setCredentials }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCredentials({ idInstance, apiTokenInstance });
    setIsLoggedIn(true);
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
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;
