import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Chat from './components/Chat';

const loginPath = '/login';
const chatPath = '/';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ idInstance: '', apiTokenInstance: '' });

  const Root = ({ children }) => {
    return !isLoggedIn ? children : <Navigate to={chatPath} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginPath} element={<Root><Login setIsLoggedIn={setIsLoggedIn} setCredentials={setCredentials} /></Root>} />
        <Route path={chatPath} element={<Chat credentials={credentials} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
