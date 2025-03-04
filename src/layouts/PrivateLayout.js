// layouts/PrivateLayout.jsx
import React, { useState } from 'react';
import {
  Grid,
  CssBaseline,
  ThemeProvider,
  Box,
  useMediaQuery,
  IconButton,
  GlobalStyles,
} from '@mui/material';
import getTheme from 'themes/Theme';
import DashboardDrawerProtected from 'components/organisms/DashboardDrawerProtected';
import DashboardDrawer from 'components/organisms/DashboardDrawer';
import MobileDrawer from 'components/organisms/MobileDrawer';
import { SnackBar } from 'components/elements/SnackBar';
import Footer from 'components/organisms/Footer';
import { useAuth } from "contexts/AuthContext";
import { useDarkMode } from 'contexts/DarkMode';
import { useTvMode } from 'contexts/TvMode';
import { useDashboardDrawerProtected } from 'contexts/DashboardDrawerProtectedContext';
import { useDashboardDrawer } from 'contexts/DashboardDrawerContext';
import { useDrawer } from 'contexts/DrawerContext';
import { useLocation, Navigate } from 'react-router-dom';
import RocketIcon from '@mui/icons-material/Rocket';
import getNewTheme from 'themes/NewTheme';
import TopIconsPrivate from 'components/organisms/TopIconsPrivate';
import DrawerComponent from 'components/organisms/DrawerComponent';

const PrivateLayout = ({ children }) => {
  const { darkMode } = useDarkMode();
  const { tvMode } = useTvMode();
  const { dashboardDrawerProtectedOpen, toggleDashboardDrawerProtected } = useDashboardDrawerProtected();
  const { dashboardDrawerOpen, toggleDashboardDrawer } = useDashboardDrawer();
  const { drawerOpen, toggleDrawer } = useDrawer();
  const isXs = useMediaQuery('(max-width:600px)');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [useTheme, setUseTheme] = useState(false);
  const { user } = useAuth();

  const theme = useTheme
    ? isHomePage
      ? getNewTheme(darkMode)
      : getNewTheme(darkMode, isXs)
    : isHomePage
      ? getTheme(darkMode)
      : getTheme(darkMode, isXs);
  
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackBar>
        <CssBaseline />
        <GlobalStyles 
          styles={{
            'html, body': {
              minHeight: '100vh',
              margin: 0,
              padding: 0,
            },
            body: {
              background: useTheme
                ? isHomePage
                  ? darkMode 
                    ? 'rgba(13, 14, 14, 1)'
                    : 'linear-gradient(135deg, rgba(0, 2, 3, 0.9) 0%, rgba(33, 33, 33, 0.9) 100%)'
                  : darkMode
                    ? '#000000'
                    : '#ffffff'
                : isHomePage
                  ? darkMode
                    ? '#000000'
                    : '#ffffff !important'
                  : darkMode
                    ? '#000000'
                    : '#ffffff !important',
              backgroundAttachment: useTheme ? 'fixed' : 'initial',
              backgroundSize: useTheme ? 'cover' : 'initial',
            },
          }}
        />
  
        <DrawerComponent 
          successCode="4242"
          buttonBackgroundColor="rgba(97, 218, 251, .2)"
          buttonHoverColor="rgba(97, 218, 251, .6)"
          buttonActiveColor="rgba(97, 218, 251, .6)"
          enableVibration={true}
          darkMode={darkMode}
        />
  
        <IconButton
          onClick={() => setUseTheme(!useTheme)}
          sx={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            color: useTheme ? '#61dafb' : 'inherit',
            zIndex: 1501,
          }}
        >
          <RocketIcon
            sx={{
              fontSize: '3rem',
            }}
          />
        </IconButton>

        <Grid 
          container 
          columns={12}
        >
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: {
                  xs: '100%',
                  sm: 600,
                  md: 960,
                  lg: 1280,
                  xl: 1920,
                },
              }}
            >
             <TopIconsPrivate
                isXs={isXs} 
                isHomePage={isHomePage} 
                useTheme={useTheme}
                user={user}
             />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <DashboardDrawerProtected
              anchor="left"
              open={dashboardDrawerProtectedOpen}
              toggleDashboardDrawerProtected={toggleDashboardDrawerProtected}
            />
            <DashboardDrawer
              anchor="right"
              open={dashboardDrawerOpen}
              toggleDashboardDrawer={toggleDashboardDrawer}
            />
            <MobileDrawer
              anchor="left"
              open={drawerOpen}
              toggleDrawer={toggleDrawer}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                width: '100%',
                '&::before': {
                  content: '""',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(transparent 50%, rgba(255,255,255,1) 50%)',
                  backgroundSize: '100% 4px',
                  animation: useTheme
                  ? tvMode
                    ? darkMode
                      ? 'scanLines 0.1s infinite linear'
                      : 'retroTvFlicker 0.1s infinite'
                    : 'none'
                  : 'none',
                  mixBlendMode: 'overlay',
                  zIndex: 2000,
                  pointerEvents: 'none',
                  display: useTheme
                  ? tvMode 
                    ? 'initial' 
                    : 'none'
                  : 'none',
                },
                '&::after': {
                  content: '""',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  animation: useTheme
                  ? tvMode
                    ? 'scanline 2s linear infinite, scanLines 0.2s infinite linear'
                    : 'none'
                  : 'none',
                  zIndex: 1000,
                  display: useTheme
                  ? 'initial'
                  : 'none',
                },
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      width: {
                        xs: '100%',
                      },
                        '&::before': {
                          content: '""',
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background:
                            'linear-gradient(transparent 50%, rgba(255,255,255,1) 50%)',
                          backgroundSize: '100% 4px',
                          animation: useTheme
                          ? tvMode
                            ? darkMode
                              ? 'scanLines 0.1s infinite linear'
                              : 'retroTvFlicker 0.1s infinite'
                            : 'none'
                          : 'none',
                          mixBlendMode: 'overlay',
                          zIndex: 1,
                          pointerEvents: 'none',
                          display: useTheme
                          ? tvMode 
                            ? 'initial' 
                            : 'none'
                          : 'none',
                        },
                        '&::after': {
                          content: '""',
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          width: '100%',
                          height: '100%',
                          pointerEvents: 'none',
                          animation: useTheme
                          ? tvMode
                            ? 'scanline 2s linear infinite, scanLines 0.2s infinite linear'
                            : 'none'
                          : 'none',
                          zIndex: 1000,
                          display: 'initial',
                        },
                    }}
                  >
                    {children}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                      width: '100%',
                    }}
                  >
                  <Box
                    sx={{
                      width: {
                        xs: '100%',
                        sm: 600,
                        md: 960,
                        lg: 1280,
                        xl: 1920,
                      },
                    }}
                  >
                    <Footer />
                  </Box>
                 </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </SnackBar>
    </ThemeProvider>
  );
};

export default PrivateLayout;