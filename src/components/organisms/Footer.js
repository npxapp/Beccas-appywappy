// components/organisms/Footer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Grid, Link } from '@mui/material';

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
            <Stack spacing={0}>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/getting-started')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Getting started
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/add-card')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Add a card
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/auth/login')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Login
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/overview')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Overview
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/subscribers')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Subscribers
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/admin')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Admin
              </Link>
            </Stack>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={8} sm={4}>
            <Stack spacing={0}>
              <Link 
                variant="body2"
                onClick={() => navigateOpen('/')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Discover more
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/subscriptions')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Subscriptions
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/dashboard')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Dashboard
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/routing-libraries')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Routing libraries
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/plans')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Plans
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/webhooks-usage')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Usage with webhooks
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/users')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Users
              </Link>
            </Stack>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={6} sm={4}>
            <Stack spacing={0}>
              <Link 
                variant="body2"
                onClick={() => navigateOpen('/')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Integrations
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/teams')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Teams
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/callbacks')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Callbacks
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/stripe-sessions')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Stripe sessions
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/templates')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Templates
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/experimental-apis')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Experimental apis
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/api-endpoints')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Api endpoints
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/webhooks')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Webhooks
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/cards')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Cards
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/payments')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Payments
              </Link>
              <Link 
                variant="body2" 
                onClick={() => navigateOpen('/trials')}
                sx={{ cursor: 'pointer' }}
                underline="hover"
              >
                Trials
              </Link>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;