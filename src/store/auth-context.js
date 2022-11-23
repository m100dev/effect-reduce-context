import React from 'react';

// Creates a context object that you'll use to provide state globally to React components
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {}
});

export default AuthContext;