import React, { createContext, useContext, useEffect, useState } from "react";

// Auth Context
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => { 
    const isToken = localStorage.getItem('token');
    if (isToken) {
    setUser({ token: isToken });
    }
}, []);

const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}