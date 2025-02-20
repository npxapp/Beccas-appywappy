import React, { useEffect } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'; // Adjust relative path to match your file structure

export const LogoutPage = () => {
  const { logout, user } = useAuth();

  useEffect(() => {
    // Automatically log out the user when the page loads
    logout();
  }, [logout]);

  return (
    <Paper elevation={3}>
      <Box p={4} textAlign="center">
        <Typography variant="h5" gutterBottom>
          You have been logged out.
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user ? `Goodbye, ${user.username}!` : 'Goodbye!'}
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => window.location.href = '/'} 
        >
          Go to Homepage
        </Button>
      </Box>
    </Paper>
  );
};

