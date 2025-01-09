import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography,
  useMediaQuery,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import XIcon from '@mui/icons-material/X';
import TIcon from '../../images/T';
import YiIcon from '../../images/Yi';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { useDarkMode } from '../../contexts/DarkMode';
import { useDashboardDrawer } from '../../contexts/DashboardDrawerContext';
import { useDrawer } from '../../contexts/DrawerContext';
import { useYiMode } from '../../contexts/YiMode';
import { 
  AppBarStyles, 
  ToolbarStyles, 
  ToolbarTypographyStyles,
  IconButtonStyles, 
  IconStyles, 
  IconDragHandleButtonStyles, 
  IconDragHandleStyles 
} from './TopStyles';

const StyledTypography = styled(Typography)(({ darkMode }) => ({
  flexGrow: 1,
  fontSize: '5.5vw',
  fontWeight: 700,
  color: 'rgb(97, 218, 251)',
  position: 'relative',
  display: 'inline-block',
  px: '10px',
  textShadow: '0 0 10px rgba(97, 218, 251, 0.6), 0 0 15px rgba(97, 218, 251, 0.4)',

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

const TopIcons = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const { toggleDashboardDrawer } = useDashboardDrawer();
  const { yiMode, setYiMode } = useYiMode();
  const { drawerOpen, toggleDrawer } = useDrawer();
  const isXs = useMediaQuery('(max-width:600px)');

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleYi = () => {
    setYiMode(!yiMode);
  };

  const navigateOpen = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <AppBar position="fixed" sx={AppBarStyles(darkMode)}>
        <Toolbar sx={ToolbarStyles(darkMode)}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={toggleDashboardDrawer}
            sx={IconDragHandleButtonStyles(darkMode)}
            size="small"
          >
            <DragHandleIcon sx={IconDragHandleStyles(darkMode)} />
          </IconButton>
          <StyledTypography darkMode={darkMode}>
            <span>Startersoft.io</span>
          </StyledTypography>
          <IconButton
            color="primary"
            onClick={toggleTheme}
            sx={IconButtonStyles(darkMode)}
            size="small"
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
            size="small"
          >
            <GitHubIcon sx={IconStyles(darkMode)} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={toggleYi}
            sx={IconButtonStyles(darkMode)}
            size="small"
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
            size="small"
          >
            <NotificationsNoneIcon sx={IconStyles(darkMode)} />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="x"
            onClick={() => navigateOpen('https://x.com/proappdemo')}
            sx={IconButtonStyles(darkMode)}
            size="small"
          >
            <XIcon sx={IconStyles(darkMode)} />
          </IconButton>
          {isXs && (
            <IconButton
              color="primary"
              onClick={toggleDrawer}
              sx={IconButtonStyles(darkMode)}
              size="small"
            >
              <MenuIcon sx={IconStyles(darkMode)} />
            </IconButton>
          )} 
        </Toolbar>
      </AppBar>
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

export default TopIcons;