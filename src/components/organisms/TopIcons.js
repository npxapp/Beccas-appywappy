// components/organisms/TopIcons.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Link, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MobileDrawer from 'components/organisms/MobileDrawer';
import { useDarkMode } from 'contexts/DarkMode';
import { useDashboardDrawerProtected } from 'contexts/DashboardDrawerProtectedContext';
import { useDashboardDrawer } from 'contexts/DashboardDrawerContext';
import { useDrawer } from 'contexts/DrawerContext';
import { useCollapse } from 'contexts/CollapseContext';

import { 
  AppBarStyles, 
  ToolbarStyles, 
  IconDragHandleButtonStyles, 
  IconDragHandleStyles 
} from './TopStyles';
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


const TopIcons = ({ isXs, isHomePage, useTheme }) => {
  const { darkMode } = useDarkMode();
  const { toggleDashboardDrawerProtected } = useDashboardDrawerProtected();
  const { toggleDashboardDrawer } = useDashboardDrawer();
  // eslint-disable-next-line
  const { toggleDrawer } = useDrawer();
  const { isCollapseOpen, toggleCollapse } = useCollapse();
  const location = useLocation();
  const isAuth = location.pathname.startsWith('/auth');

  const dragHandleRef = useRef(null);
  const toolbarRef = useRef(null);
  const [showFixedButton, setShowFixedButton] = useState(false);
  const [buttonCoords, setButtonCoords] = useState({
    top: 0,
    right: 0
  });

  useEffect(() => {
    const calculatePosition = () => {
      if (dragHandleRef.current && toolbarRef.current) {
        const buttonRect = dragHandleRef.current.getBoundingClientRect();
        // eslint-disable-next-line
        const toolbarRect = toolbarRef.current.getBoundingClientRect();
        
        setButtonCoords({
          top: buttonRect.top,
          right: window.innerWidth - buttonRect.right
        });
      }
    };

    calculatePosition();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const toolbarBottom = toolbarRef.current ? toolbarRef.current.getBoundingClientRect().bottom : 0;
      
      if (scrollY > 0 && toolbarBottom <= 0) {
        setShowFixedButton(true);
      } else {
        setShowFixedButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculatePosition);
    };
  }, []);
  
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
    <>
      <AppBar position="static" sx={AppBarStyles(darkMode)}>
        <Toolbar 
          ref={toolbarRef} 
          sx={{
            ...ToolbarStyles(darkMode),
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
            margin: 0
          }}
        >
          {/* Top row with logo and buttons */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Link 
                component="a" 
                href="/" 
                onClick={() => navigateOpen('/')} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  textDecoration: 'none', 
                  cursor: 'pointer' 
                }}
              >
                <StyledTypography darkMode={darkMode} isHomePage={isHomePage}>
                  <span>startersoft.io</span>
                </StyledTypography>
              </Link>
              <IconButton
                color="primary"
                aria-label="github"
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
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isAuth && (
                <IconButton
                  color="primary"
                  aria-label="dashboard"
                  onClick={toggleDashboardDrawerProtected}
                  sx={IconDragHandleButtonStyles(darkMode)}
                >
                  <FmdGoodIcon sx={IconDragHandleStyles(darkMode)} />
                </IconButton>
              )}
              <IconButton
                ref={dragHandleRef}
                color="primary"
                aria-label="menu"
                onClick={toggleCollapse}
                sx={IconDragHandleButtonStyles(darkMode)}
              >
                <DragHandleIcon sx={IconDragHandleStyles(darkMode)} />
              </IconButton>
            </Box>
          </Box>
          
          {/* Collapse menu below the top row */}
          <MobileDrawer 
            in={isCollapseOpen} 
            toggleCollapseMenu={toggleCollapse}
            width="100%"
            zIndex={1}
            color="text.primary"
          />
        </Toolbar>
      </AppBar>
      {showFixedButton && (
        <IconButton
          color="primary"
          aria-label="floating-menu"
          onClick={toggleCollapse}
          sx={{
            ...IconDragHandleButtonStyles(darkMode),
            position: 'fixed',
            top: '14px',
            right: `${buttonCoords.right - 2}px`,
            zIndex: 1100,
            backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <DragHandleIcon sx={IconDragHandleStyles(darkMode)} />
        </IconButton>
      )}
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