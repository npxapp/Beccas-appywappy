// pages/Public/HomePage
import React, { useState, useCallback } from 'react';
import { Box, IconButton, Typography, ThemeProvider, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DataArrayIcon from '@mui/icons-material/DataArray';
import BoltIcon from '@mui/icons-material/Bolt';
import BugReportIcon from '@mui/icons-material/BugReport';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import getTheme from 'themes/Theme';
import RandomQuote from 'utils/RandomQuote';

const HomePage = () => {
  const theme = getTheme();
  const navigate = useNavigate();
  const iconSize = 60;
  const centerIconSize = 100; // Enlarged central icon
  const [refreshQuote, setRefreshQuote] = useState(0);

  // Paths for each icon button
  const paths = {
    features: '/features-page',
    apis: '/apis',
    docs: '/documentation',
    paas: '/platform',
    bugs: '/bugs',
    globe: '/regions',
    github: 'https://github.com',
    twitter: 'https://twitter.com'
  };

  // Function to navigate to internal routes
  const navigateOpen = useCallback((path) => {
    if (path.startsWith('http')) {
      // External link
      window.open(path, '_blank');
    } else {
      // Internal route
      navigate(path);
    }
  }, [navigate]);

  // Function to just refresh quote without navigation
  const refreshQuoteOnly = useCallback(() => {
    // Refresh quote by updating the state
    setRefreshQuote(prev => prev + 1);
  }, []);

  // Create the orbital icons data
  const orbitalIcons = [
    { label: "Apis", icon: <ShowChartIcon />, path: paths.apis },
    { label: "docs", icon: <DataArrayIcon />, path: paths.docs },
    { label: "PAAS", icon: <BoltIcon />, path: paths.paas },
    { label: "Bugs", icon: <BugReportIcon />, path: paths.bugs },
    { label: "Regions", icon: <LanguageOutlinedIcon />, path: paths.globe }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 3
        }}
      >
        {/* Circular Layout with Icon Buttons */}
        <Box
          sx={{
            position: 'relative',
            width: 400,
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 6
          }}
        >
          {/* Center Rocket Icon */}
          <Box
            sx={{
              position: 'absolute',
              zIndex: 10,
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '1.4rem',
                color: colors.grey[600],
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 11,
                display: 'none',
              }}
            >
              SAAS
            </Typography>
            <IconButton sx={{ position: 'relative', zIndex: 12, bgcolor: colors.grey[50] }}>
              <RocketLaunchIcon sx={{ color: theme.palette.primary.main, fontSize: centerIconSize }} />
            </IconButton>
            <IconButton 
              sx={{ position: 'absolute', top: 0, left: 0, zIndex: 13, bgcolor: colors.grey[50] }} 
              onClick={() => navigateOpen(paths.features)}
            >
              <RocketLaunchIcon sx={{ color: theme.palette.primary.main, fontSize: centerIconSize, opacity: 1 }} />
            </IconButton>
          </Box>
          
          {/* Orbital Icons */}
          {orbitalIcons.map((item, index) => {
            // Calculate position in circle
            const angle = (2 * Math.PI * index) / orbitalIcons.length;
            const radius = 150; // Distance from center
            const left = Math.cos(angle) * radius;
            const top = Math.sin(angle) * radius;
            
            return (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${left}px), calc(-50% + ${top}px))`,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    color: colors.grey[600],
                    position: 'absolute',
                    zIndex: 1,
                    display: 'none',
                  }}
                >
                  {item.label}
                </Typography>
                <IconButton sx={{ position: 'relative', zIndex: 2, bgcolor: colors.grey[50] }}>
                  {React.cloneElement(item.icon, { sx: { color: theme.palette.primary.main, fontSize: iconSize } })}
                </IconButton>
                <IconButton 
                  sx={{ position: 'absolute', top: 0, left: 0, zIndex: 3, bgcolor: colors.grey[50] }} 
                  onClick={refreshQuoteOnly}
                >
                  {React.cloneElement(item.icon, { sx: { color: theme.palette.primary.main, fontSize: iconSize, opacity: 1 } })}
                </IconButton>
              </Box>
            );
          })}
        </Box>

        {/* Social Media Buttons - Keep at the bottom */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <IconButton onClick={() => navigateOpen(paths.github)}>
            <GitHubIcon sx={{ color: theme.palette.primary.main, fontSize: iconSize }} />
          </IconButton>
          <IconButton onClick={() => navigateOpen(paths.twitter)}>
            <TwitterIcon sx={{ color: theme.palette.primary.main, fontSize: iconSize }} />
          </IconButton>
        </Box>
        
        {/* Random Quote from The Wire */}
        <Box sx={{ mt: 4, width: '100%', maxWidth: '600px', textAlign: 'center' }}>
          <RandomQuote 
            key={refreshQuote}
            delay={200}
            color={theme.palette.primary.main}
            fontWeight={500}
            fontSize="1.4rem"
            textShadow={`0px 0px 2px ${theme.palette.primary.light}`}
            showAttribution={true}
            useQuotes={true}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;