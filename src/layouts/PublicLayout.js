// routes/PublicLayout.jsx
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
import DashboardDrawer from 'components/organisms/DashboardDrawer';
import MobileDrawer from 'components/organisms/MobileDrawer';
import { SnackBar } from 'components/elements/SnackBar';
import Footer from 'components/organisms/Footer';
import { useDarkMode } from 'contexts/DarkMode';
import { useTvMode } from 'contexts/TvMode';
import { useDashboardDrawer } from 'contexts/DashboardDrawerContext';
import { useDrawer } from 'contexts/DrawerContext';
import { useLocation } from 'react-router-dom';
import RocketIcon from '@mui/icons-material/Rocket';
import getNewTheme from 'themes/NewTheme';
import TopIcons from 'components/organisms/TopIcons';
import { AppBarProvider } from 'contexts/AppBarContext';

const PublicLayout = ({ children }) => {
  const { darkMode } = useDarkMode();
  const { tvMode } = useTvMode();
  const { dashboardDrawerOpen, toggleDashboardDrawer } = useDashboardDrawer();
  const { drawerOpen, toggleDrawer } = useDrawer();
  const isXs = useMediaQuery('(max-width:600px)');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [useTheme, setUseTheme] = useState(false);

  const theme = useTheme
    ? isHomePage
      ? getNewTheme(darkMode)
      : getNewTheme(darkMode, isXs)
    : isHomePage
      ? getTheme(darkMode)
      : getTheme(darkMode, isXs);
  
  return (
  <AppBarProvider>
    <ThemeProvider theme={theme}>
      <SnackBar>
        <CssBaseline />
        <GlobalStyles 
          styles={{
            '@keyframes scanline': {
              '0%': {
                transform: 'translateY(-100vh)',
              },
              '100%': {
                transform: 'translateY(100vh)',
              }
            },
            '@keyframes pulse': {
              '0%': {
                opacity: 0.3,
              },
              '50%': {
                opacity: 0.6,
              },
              '100%': {
                opacity: 0.3,
              }
            },
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
            '.sci-fi-overlay': {
              display: useTheme ? 'none' : 'none',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, rgba(16, 42, 67, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)',
              pointerEvents: 'none',
              zIndex: 2000,
              mixBlendMode: 'overlay',
            },
            '.scan-lines': {
              display: useTheme ? 'initial' : 'none',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '200vh',
              background: 'repeating-linear-gradient(0deg, rgba(0, 255, 255, 0.03), rgba(0, 255, 255, 0.03) 1px, transparent 1px, transparent 2px)',
              animation: 'scanline 8s linear infinite',
              pointerEvents: 'none',
              zIndex: 2000,
              mixBlendMode: 'overlay',
            },
            '.glow-orb': {
              display: useTheme ? 'initial' : 'none',
              position: 'fixed',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
              top: '20%',
              left: '15%',
              animation: 'pulse 4s ease-in-out infinite',
              pointerEvents: 'none',
              zIndex: 1000,
            },
            '.glow-orb-2': {
              display: useTheme ? 'initial' : 'none',
              position: 'fixed',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at center, rgba(128, 0, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(30px)',
              bottom: '10%',
              right: '20%',
              animation: 'pulse 6s ease-in-out infinite',
              pointerEvents: 'none',
              zIndex: 1000,
            }
          }}
        />
          
        <div className="sci-fi-overlay" />
        <div className="scan-lines" />
        <div className="glow-orb" />
        <div className="glow-orb-2" />
  
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
             <TopIcons 
                isXs={isXs} 
                isHomePage={isHomePage} 
                useTheme={useTheme} 
             />
            </Box>
          </Grid>
          <Grid item xs={12}>
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
            {isHomePage && darkMode && (
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '90vh',
                  background:
                    'radial-gradient(circle at center, rgba(255, 165, 0, 0.4) 0%, rgba(255, 165, 0, 0.2) 10%, rgba(255, 165, 0, 0) 30%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                  display: 'none',
                }}
              />
            )}
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
  </AppBarProvider>
  );
};

export default PublicLayout;