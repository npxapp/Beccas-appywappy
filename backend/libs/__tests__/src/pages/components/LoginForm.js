// ./src/pages/components/LoginForm.js
import React, { useState } from 'react';
import { Box, TextField, Button, Link, CircularProgress } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginForm = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, password);
      const redirectTo = location.state?.from || '/DashboardPage';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box textAlign="center">
        <h5>Login</h5>
      </Box>

      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />

      {error && (
        <Box color="error" textAlign="center">
          {error}
        </Box>
      )}

      <Button
        fullWidth
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Login'}
      </Button>

      <Box textAlign="center">
        <Link
          className="App-link"
          component="button"
          onClick={onToggleForm}
          disabled={isLoading}
        >
          Don't have an account? Register
        </Link>
      </Box>
    </Box>
  );
};