import React, { useState, createContext, useEffect } from 'react';

export const MyUserContext = createContext();

const MyUserProvider = ({ children }) => {
  
  // Inicializálás localStorage-ből
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [valasztottTopic, setValasztottTopic] = useState(() => {
    const saved = localStorage.getItem("valasztottTopic");
    return saved ? JSON.parse(saved) : null;
  });

  const [valasztottKartya, setValasztottKartya] = useState({})

  // Token mentése localStorage-be
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Topic mentése localStorage-be
  useEffect(() => {
    if (valasztottTopic) {
      localStorage.setItem("valasztottTopic", JSON.stringify(valasztottTopic));
    } else {
      localStorage.removeItem("valasztottTopic");
    }
  }, [valasztottTopic]);

  return (
    <MyUserContext.Provider 
      value={{ token, setToken, valasztottTopic, setValasztottTopic, valasztottKartya, setValasztottKartya }}
    >
      {children}
    </MyUserContext.Provider>
  );
};

export default MyUserProvider;
