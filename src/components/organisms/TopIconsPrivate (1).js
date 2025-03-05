// components/organisms/TopIconsPrivate.js
import React, { useState, useEffect, useRef } from 'react';
import { Logout, UpdateMe } from "api/mutations";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Box,
  Menu,
  MenuItem,
  AppBar, 
  Toolbar, 
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HamburgerButton from 'components/atoms/HamburgerButton';
import LogoComponent from 'components/atoms/LogoComponent';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import MobileDrawer from 'components/organisms/MobileDrawer';
import { useAuth } from "contexts/AuthContext";
import { useDarkMode } from 'contexts/DarkMode';
import { useDashboardDrawerProtected } from 'contexts/DashboardDrawerProtectedContext';
import { useDashboardDrawer } from 'contexts/DashboardDrawerContext';
import { useDrawer } from 'contexts/DrawerContext';
import { useCollapse } from 'contexts/CollapseContext';
import { useAppBar } from 'contexts/AppBarContext'; // Import the AppBar context
import { HomeChip, LanguageChip, AccountChip, MenuChip } from 'components/atoms/NavChips';

import { 
  AppBarStyles, 
  ToolbarStyles, 
  IconDragHandleButtonStyles, 
  IconDragHandleStyles 
} from './TopStyles';

const TopIconsPrivate = ({ isXs, isHomePage, useTheme: propsUseTheme, user }) => {
  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { refetch } = useAuth();
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const { toggleDashboardDrawerProtected } = useDashboardDrawerProtected();
  const { toggleDashboardDrawer } = useDashboardDrawer();
  // eslint-disable-next-line
  const { toggleDrawer } = useDrawer();
  const { isCollapseOpen, toggleCollapse } = useCollapse();
  const { showStickyBar, toggleStickyBar } = useAppBar(); // Use the AppBar context
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const dragHandleRef = useRef(null);
  const toolbarRef = useRef(null);
  // eslint-disable-next-line
  const [showIconButton, setShowIconButton] = useState(false);
  const [showFixedButton, setShowFixedButton] = useState(false);
  const [buttonCoords, setButtonCoords] = useState({
    top: 0,
    left: 0,
    right: 0
  });
  const [safeTop, setSafeTop] = useState(10);
  const { i18n } = useTranslation(); // Get both t and i18n from the hook
  
  // Keep track if we're scrolled down
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  
  // Combined useEffect for position tracking and scroll detection
  useEffect(() => {
    // Initial position calculation
    const calculatePosition = () => {
      if (dragHandleRef.current && toolbarRef.current) {
        const buttonRect = dragHandleRef.current.getBoundingClientRect();
        //const toolbarRect = toolbarRef.current.getBoundingClientRect();
        
        setButtonCoords({
          top: buttonRect.top,
          left: buttonRect.left,
          right: window.innerWidth - buttonRect.right
        });
      }
    };

    // Calculate initial position
    calculatePosition();

    // Handle scroll for showing/hiding the fixed button
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
        // Recalculate horizontal position when showing
        calculatePosition();
      } else {
        setShowFixedButton(false);
      }
    };

    // Visual viewport tracking for reliable vertical positioning
    const updatePosition = () => {
      if (window.visualViewport) {
        setSafeTop(window.visualViewport.offsetTop + 10);
      }
    };

    // Set up event listeners
    updatePosition(); // Initial calculation
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', calculatePosition);
    window.visualViewport?.addEventListener("resize", updatePosition);
    window.visualViewport?.addEventListener("scroll", updatePosition);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculatePosition);
      window.visualViewport?.removeEventListener("resize", updatePosition);
      window.visualViewport?.removeEventListener("scroll", updatePosition);
    };
  }, []);
  
  // Effect to manage sticky bar visibility based on menu state and scroll position
  useEffect(() => {
    // If menu is open and we're scrolled down, show sticky bar
    if (isMenuOpen && isScrolledDown && !showStickyBar) {
      toggleStickyBar();
    }
    
    // If menu is closed OR we're back at the top, hide sticky bar
    if ((!isMenuOpen || !isScrolledDown) && showStickyBar) {
      toggleStickyBar();
    }
  }, [isMenuOpen, isScrolledDown, showStickyBar, toggleStickyBar]);
  
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
  // eslint-disable-next-line
  const { handleSubmit } = useForm({
    defaultValues: { language: user?.language },
  });
  
  const { setValue } = useForm({
    defaultValues: { language: user?.language },
  });

  const mutation = useMutation(UpdateMe, {
    onSuccess: () => queryClient.invalidateQueries(["Me"]),
  });
  
  const handleLogout = async () => {
    await Logout();
    await refetch();
    navigate("/auth/login");
  };
  
  const handleLanguageChange = async (event) => {
    const newLanguage = event.target.value;
    
    // Update the form value if needed for other components
    setValue('language', newLanguage);
    
    // Call the API with the new language
    await mutation.mutateAsync({ language: newLanguage });
    
    // Update i18n to change the UI language
    await i18n.changeLanguage(newLanguage);
    
    // Refresh user data
    queryClient.invalidateQueries(["Me"]);
  };
  
  // Regular menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isCollapseOpen) {
      if (!isMenuOpen) {
        toggleCollapse();
      }
    } else {
      if (isMenuOpen) {
        toggleCollapse();
      }
    }
  };
  
  // Portal button handler
  const handlePortalClick = () => {
    const newMenuState = !isMenuOpen;
    
    // Always toggle menu state
    setIsMenuOpen(newMenuState);
    
    if (user.role === 'admin') {
      toggleDashboardDrawerProtected();
    } else {
      toggleCollapse();
    }
    
    // Toggle sticky bar
    if (!showStickyBar) {
      toggleStickyBar();
    } else if (!newMenuState) { // If closing menu, hide sticky bar
      toggleStickyBar();
    }
  };

  // Render chips
  const renderChips = () => (
    <>
      <HomeChip darkMode={darkMode} />
      <LanguageChip user={user} handleLanguageChange={handleLanguageChange} darkMode={darkMode} />
      <AccountChip setUserMenuAnchor={setUserMenuAnchor} darkMode={darkMode} />
      {user.role === "admin" && (
        <MenuChip toggleDashboardDrawerProtected={toggleDashboardDrawerProtected} darkMode={darkMode} />
      )}
    </>
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
          {/* Conditional rendering based on screen size */}
          {isExtraSmall ? (
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
          )}
          
          {/* User menu */}
          <Menu 
            anchorEl={userMenuAnchor} 
            open={Boolean(userMenuAnchor)} 
            onClose={() => setUserMenuAnchor(null)}
            sx={{ backgroundColor: "initial" }}
          >
            <MenuItem disabled sx={{ backgroundColor: "initial" }}>
              {user.email}
            </MenuItem>
            <MenuItem 
              component={RouterLink} 
              to="/user/edit" 
              sx={{ backgroundColor: "initial" }}
            >
              {t("privateLayout.manageUser")}
            </MenuItem>
            {user.role === "admin" && (
              <>
                <MenuItem 
                  component={RouterLink} 
                  to="/account/edit" 
                  sx={{ backgroundColor: "initial" }}
                >
                  {t("privateLayout.managePayment")}
                </MenuItem>
                <MenuItem 
                  component={RouterLink} 
                  to="/plan" 
                  sx={{ backgroundColor: "initial" }}
                >
                  {t("privateLayout.managePlan")}
                </MenuItem>
              </>
            )}
            <MenuItem onClick={handleLogout} sx={{ backgroundColor: "initial" }}>
              {t("privateLayout.logout")}
            </MenuItem>
          </Menu>
          
          <HamburgerButton
            ref={dragHandleRef}
            isOpen={isMenuOpen} 
            onToggle={toggleMenu} 
            id="my-hamburger" 
            className="my-custom-class" 
            style={{
              transform: "translateZ(0)",
              willChange: "transform",
              zIndex: 9999,
            }}
          /> 
          <IconButton
            color="primary"
            aria-label="menu"
            onClick={toggleCollapse}
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
      
      {/* Fixed button when scrolled down */}
      {showFixedButton && (
        <HamburgerButton 
          isOpen={isMenuOpen} 
          onToggle={handlePortalClick}
          id="my-hamburger-fixed" 
          className="my-custom-class"
          style={{
            position: "fixed",
            top: safeTop,
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

export default TopIconsPrivate;