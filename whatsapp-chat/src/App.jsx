import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ idInstance: '', apiTokenInstance: '' });

  return (
    <div className='app'>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} setCredentials={setCredentials} />
      ) : (
          <Chat credentials={credentials} />
      )}
    </div>
  );
}

export default App;
