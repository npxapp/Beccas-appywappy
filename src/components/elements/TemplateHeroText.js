// components/elements/TemplateHeroText
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export const HeroSection = ({ icon: IconComponent, text }) => {
  const navigate = useNavigate();

  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateOpen = (path) => {
    if (path.startsWith('http')) {
      navigatePage(path);
    } else {
      navigate(path);
    }
  };
  
  return (
    <Box>
          <IconComponent sx={{ fontSize: '6rem' }} />
          <Typography variant="h2" gutterBottom>
             {text}
          </Typography>
          <Button
            onClick={() => navigateOpen('https://startersaas.pro/')}
            variant="contained"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              padding: '12px 24px',
              textTransform: 'none',
            }}
          >
            See in action
          </Button>
    </Box>
  );
};

