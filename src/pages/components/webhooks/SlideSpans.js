import React from 'react';
import { Box, IconButton, Typography, Slide } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSlide } from '../../contexts/SlideContext';
import CustomGroupComponent from './CustomGroupComponent';

const SlideSpans = () => {

  const {
    activeSlide, 
    setActiveSlide,
    setPreviousSlide 
  } = useSlide();  
  
  const handleBack = () => {
    setPreviousSlide(activeSlide);
    setActiveSlide(0);
  };
  
  return (
    <Slide direction="right" in={activeSlide === 3} mountOnEnter unmountOnExit>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <IconButton onClick={handleBack}>
          <ArrowBackIcon sx={{ color: '#61dafb' }} />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <Typography variant="h6" sx={{ color: '#61dafb' }}>
            Spans
          </Typography>
          <CustomGroupComponent />
        </Box>
      </Box>
    </Slide>
  );
};

export default SlideSpans;