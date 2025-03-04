// components/atoms/LogoComponent.js
import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ darkMode, isHomePage }) => ({
  flex: '0 0 auto',
  fontWeight: 700,
  fontSize: '3rem',
  fontFamily: 'kornucopiaregular',
  position: 'relative',
  display: 'inline-block',
  letterSpacing: '-1px',
  px: '10px',
  textShadow: darkMode ? '0 0 10px rgba(97, 218, 251, 0.6), 0 0 15px rgba(97, 218, 251, 0.4)' : 'none',
  minHeight: 0,
  height: 'auto',
  lineHeight: 1,
  borderRadius: 20,
  border: 'none',
  textTransform: 'none',
  color: darkMode ? 'white' : 'black',

  '& > span': {
    position: 'relative',
    zIndex: 2,
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(
      45deg, 
      rgba(97, 218, 251, 0.3) 0%, 
      rgba(97, 218, 251, 0.6) 25%, 
      rgba(97, 218, 251, 0.1) 50%, 
      rgba(97, 218, 251, 0.6) 75%, 
      rgba(97, 218, 251, 0.3) 100%
      )`,
    opacity: 0.6,
    filter: 'blur(50px)',
    zIndex: 1,
  },

  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `repeating-linear-gradient(
      0deg,
      rgba(97, 218, 251, 0.1) 0px, 
      rgba(97, 218, 251, 0.1) 1px, 
      transparent 1px, 
      transparent 2px
    )`,
    opacity: 0.4,
    animation: 'scanLines 3s linear infinite',
    zIndex: 2,
  },

  '&:hover': {
    transform: 'scale(1.03)',
    textShadow: '0 0 15px rgba(97, 218, 251, 0.8)',
  },
}));

const LogoComponent = ({ 
  darkMode, 
  isHomePage, 
  toggleDashboardDrawer, 
  logoText = "startersoft.io", 
  linkTo = "/",
  showPlayIcon = true
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Link 
        to={linkTo} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none', 
          cursor: 'pointer' 
        }}
      >
        <StyledTypography darkMode={darkMode} isHomePage={isHomePage}>
          <span>{logoText}</span>
        </StyledTypography>
      </Link>
      {showPlayIcon && (
        <IconButton
          color="primary"
          aria-label="dashboard"
          onClick={toggleDashboardDrawer}
          size="large"
          sx={{
            fontSize: '3rem',
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: '-5px',
          }}
        >
          <PlayCircleFilledIcon sx={{ fontSize: '3rem', color: darkMode ? 'white' : 'black', }} />
        </IconButton>
      )}
    </Box>
  );
};

export default LogoComponent;

