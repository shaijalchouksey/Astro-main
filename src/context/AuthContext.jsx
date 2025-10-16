import React, { createContext, useState, useEffect } from 'react';

// 1. Context ko create karein
export const AuthContext = createContext(null);

// 2. Provider component banayein
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Jab app pehli baar load ho, to localStorage check karein
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Login hone par token set karne ka function
  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  // Logout hone par token remove karne ka function
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  // User logged in hai ya nahi, yeh check karne ke liye ek value
  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ isAuthenticated, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
