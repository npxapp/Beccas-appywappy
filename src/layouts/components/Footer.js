import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DrawerSlider from './parts/DrawerSlider';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || 'DashboardPage';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: isHomePage ? 'black' : 'inherit', // Black background for '/'
      }}
    >
      <DrawerSlider />
    </Box>
  );
};

export default Footer;