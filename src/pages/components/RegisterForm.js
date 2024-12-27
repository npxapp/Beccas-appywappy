// components/RegisterForm.js
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
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
    <Paper elevation={3}>
      <Box p={4} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Register
        </Button>

        <Box mt={2} textAlign="center">
          <Link
            component="button"
            variant="body2"
            onClick={onToggleForm}
          >
            Already have an account? Login
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};


