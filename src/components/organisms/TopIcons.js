// components/organisms/TopIcons.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HamburgerButton from 'components/atoms/HamburgerButton';
import LogoComponent from 'components/atoms/LogoComponent';
import PortalHamburgerButton from 'components/atoms/PortalHamburgerButton';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import MobileDrawer from 'components/organisms/MobileDrawer';
import { useDarkMode } from 'contexts/DarkMode';
import { useDashboardDrawerProtected } from 'contexts/DashboardDrawerProtectedContext';
import { useDashboardDrawer } from 'contexts/DashboardDrawerContext';
import { useDrawer } from 'contexts/DrawerContext';
import { useCollapse } from 'contexts/CollapseContext';
import { MenuChip } from 'components/atoms/NavChips';

import { 
  AppBarStyles, 
  ToolbarStyles, 
  IconDragHandleButtonStyles, 
  IconDragHandleStyles 
} from './TopStyles';

const TopIcons = ({ isXs, isHomePage, useTheme: propsUseTheme }) => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
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
  const [showIconButton, setShowIconButton] = useState(false);
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
        setShowIconButton(false);
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
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    toggleCollapse();
  };

  const navigatePage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  // eslint-disable-next-line
  const navigateOpen = (path) => {
    if (path.startsWith('http')) {
      navigatePage(path);
    } else {
      navigate(path);
    }
  };
  
  // Render chips
  const renderChips = () => (
        <MenuChip toggleDashboardDrawerProtected={toggleDashboardDrawerProtected} darkMode={darkMode} />
  );

  return (
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
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <LogoComponent 
            darkMode={darkMode} 
            isHomePage={isHomePage} 
            toggleDashboardDrawer={toggleDashboardDrawer} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuth && (
            (isExtraSmall ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  paddingX: 1,
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none', // Firefox
                  msOverflowStyle: 'none', // IE and Edge
                  maxWidth: 'calc(100vw - 200px)', // Leave space for hamburger
                }}
              >
                {renderChips()}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {renderChips()}
              </Box>
            ))
            )}
            <HamburgerButton 
              ref={dragHandleRef}
              isOpen={isMenuOpen}
              onToggle={toggleMenu} 
              id="my-hamburger" 
              className="my-custom-class" 
              sx={{
                position: 'fixed',
                top: '14px',
                right: `${buttonCoords.right - 2}px`,
                zIndex: 9999,
              }}
            />
            <IconButton
              color="primary"
              aria-label="menu"
              onClick={toggleMenu}
              sx={{...IconDragHandleButtonStyles(darkMode), display: 'none'}}
            >
              <DragHandleIcon sx={IconDragHandleStyles(darkMode)} />
            </IconButton>
          </Box>
        </Box>
        <MobileDrawer 
          in={isCollapseOpen} 
          toggleCollapseMenu={toggleCollapse}
          setMenuOpen={setIsMenuOpen}
          width="100%"
          zIndex={1}
          color="text.primary"
        />
        {showIconButton && showFixedButton && (
          <IconButton
            color="primary"
            aria-label="floating-menu"
            onClick={toggleMenu}
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
        {!showIconButton && showFixedButton && (
          <PortalHamburgerButton 
            isOpen={isMenuOpen}
            onToggle={toggleMenu}
            id="my-hamburger-fixed" 
            className="my-custom-class"
            style={{
              position: "fixed",
              top: 10,
              right: `${buttonCoords.right}px`,
              transform: "translateZ(0)",
              willChange: "transform",
              zIndex: 9999,
            }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopIcons;