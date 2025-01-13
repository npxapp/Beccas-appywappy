// ./src/pages/components/RegisterForm.js
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Button, 
  Link 
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

export const RegisterForm = ({ onToggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Register</Typography>

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
          <Box
            sx={{
              position: 'relative',
              width: '100%',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'scanline 2s linear infinite, jitter 0.1s steps(2) infinite, colorShift 5s linear infinite',
                zIndex: -1,
                color: 'text.primary',
                fontSize: '1.6rem',
                opacity: 0.5,
              }}
            >
              username
            </Box>
            <TextField
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              InputProps={{
                sx: {
                  input: {
                    '&::placeholder': {
                      textAlign: 'center',
                    }
                  },
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
          }}
        >  
          <Box
            sx={{
              position: 'relative',
              width: '100%',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'scanline 2s linear infinite, jitter 0.1s steps(2) infinite, colorShift 5s linear infinite',
                zIndex: -1,
                color: 'text.primary',
                fontSize: '1.6rem',
                opacity: 0.5,
              }}
            >
              password
            </Box>
            <TextField
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                sx: {
                  input: {
                    '&::placeholder': {
                      textAlign: 'center',
                    }
                  },
                },
              }}
            />
          </Box>
        </Box>

        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

          <Button
            fullWidth
            type="submit"
          >
            Register
          </Button>

        <Box textAlign="center" mt={2}>
          <Link
            component="button"
            onClick={onToggleForm}
          >
            Already have an account? Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
};