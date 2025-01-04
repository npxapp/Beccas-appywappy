// pages/Auth.js
import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container maxWidth="sm">
      <Box py={4}>
        {isLogin ? (
          <LoginForm onToggleForm={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleForm={() => setIsLogin(true)} />
        )}
      </Box>
    </Container>
  );
};


