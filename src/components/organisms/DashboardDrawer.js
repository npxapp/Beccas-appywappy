// /components/organisms/DashboardDrawer.js
import React from 'react';
import { 
  Drawer as MUIDrawer, 
  Box,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDarkMode } from 'contexts/DarkMode';
import { useYiMode } from 'contexts/YiMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import XIcon from '@mui/icons-material/X';
import TIcon from 'images/T';
import YiIcon from 'images/Yi';
import LoginIcon from '@mui/icons-material/Login';
import { 
  IconButtonStyles, 
  IconStyles, 
} from './TopStyles';

const DashboardDrawer = ({ open, toggleDashboardDrawer }) => {
  const { darkMode, setDarkMode } = useDarkMode();
  const { yiMode, setYiMode } = useYiMode();
  const navigate = useNavigate();
  const theme = useTheme();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleYi = () => {
    setYiMode(!yiMode);
  };

  // eslint-disable-next-line
  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const navigateOpen = (path) => {
    if (path === 'toggleDashboardDrawer') {
      toggleDashboardDrawer();
    } else {
      navigate(path);
      toggleDashboardDrawer();
    }
  };

  return (
    <MUIDrawer
      anchor="right"
      open={open}
      onClose={() => toggleDashboardDrawer(false)}
      PaperProps={{
        sx: {
          zIndex: 2000,
          height: '100vh',
          borderRadius: 0,
          background: theme.palette.background.default,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'initial',
          transition: 'transform 1s ease',
          p: 2,
        }}
      >
          <IconButton
            color="primary"
            onClick={toggleTheme}
            sx={IconButtonStyles(darkMode)}
          >
            {darkMode ? (
              <DarkModeIcon sx={IconStyles(darkMode)} />
            ) : (
              <LightModeIcon sx={IconStyles(darkMode)} />
            )}
          </IconButton>
          <IconButton
            color="primary"
            aria-label="github"
            onClick={() => navigateOpen('https://github.com/npxapp/npx-app')}
            sx={IconButtonStyles(darkMode)}
          >
            <GitHubIcon sx={IconStyles(darkMode)} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={toggleYi}
            sx={{...IconButtonStyles(darkMode), display: 'none', }}
          >
            {yiMode ? (
              <YiIcon sx={IconStyles(darkMode)} />
            ) : (
              <TIcon sx={IconStyles(darkMode)} />
            )}
          </IconButton>
          <IconButton
            color="primary"
            aria-label="notifications"
            sx={IconButtonStyles(darkMode)}
          >
            <NotificationsNoneIcon sx={IconStyles(darkMode)} />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="x"
            onClick={() => navigateOpen('https://x.com/proappdemo')}
            sx={IconButtonStyles(darkMode)}
          >
            <XIcon sx={IconStyles(darkMode)} />
          </IconButton>
          
          {/* Add a Box as a spacer with the height of one IconButton */}
          <Box sx={{ height: '40px' }} />
          
          <IconButton
            color="primary"
            aria-label="login"
            onClick={() => navigateOpen('/auth/login')}
            sx={IconButtonStyles(darkMode)}
          >
            <LoginIcon sx={IconStyles(darkMode)} />
          </IconButton>
      </Box>
    </MUIDrawer>
  );
};

export default DashboardDrawer;