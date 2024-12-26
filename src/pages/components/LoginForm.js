// ./src/pages/components/LoginForm.js
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Link,
  CircularProgress
} from '@mui/material';
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
      // After successful login, redirect to the intended page or dashboard
      const redirectTo = location.state?.from || '/DashboardPage';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3}>
      <Box p={4} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
        
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
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
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Login'}
        </Button>

        <Box mt={2} textAlign="center">
          <Link
            component="button"
            variant="body2"
            onClick={onToggleForm}
            disabled={isLoading}
          >
            Don't have an account? Register
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};