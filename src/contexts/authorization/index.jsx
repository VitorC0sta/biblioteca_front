import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [libUser, setLibUser] = useState();
  
  const login = (user) => {
    setLibUser(user)
    localStorage.setItem('@user', JSON.stringify(user));
    localStorage.setItem('@authToken', "ASOPDkasopadfkASPOFKasopdk44");
    setIsAuthenticated(true);
  }
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('@user');
    localStorage.removeItem('@authToken');
  }

  //passar axios aqui
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, libUser }}>
      {children}
    </AuthContext.Provider>
  );
};
