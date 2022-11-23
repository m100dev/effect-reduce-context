import React, { useState, useEffect } from 'react';

// Creates a context object that you'll use to provide state globally to React components
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, passowrd) => {}
});

// Create a custom context management component
export const AuthContextProvider = (props) => {

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

    // Removes stored login state when the user clicks to log out.
    const logoutHandler = () => {       
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return (
        <AuthContext.Provider 
            value={{
                isLoggedIn: isLoggedIn, 
                onLogout: logoutHandler, 
                onLogin: loginHandler
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
} 

export default AuthContext;