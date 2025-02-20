// components/RegisterForm.js
import React, { useState } from 'react';
import { Box, TextField, Button, Link } from '@mui/material';
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
      <Box textAlign="center">
        <h5>Register</h5>
      </Box>

      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <Box color="error" textAlign="center">
          {error}
        </Box>
      )}

      <Button
        fullWidth
        type="submit"
        disabled={false} // If needed, you can manage a loading state here
      >
        Register
      </Button>

      <Box textAlign="center">
        <Link
          className="App-link"
          component="button"
          onClick={onToggleForm}
        >
          Already have an account? Login
        </Link>
      </Box>
    </Box>
  );
};