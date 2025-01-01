// ./src/layouts/App.js
import React from 'react';
import {
  Grid,
  CssBaseline,
  ThemeProvider,
  Box,
  useMediaQuery,
} from '@mui/material';
import getTheme from './AppTheme';
import DashboardDrawer from './components/DashboardDrawer';
import MobileDrawer from './components/MobileDrawer';
import { SnackBar } from './components/SnackBar';
import Footer from './components/Footer';
import { useDarkMode } from '../contexts/DarkMode';
import { useTvMode } from '../contexts/TvMode';
import { useDashboardDrawer } from '../contexts/DashboardDrawerContext';
import { useDrawer } from '../contexts/DrawerContext';
import ScrollAppBar from './components/ScrollAppBar';
import { useLocation } from 'react-router-dom';

const App = ({ children }) => {
  const { darkMode } = useDarkMode();
  const { tvMode } = useTvMode();
  const { dashboardDrawerOpen, toggleDashboardDrawer } = useDashboardDrawer();
  const { drawerOpen, toggleDrawer } = useDrawer();
  const isXs = useMediaQuery('(max-width:600px)');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const theme = isHomePage ? getTheme(true) : getTheme(darkMode, isXs);
  
  return (
    <ThemeProvider theme={theme}>
      <SnackBar>
        <CssBaseline />
        <DashboardDrawer
          anchor="left"
          open={dashboardDrawerOpen}
          toggleDashboardDrawer={toggleDashboardDrawer}
        />
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
                <ScrollAppBar />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <MobileDrawer
              anchor="right"
              open={drawerOpen}
              toggleDrawer={toggleDrawer}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            {isHomePage && !darkMode && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '90vh',
                  background: 'radial-gradient(circle at center, rgba(255, 165, 0, 0.4) 0%, rgba(255, 165, 0, 0.2) 10%, rgba(255, 165, 0, 0) 30%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
            )}
            <Box
              sx={{
                position: 'absolute',
                top: 76,
                left: 0,
                right: 0,
                bottom: 0,
                height: {
                  xs: '80vh',
                  sm: '80%',
                },
                borderRadius: 20,
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(transparent 50%, rgba(255,255,255,1) 50%)',
                    backgroundSize: '100% 4px',
                    animation: tvMode ? darkMode ? 'scanLines 0.1s infinite linear' : 'retroTvFlicker 0.1s infinite' : 'none',
                    mixBlendMode: 'overlay',
                    zIndex: 2,
                    overflowY: 'auto',
                    pointerEvents: 'none',
                    display: tvMode ? 'initial' : 'none',
                },
                '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      pointerEvents: 'none',
                      animation: tvMode ? 'scanline 2s linear infinite, scanLines 0.2s infinite linear' : 'scanline 2s linear infinite',
                      zIndex: 1,
                      display: tvMode ? 'initial' : 'none',
                },
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  overflowY: 'auto',
                  borderRadius: 20,
                  clipPath: 'inset(0 round 20px 20px 0 0)',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isHomePage ? 'black' : darkMode ? 'black' : 'white',
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
                      backgroundColor: 'rgba(255, 255, 255, .95)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: 'inset 0 2px 8px rgba(97,218,251,0.2), inset 0 -2px 8px rgba(0,0,0,0.3)',
                      background: darkMode ? `linear-gradient(135deg, rgba(97,218,251,0.15) 0%, rgba(97,218,251,0.05) 100%)` : '#040b0d',
                      borderRadius: 20,
                      clipPath: 'inset(0 round 0 0 80px 80px)',
                    }}
                  >
                    <ThemeProvider theme={getTheme(true)}>
                      {children}
                    </ThemeProvider>
                  </Box>
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
          </Grid>
        </Grid>
      </SnackBar>
    </ThemeProvider>
  );
};

export default App;