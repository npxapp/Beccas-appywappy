// pages/SubscribersPage.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { TypeSection } from 'components/elements/TypeSections';
import { 
  HeroSection,
} from 'components/elements/TemplateHeroText';

const SUBSCRIBER_FEATURES = (
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
      <Typography color="text.primary">
        user registration of account with subdomain, email and password
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        user email activation with 6 characters code and account creation
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">resend activation code if not received</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        user password reset through code sent by email
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">user login</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">user logout</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">user change password once logged in</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">account trial period</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">edit of account billing information</Typography>
    </ListItem>
    <ListItem sx={{ pt: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ color: '#fff', fontWeight: 600 }}
      >
        API Only
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">stripe webhooks handling</Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        events notifications by email: new user subscribed - successful payments - failed payments
      </Typography>
    </ListItem>
    <ListItem>
      <Typography color="text.primary">
        daily notifications by email: expiring trials - failed payments - account suspension due to failed payments
      </Typography>
    </ListItem>
  </List>
);

const SubscribersPage = () => {

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
          text="Subscriber management and authentication"    
          icon={PeopleOutlineIcon}
        />}
      />  

      <TypeSection
        paddingY={10}
        paddingX={1}
        text={SUBSCRIBER_FEATURES}
      />
    </Box>
  );
};

export default SubscribersPage;