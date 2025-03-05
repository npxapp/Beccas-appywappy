// Update in TopIcons.js
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
import { useAppBar } from 'contexts/AppBarContext'; // Import the new context
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
  const { showStickyBar, toggleStickyBar } = useAppBar(); // Use the AppBar context
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
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Keep track if we're scrolled down
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    const calculatePosition = () => {
      if (dragHandleRef.current && toolbarRef.current) {
        const buttonRect = dragHandleRef.current.getBoundingClientRect();
        //const toolbarRect = toolbarRef.current.getBoundingClientRect();
        
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
      
      // Update scrolled state
      const nowScrolledDown = scrollY > 0 && toolbarBottom <= 0;
      setIsScrolledDown(nowScrolledDown);
      
      // Update button visibility
      if (nowScrolledDown) {
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
  
  // Effect to manage sticky bar visibility based on menu state and scroll position
  useEffect(() => {
    // If menu is open and we're scrolled down, show sticky bar
    if (isMenuOpen && isScrolledDown && !showStickyBar) {
      toggleStickyBar();
    }
    
    // If menu is closed OR we're back at the top (except when opened by Portal), hide sticky bar
    if ((!isMenuOpen || !isScrolledDown) && showStickyBar) {
      toggleStickyBar();
    }
  }, [isMenuOpen, isScrolledDown, showStickyBar, toggleStickyBar]);
  
  // Regular menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    toggleCollapse();
  };

  // Portal button handler
  const handlePortalClick = () => {
    const newMenuState = !isMenuOpen;
    
    // Always toggle menu state
    setIsMenuOpen(newMenuState);
    toggleCollapse();
    
    // Toggle sticky bar
    if (!showStickyBar) {
      toggleStickyBar();
    } else if (!newMenuState) { // If closing menu, hide sticky bar
      toggleStickyBar();
    }
  };

  const navigate = useNavigate();
  
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

  // Create toolbar content to reuse in both AppBars
  const renderToolbarContent = () => (
    <>
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
            isOpen={isCollapseOpen}
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
    </>
  );

  // Log state for debugging
  console.log({
    isMenuOpen,
    showStickyBar,
    isScrolledDown,
    showFixedButton
  });

  return (
    <>
      {/* Original AppBar - always visible and in the document flow */}
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
          {renderToolbarContent()}
        </Toolbar>
      </AppBar>

      {/* Sticky AppBar - fixed at top, slides in/out when needed */}
      {showFixedButton && (
        <AppBar 
          position="fixed" 
          sx={{
            ...AppBarStyles(darkMode),
            top: 0,
            zIndex: 1200,
            boxShadow: showStickyBar 
              ? '0 4px 20px rgba(0, 0, 0, 0.15)' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            transform: showStickyBar ? 'translateY(0)' : 'translateY(-100%)',
            backgroundColor: showStickyBar 
              ? (darkMode ? 'rgba(25, 25, 25, 0.65)' : 'rgba(255, 255, 255, 0.65)') 
              : (darkMode ? 'rgba(25, 25, 25, 0.5)' : 'rgba(255, 255, 255, 0.5)'),
            backdropFilter: showStickyBar ? 'blur(12px) saturate(180%)' : 'blur(8px)',
            WebkitBackdropFilter: showStickyBar ? 'blur(12px) saturate(180%)' : 'blur(8px)', // Safari support
            borderBottom: showStickyBar 
              ? (darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)')
              : 'none',
          }}
        >
          <Toolbar 
            sx={{
              ...ToolbarStyles(darkMode),
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: 0,
              margin: 0
            }}
          >
            {renderToolbarContent()}
          </Toolbar>
        </AppBar>
      )}

      {/* Fixed buttons */}
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
            zIndex: 1300,
            backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <DragHandleIcon sx={IconDragHandleStyles(darkMode)} />
        </IconButton>
      )}
      {!showIconButton && showFixedButton && (
        <PortalHamburgerButton 
          isOpen={isCollapseOpen}
          onToggle={handlePortalClick}
          id="my-hamburger-fixed" 
          className="my-custom-class"
          style={{
            position: "fixed",
            top: 10,
            right: `${buttonCoords.right}px`,
            transform: "translateZ(0)",
            willChange: "transform",
            zIndex: 1300,
          }}
        />
      )}
    </>
  );
};

export default TopIcons;