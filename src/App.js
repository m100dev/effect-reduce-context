import React, { useState, useEffect } from 'react';
import AuthContext from './store/auth-context';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* When the app first renders, we use useEffect to run a check on the localStorage to 
     determine if the user was already logged in. if so, we set the isLoggedIn state to true.
     When the component re-evaluates afterwards, useEffect will not run since the dependency [] will not change. 
  */

  useEffect(()=>{
    const storedLoginInfo = localStorage.getItem('isLoggedIn');

    if(storedLoginInfo === '1') {
      setIsLoggedIn(true);
    };
  },[]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  // Removes stored login state when the user clicks to log out.
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: isLoggedIn
      }}
    >
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
