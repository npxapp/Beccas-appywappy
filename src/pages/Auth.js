// pages/Auth.js
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import logo from '../logo.svg'; // Adjust the path to match your file structure

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box className="App">
      <Box className="App-header" textAlign="center">
        <img src={logo} className="App-logo" alt="logo" />
        <Box>
          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;