// ./src/pages/components/LoginForm.js
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Typography,
  Button, 
  Link, 
  CircularProgress 
} from '@mui/material';
import { useAuth } from 'contexts/AuthContext';
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
      const redirectTo = location.state?.from || '/DashboardTest';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Login</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
          }}
        >  
            <TextField
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              InputProps={{
                sx: {
                  input: {
                    '&::placeholder': {
                      textAlign: 'center',
                    },
                  },
                },
              }}
            />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
          }}
        >  
            <TextField
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              InputProps={{
                sx: {
                  input: {
                    '&::placeholder': {
                      textAlign: 'center',
                    },
                  },
                },
              }}
            />
        </Box>

        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
          }}
        >
          <Button
            fullWidth
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>

        <Box textAlign="center" mt={2}>
          <Link
            onClick={onToggleForm}
            disabled={isLoading}
          >
            Don't have an account? Register
          </Link>
        </Box>
      </Box>
    </Box>
  );
};