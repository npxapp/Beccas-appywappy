import React, { createContext, useState, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [debugMessages, setDebugMessages] = useState([]);  // Track debug messages
  const navigate = useNavigate();
  const location = useLocation();

  // Create axios instance with more detailed configuration
  const api = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    withCredentials: true,
    timeout: 5000, 
  });

  // Update debug messages state
  const debug = (message, data) => {
    const newMessage = { message, data, timestamp: new Date() };
    setDebugMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log(`[Auth Debug] ${message}`, data);
  };

  // Request interceptor with detailed logging
  api.interceptors.request.use(
    (config) => {
      debug('Request Config:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data
      });

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      debug('Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor with enhanced error handling
  api.interceptors.response.use(
    (response) => {
      debug('Response:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      return response;
    },
    (error) => {
      debug('Response Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });

      if (error.code === 'ECONNABORTED') {
        console.error('Request timed out');
      } else if (!error.response) {
        console.error('Network error - no response received');
      } else if (error.response.status === 401) {
        logout();
      }

      return Promise.reject(error);
    }
  );

    const login = useCallback(async (username, password) => {
      try {
        alert(`Attempting login for user:${username}`);
    
        // Now proceed with the axios api.post
        const response = await api.post('/api/auth/login', { 
          username, 
          password 
        });
        
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(response.data.user);
    
        const redirectPath = location.state?.from || '/DashboardPage';
        navigate(redirectPath);
    
        debug('Login successful:', { user: response.data.user });
        return true;
      } catch (error) {
        debug('Login failed:', error);
        throw new Error(error.response?.data?.error || 'Login failed');
      }
    }, [navigate, location]);

  const register = useCallback(async (username, password) => {
    try {
      debug('Attempting registration for user:', username);
      
      const response = await api.post('/api/auth/register', { 
        username, 
        password 
      });
      
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(response.data.user);

      const redirectPath = location.state?.from || '/DashboardPage';
      navigate(redirectPath);

      debug('Registration successful:', { user: response.data.user });
      return true;
    } catch (error) {
      debug('Registration failed:', error);
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  }, [navigate, location]);

  const logout = useCallback(() => {
    debug('Logging out user');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/Auth');
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, api, debugMessages }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);