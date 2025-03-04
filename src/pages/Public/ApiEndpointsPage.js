// pages/ApiEndpointsPage.js
import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import HubIcon from '@mui/icons-material/Hub';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const API_ENDPOINTS_JSX = (
  <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0 }}>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/auth/login - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/auth/signup - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/auth/manual-signup - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/auth/send-activation-link - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/auth/activate/ - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/auth/send-forgot-password-link - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/auth/reset-password - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/auth/sso-login - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/auth/refresh-token - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/users/me - GET" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/users/me - PUT" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/users/me/change-password - PUT" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/users/me/generate-sso - PUT" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/users - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/users - GET" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/users/:id - GET" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/users/:id - PUT" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/users/:id - DELETE" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/accounts/:id - GET" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/accounts/:id - PUT" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/teams - GET" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/teams/:id - GET" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/teams - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/teams/:id - PUT" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/teams/:id - DELETE" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/teams/:id/add-user/:userId - PUT" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/teams/:id/remove-user/:userId - PUT" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/plans - GET" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/subscriptions - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/subscriptions - DELETE" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/customers/me - GET" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/customers/me/invoices - GET" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/customers/me/cards - GET" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/create-setup-intent - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/cards - DELETE" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/cards - PUT" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/create-customer-checkout-session - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/create-customer-portal-session - POST" />
    </ListItem>
    <ListItem sx={{ padding: '0px', minHeight: 'unset' }}>
      <ListItemText primary="/api/v1/stripe/webhook - POST" />
    </ListItem>
  </List>
);

const ApiEndpointsPage = () => {

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <TypeSection
        paddingY={10}
        paddingX={1}
        text={<HeroSection 
          text="Your new list of api endpoints"    
          icon={HubIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={API_ENDPOINTS_JSX}
      />
    </Box>
  );
};

export default ApiEndpointsPage;