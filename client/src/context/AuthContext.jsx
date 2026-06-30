import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

// Auth Context
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const isToken = localStorage.getItem('token');
    if (isToken) {
      const decoded = jwtDecode(isToken)
      setUser({ token: isToken, role: decoded.user.role });
    }
    setLoading(false);
}, []);

const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token)
    setUser({ token, role: decoded.user.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}