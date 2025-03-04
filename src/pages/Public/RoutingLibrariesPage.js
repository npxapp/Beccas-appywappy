// pages/RoutingLibrariesPage.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import RoutingIcon from '@mui/icons-material/AltRouteOutlined';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const ROUTING_FEATURES = (
  <List>
    <ListItem>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600 }}
      >
        API and Frontend
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/auth/login (LoginPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/auth/forgot-password (ForgotPasswordPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/auth/resend-activation (ResendActivationPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/auth/reset-password/:email (ResetPasswordPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/auth/activate/:email (ActivateAccountPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/auth/register (RegisterPage)</Typography>
    </ListItem>
    <ListItem sx={{ pt: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ color: '#fff', fontWeight: 600 }}
      >
        Private Routes
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/dashboard (DashboardSwitcher)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/teams (IndexTeamsPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/teams/:teamId (TeamPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/user-teams (UserTeams)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/card/add (CardAddPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/plan (PlanPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/user/edit (EditUserPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/account/edit (EditAccountPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/users (IndexUsersPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/create-user (CreateUsersPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/edit-user/:userId (EditUsersPage)</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">/user/:userId (EditUser)</Typography>
    </ListItem>
  </List>
);

const RoutingLibrariesPage = () => {

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
          text="Route protection and path management"    
          icon={RoutingIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={ROUTING_FEATURES}
      />
    </Box>
  );
};

export default RoutingLibrariesPage;