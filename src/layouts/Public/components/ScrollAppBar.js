// layouts/Public/components/ScrollAppBar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  IconButton, 
  Typography, 
  Link, 
  Box 
} from '@mui/material';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import CancelIcon from '@mui/icons-material/Cancel';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useDarkMode } from 'contexts/DarkMode';
import { useDrawer } from 'contexts/DrawerContext';
import { useDashboardDrawerProtected } from 'contexts/DashboardDrawerProtectedContext';
import { useAuth } from 'contexts/AuthContext';
import { useTvMode } from 'contexts/TvMode';
import { getDomain } from 'layouts/Utils/utils';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ darkMode, isHomePage }) => ({
  flex: '0 0 auto',
  fontWeight: 700,
  fontSize: '3.10rem',
  fontFamily: 'kornucopiaregular',
  position: 'relative',
  display: 'inline-block',
  px: '10px',
  textShadow: '0 0 10px rgba(97, 218, 251, 0.6), 0 0 15px rgba(97, 218, 251, 0.4)',
  minHeight: 0,
  height: 'auto',
  lineHeight: 0.8,
  borderRadius: 20,
  border: 'none',
  textTransform: 'none',
  color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
  
  '& > span': {
    position: 'relative',
    zIndex: 2,
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '120%',
    height: '120%',
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


const ScrollAppBar = () => {
  const { drawerOpen, toggleDrawer } = useDrawer();
  const { dashboardDrawerProtectedOpen, toggleDashboardDrawerProtected } = useDashboardDrawerProtected();
  const { darkMode, setDarkMode } = useDarkMode();
  const { tvMode, setTvMode } = useTvMode();
  const domain = getDomain();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPrivate = location.pathname === '/DashboardPage';
  const { token } = useAuth();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  const toggleTv = () => {
    setTvMode(!tvMode);
  };

  const navigateOpen = (path) => {
   return () => navigate(path);
  };
  
  const handleClick = () => {
    if (token) {
      navigate('/Logout');
    } else {
      navigate('/DashboardTest');
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          zIndex: 1200,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              padding: 0,
              margin: 0,
              height: '56px',
              maxHeight: '56px',
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Link
                component="a"
                href="/"
                onClick={navigateOpen('/')}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                 <StyledTypography darkMode={darkMode} isHomePage={isHomePage}>
                    <span>
                        {domain.slice(0, 1).toUpperCase().concat(domain.slice(1))}
                    </span>
                 </StyledTypography>
                <PlayCircleFilledIcon
                  sx={{
                    fontSize: '3rem',
                    color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
                    position: 'relative',
                    left: '-5px',
                  }}
                />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          right: 10,
          top: 10,
          zIndex: 2000,
          background: 'transparent',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={toggleTheme} variant="panel">
          {darkMode ? (
            <DarkModeIcon
              variant="customIcon"
              sx={{
                color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
              }}
            />
          ) : (
            <LightModeIcon
              variant="customIcon"
              sx={{
                color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
              }}
            />
          )}
        </IconButton>
  
        <IconButton variant="arrowButton" onClick={handleClick}>
          {token ? (
            <CancelIcon
              variant="customIcon"
              sx={{
                color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
              }}
            />
          ) : (
            <PersonPinIcon
              variant="customIcon"
              sx={{
                color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
              }}
            />
          )}
        </IconButton>
  
        <IconButton onClick={toggleTv} variant="panel">
          {tvMode ? (
            <SentimentVerySatisfiedIcon
              variant="customIcon"
              sx={{
                color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
              }}
            />
          ) : (
            <SentimentVeryDissatisfiedIcon
              variant="customIcon"
              sx={{
                color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
              }}
            />
          )}
        </IconButton>

        {isPrivate && (
          <IconButton variant="arrowButton" onClick={toggleDashboardDrawerProtected}>
            {dashboardDrawerProtectedOpen ? (
              <ArrowBackTwoToneIcon
                variant="customIcon"
                sx={{
                  color: darkMode ? 'white' : 'black',
                }}
              />
            ) : (
              <ArrowForwardTwoToneIcon
                variant="customIcon"
                sx={{
                  color: darkMode ? 'white' : 'black',
                }}
              />
            )}
          </IconButton>
        )}
  
        <IconButton variant="arrowButton" onClick={toggleDrawer}>
          {drawerOpen ? (
            <ArrowForwardTwoToneIcon
              variant="customIcon"
              sx={{
                color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
              }}
            />
          ) : (
            <ArrowBackTwoToneIcon
              variant="customIcon"
              sx={{
                color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
              }}
            />
          )}
        </IconButton>
      </Box>
      <style>
        {`
          @keyframes holographicSweep {
            0% {
              transform: rotate(0deg) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: rotate(180deg) scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: rotate(360deg) scale(1);
              opacity: 0.6;
            }
          }
          @keyframes scanLines {
            0%, 100% {
              opacity: 0.2;
              background-position: 0 0;
            }
            50% {
              opacity: 0.4;
              background-position: 0 -10px;
            }
          }
        `}
      </style>
    </>
  );
};

export default ScrollAppBar;