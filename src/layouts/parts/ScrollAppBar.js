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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useDarkMode } from '../../contexts/DarkMode';
import { useDrawer } from '../../contexts/DrawerContext';
import { useDashboardDrawerProtected } from '../../contexts/DashboardDrawerProtectedContext';
import { useAuth } from '../../contexts/AuthContext';
import { getDomain } from '../utils';

const ScrollAppBar = () => {
  const { drawerOpen, toggleDrawer } = useDrawer();
  const { dashboardDrawerProtectedOpen, toggleDashboardDrawerProtected } = useDashboardDrawerProtected();
  const { darkMode, setDarkMode } = useDarkMode();
  const domain = getDomain();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPrivate = location.pathname === '/DashboardPage';
  const { token } = useAuth();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const navigateOpen = (path) => {
   return () => navigate(path);
  };
  
  const handleClick = () => {
    if (token) {
      navigate('/Logout');
    } else {
      navigate('/DashboardPage');
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
                <Typography
                  component="span"
                  variant="customTitle"
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
                  }}
                >
                  {domain.slice(0, 1).toUpperCase().concat(domain.slice(1))}
                </Typography>
                <PlayCircleFilledIcon
                  sx={{
                    fontSize: '3rem',
                    color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
                    position: 'relative',
                    left: '-3px',
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
            <VpnKeyIcon
              variant="customIcon"
              sx={{
                color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
              }}
            />
          )}
        </IconButton>
  
        <IconButton variant="arrowButton" onClick={navigateOpen('/DashboardPage')}>
            <AccountCircleIcon
              variant="customIcon"
              sx={{
                color: isHomePage ? 'white' : (darkMode ? 'white' : 'black'),
              }}
            />
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
    </>
  );
};

export default ScrollAppBar;