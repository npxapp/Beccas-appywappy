// layouts/Public/components/Footer.jsx
import React from 'react';
import { Box } from '@mui/material';
import DrawerSlider from './DrawerSlider';
import { useDarkMode } from 'contexts/DarkMode';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: isHomePage ? 'black' : darkMode ? 'black' : 'white',
      }}
    >
      <DrawerSlider />
    </Box>
  );
};

export default Footer;