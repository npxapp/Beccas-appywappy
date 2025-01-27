import React from 'react';
import { Box } from '@mui/material';
import DrawerSlider from './DrawerSlider';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <DrawerSlider />
    </Box>
  );
};

export default Footer;