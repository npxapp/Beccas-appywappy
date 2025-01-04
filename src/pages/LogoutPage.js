import React, { useEffect } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import { useAuth } from '../contexts/AuthContext'; // Adjust relative path to match your file structure

export const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navigateOpen = () => {
    navigate('/Auth');
  };

  useEffect(() => {
    // Automatically log out the user when the page loads
    logout();
  }, [logout]);

  return (
    <Box className="App">
      <Box className="App-header" textAlign="center">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography component="p" gutterBottom>
          Signed Out, click to Sign in again.
        </Typography>
        <Link 
          className="App-link" 
          component="button" 
          onClick={navigateOpen}
        >
          Auth Page
        </Link>
      </Box>
    </Box>
  );
};

export default LogoutPage;