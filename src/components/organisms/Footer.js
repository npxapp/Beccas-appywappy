// components/organisms/Footer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Grid, Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
          paddingY: 10,
        }}
      >
        <Grid container spacing={2}>
          {/* Column 1 */}
          <Grid item xs={4} sm={4}>
            <Stack spacing={0.5} sx={{ alignItems: 'flex-start' }}>
              <Chip 
                label="Getting started"
                onClick={() => navigateOpen('/getting-started')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Adding a card"
                onClick={() => navigateOpen('/add-card')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Login Page"
                onClick={() => navigateOpen('/login-page')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Overview"
                onClick={() => navigateOpen('/overview')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Subscribers"
                onClick={() => navigateOpen('/subscribers')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Admin"
                onClick={() => navigateOpen('/admin')}
                variant="outlined"
                size="small"
              />
            </Stack>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={8} sm={4}>
            <Stack spacing={0.5} sx={{ alignItems: 'flex-start' }}>
              <Chip 
                label="Discover more"
                onClick={() => navigateOpen('/discover-more')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Subscriptions"
                onClick={() => navigateOpen('/subscriptions')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Dashboard Page"
                onClick={() => navigateOpen('/dashboard-page')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Routing libraries"
                onClick={() => navigateOpen('/routing-libraries')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Plans"
                onClick={() => navigateOpen('/plans')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Usage with webhooks"
                onClick={() => navigateOpen('/webhooks-usage')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Users Page"
                onClick={() => navigateOpen('/users-page')}
                variant="outlined"
                size="small"
              />
              <Chip 
                icon={<GitHubIcon fontSize="small" />}
                label="Go API"
                onClick={() => navigateOpen('https://github.com/startersaas/startersaas-backend-go-api-main.git')}
                variant="outlined"
                size="small"
              />
            </Stack>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={6} sm={4}>
            <Stack spacing={0.5} sx={{ alignItems: 'flex-start' }}>
              <Chip 
                label="Integrations"
                onClick={() => navigateOpen('/integrations')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Teams Page"
                onClick={() => navigateOpen('/teams-page')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Callbacks"
                onClick={() => navigateOpen('/callbacks')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Stripe sessions"
                onClick={() => navigateOpen('/stripe-sessions')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Templates"
                onClick={() => navigateOpen('/templates')}
                variant="outlined"
                size="small"
              />
              <Chip 
                icon={<GitHubIcon fontSize="small" />}
                label="Node API"
                onClick={() => navigateOpen('https://github.com/startersaas/startersaas-backend-node-api-main.git')}
                variant="outlined"
                size="small"
              />
              <Chip 
                icon={<GitHubIcon fontSize="small" />}
                label="React API"
                onClick={() => navigateOpen('https://github.com/startersaas/startersaas-frontend-react-spa.git')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Webhooks"
                onClick={() => navigateOpen('/webhooks')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Cards"
                onClick={() => navigateOpen('/cards')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Payments"
                onClick={() => navigateOpen('/payments')}
                variant="outlined"
                size="small"
              />
              <Chip 
                label="Trials"
                onClick={() => navigateOpen('/trials')}
                variant="outlined"
                size="small"
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;