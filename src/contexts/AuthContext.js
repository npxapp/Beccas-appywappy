// AuthContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const api = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
  });

  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  const login = useCallback(async (username, password) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/login', { 
        username, 
        password 
      });
      
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(response.data.user);
      
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  }, [api]);

  const register = useCallback(async (username, password) => {
    try {
      setError(null);
      const response = await api.post('/api/auth/register', { 
        username, 
        password 
      });
      
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(response.data.user);
      
      return true;
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  }, [api]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        user, 
        error,
        isAuthenticated: !!token,
        login, 
        register, 
        logout,
        api
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

