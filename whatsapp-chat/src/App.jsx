import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Chat from './components/Chat';

const loginPath = '/login';
const chatPath = '/';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Root = ({ children }) => {
    return isLoggedIn ? <Navigate to={chatPath} /> : children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={loginPath} element={<Root><Login setIsLoggedIn={setIsLoggedIn} /></Root>} />
        <Route path={chatPath} element={<Chat isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
